'use client';

import { useFormState } from 'react-dom';
import { SectionText } from '../section-text/section-text';
import { SectionTitle } from '../section-title/section-title';
import { Section } from '../section/section';
import './about-section.scss';
import { useModal } from '@/app/contexts/modal-context/modal-context';
import { useState } from 'react';
import { subscribeToMailingListAction } from '@/lib/actions';
import Link from 'next/link';

export const AboutSection = () => {
  const [_, setVisible] = useModal();
  const [errorMessageSubscribe, dispatchSubscribe] = useFormState(subscribeToMailingListAction, undefined);
  const [subscribeFormStatus, setSubscribeFormStatus] = useState<string>('none');

  const handleSubscriptionSubmit = async (args: FormData) => {
    setSubscribeFormStatus('working');
    await dispatchSubscribe(args);
    setSubscribeFormStatus('complete');
  };

  const handleSubscriptionModal = () => {
    setVisible(
      <>
        <div className="modal-title">Subscribe to the Mailing List</div>
        <div className="modal-description">
          Stay connected with the Church in Milton and keep up to date with what is happening in our neighbourhoods and
          around the city.
        </div>
        <form className="form" action={handleSubscriptionSubmit}>
          <div style={{ display: 'flex', gap: 8, alignSelf: 'stretch' }}>
            <input style={{ flexGrow: 1 }} type="text" name="firstName" placeholder="First name" required={true} />
            <input style={{ flexGrow: 1 }} type="text" name="lastName" placeholder="Last name" required={true} />
          </div>
          <input type="email" name="email" placeholder="Enter your email address" required={true} />
          <input type="text" name="church" placeholder="What church are you currently connected to (if any)?" />
          <input type="hidden" name="pageUri" value="https://milton.church" />
          <input type="hidden" name="pageName" value="Home" />
          <input className="submit-button button" type="submit" value="Subscribe" />
        </form>
        ,
      </>,
    );
  };
  return (
    <Section shaded={true}>
      <SectionTitle>What is this about?</SectionTitle>
      <div>
        <p style={{ fontSize: 20, marginBottom: 24 }}>
          The Word became flesh and blood, and moved into the neighborhood. - John 1:14a (MSG)
        </p>
        <div style={{ fontSize: 16 }}>
          <span style={{ fontWeight: 700 }}>
            We want to make it easy for followers of Jesus in Milton to do three things:
          </span>
          <ol>
            <li style={{ paddingLeft: 16, marginTop: 8 }}>
              1. Get (and stay) connected with each other as the broader Church in Milton
            </li>
            <li style={{ paddingLeft: 16, marginTop: 8 }}>2. Pray and care for our neighbourhoods together</li>
            <li style={{ paddingLeft: 16, marginTop: 8 }}>
              3. Resource, equip, and encourage neighbourhood advocates as they build relationships and grow the Kingdom
              of God in their areas.
            </li>
          </ol>
        </div>
        <p style={{ marginTop: 16 }}>So on this site, you will find tools to help you do that.</p>
        <p style={{ marginTop: 16 }}>
          You can start by{' '}
          <span className="link" onClick={() => handleSubscriptionModal()}>
            joining the mailing list
          </span>{' '}
          to be in the loop about what the Church is doing in the city.
        </p>
        <p style={{ marginTop: 16 }}>
          You can also{' '}
          <Link href="/map" className="link">
            check out the map
          </Link>{' '}
          to see which neighbourhoods have advocates already.
        </p>
        <p style={{ marginTop: 16 }}>
          When you&apos;re ready to join in, you can reach out to a neighbourhood advocate near you, or let us know that
          you&apos;d like to be an advocate for your own neighbourhood!
        </p>
      </div>
    </Section>
  );
};
