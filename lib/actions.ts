'use server';

import { signIn } from '@/auth';
import { createTransport } from 'nodemailer';
import { sendEmailMessage } from './nodemailer/send-message';
import { sendAdvocateRequestEmail } from './nodemailer/send-advocate-request';
import { Neighbourhood, NeighbourhoodStatusEnum } from './model/neighbourhood';
import { User } from 'next-auth';
import mongoDBClient from './mongodb/client';

export async function authenticate(_currentState: unknown, formData: FormData) {
  try {
    await signIn('credentials', formData);
  } catch (error: any) {
    console.log('authenticate(): error = %o', error);
    if (error) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function sendMessage(_currentState: unknown, formData: FormData) {
  try {
    const name = formData.get('name')?.toString()!;
    const email = formData.get('email')?.toString()!;
    const message = formData.get('message')?.toString()!;

    await sendEmailMessage({ toEmail: 'curt.miles@gmail.com', fromEmail: email, fromName: name, message });
  } catch (error: any) {
    console.log('sendMessage(): error = %o', error);
    throw error;
  }
}

export async function submitAdvocateRequest(user: User, neighbourhood: Neighbourhood): Promise<Neighbourhood> {
  try {
    const newNeighbourhood = { ...neighbourhood, status: NeighbourhoodStatusEnum.IN_REVIEW };
    await mongoDBClient.db(process.env.MONGODB_DB).collection('neighbourhoods').insertOne(newNeighbourhood);

    await sendAdvocateRequestEmail({
      fromUserId: neighbourhood.userId,
      toEmail: 'curtis@digitalbrilliance.ca',
      fromEmail: neighbourhood.userId,
      fromName: user.name as string,
      neighbourhoodName: neighbourhood.name,
    });
    return newNeighbourhood;
  } catch (error: any) {
    console.log('submitAdvocateRequest(): error = %o', error);
    throw error;
  }
}

export async function subscribeToMailingListAction(_currentState: unknown, formData: FormData) {
  try {
    const firstName = formData.get('firstName')?.toString()!;
    const lastName = formData.get('lastName')?.toString()!;
    const email = formData.get('email')?.toString()!;
    const church = formData.get('church')?.toString();
    const pageUri = formData.get('pageUri')?.toString()!;
    const pageName = formData.get('pageUri')?.toString()!;

    const body = {
      submittedAt: new Date().getTime(),
      fields: [
        { objectTypeId: '0-1', name: 'email', value: email },
        { objectTypeId: '0-1', name: 'firstname', value: firstName },
        { objectTypeId: '0-1', name: 'lastname', value: lastName },
      ],
      context: { pageUri: pageUri, pageName: pageName },
      legalConsentOptions: {
        consent: {
          consentToProcess: true,
          text: 'I agree to allow Milton.church to store and process my personal data.',
          communications: [
            {
              value: true,
              text: 'I agree to receive marketing communications from Milton.church.',
              subscriptionTypeId: 999,
            },
          ],
        },
      },
    };
    const response = await fetch(
      'https://api.hsforms.com/submissions/v3/integration/submit/39895125/60645bc8-6a35-4633-a312-4bb9d69f48bd',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', authorization: 'Bearer ' + process.env.HUBSPOT_API_KEY },
        body: JSON.stringify(body),
      },
    );
    if (response.status !== 200) {
      const details = await response.json();
      console.log('details = %o', details);
      throw new Error(
        `Error ${response.status}: Unable to process mailing list subscription.  Details: ${details.errors[0].message}`,
      );
    }

    // Now, because the church field doesn't populate via the form (because we're on the HubSpot free plan),
    // update the user record to associate the church with an extra call
    if (church) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const updateContactBody = { properties: [{ property: 'church', value: church }] };
      const updateResult = await fetch(`https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/${email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', authorization: 'Bearer ' + process.env.HUBSPOT_API_KEY },
        body: JSON.stringify(updateContactBody),
      });
      console.log(
        'subscribeToMailingListAction(): Successfully updated contact with body = %o, result = %o',
        updateContactBody,
        updateResult,
      );
    }
  } catch (error: any) {
    console.log('subscribeToMailingListAction(): error = %o', error);
    throw error;
  }
}
