'use server';
import { createTransport } from 'nodemailer';
import { Theme } from '@auth/core/types';
import { NodemailerConfig } from 'next-auth/providers/nodemailer';
import mjml2html from 'mjml';
import { server } from './config';

export async function sendAdvocateRequestEmail({
  toEmail,
  fromUserId,
  fromEmail,
  fromName,
  neighbourhoodName,
}: {
  toEmail: string;
  fromUserId: string;
  fromEmail: string;
  fromName: string;
  neighbourhoodName: string;
}) {
  const transport = createTransport(server);
  await transport.sendMail({
    from: 'curtis@digitalbrilliance.ca',
    to: toEmail,
    replyTo: fromEmail,
    subject: `Advocate Request`,
    html: toHtml({ fromUserId, fromName, fromEmail, neighbourhoodName }),
  });
}

function toHtml({
  fromUserId,
  fromName,
  fromEmail,
  neighbourhoodName,
}: Record<'fromUserId' | 'fromName' | 'fromEmail' | 'neighbourhoodName', string>) {
  return mjml2html(`
  <mjml>
    <mj-head>
      <mj-attributes>
        <mj-font name="Inter" href="https://fonts.googleapis.com/css?family=Inter"/>
        <mj-all font-family="Inter" align="center" font-size="16px" line-height="140%"/>
        <mj-class name="title" font-size="24px" font-weight="700"/>
        <mj-class name="body" padding-top="24px" padding-bottom="24px"/>
      </mj-attributes>
    </mj-head>
    <mj-body>
      <mj-section>
        <mj-column >
          <mj-image width="40" src="https://milton.church/litn-logo.png"/>
          <mj-text mj-class="title">
            Milton.church
          </mj-text>
          <mj-text mj-class="body">
            <div style="font-weight: 600; margin-bottom: 16px">A Neighbourhood Advocate request was submitted by ${fromName}</div>
            <div style="font-family: monospace; margin-bottom: 8px; padding: 24px; background-color: #e9e9e9; border-radius: 4px; text-align: left; font-size: 14px">
              User ID: ${fromUserId}<br/>
              Name: ${fromName}<br/>
              Email: ${fromEmail}<br/>
              Neighbourhood name: ${neighbourhoodName}<br/>
            </div>
          </mj-text>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
`).html;
}
