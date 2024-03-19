'use client';
import { useEffect, useState } from 'react';
import './map-panel.scss';
import Close from '@/public/close.svg';
import Image from 'next/image';
import clsx from 'clsx';
import { User } from 'next-auth';
import { Neighbourhood } from '@/lib/model/neighbourhood';
import { useModal } from '@/app/contexts/modal-context/modal-context';
import { useSession } from 'next-auth/react';
import { sendMessage as sendMessageAction, subscribeToMailingListAction } from '@/lib/actions';
import { useFormState } from 'react-dom';
import { DEFAULT_MIN_VERSION } from 'tls';

export const MapPanel = ({ user, selectedNeighbourhood }: { user?: User; selectedNeighbourhood?: Neighbourhood }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [_, setVisible] = useModal();
  const { data: sessionData } = useSession();
  const [errorMessage, dispatchSendMessage] = useFormState(sendMessageAction, undefined);
  const [errorMessageSubscribe, dispatchSubscribe] = useFormState(subscribeToMailingListAction, undefined);
  const [sendMessageFormStatus, setSendMessageFormStatus] = useState<string>('none');
  const [subscribeFormStatus, setSubscribeFormStatus] = useState<string>('none');

  const handleSubmit = async (args: FormData) => {
    setSendMessageFormStatus('working');
    await dispatchSendMessage(args);
    setSendMessageFormStatus('complete');
  };

  const handleSubscriptionSubmit = async (args: FormData) => {
    console.log('handleSubscriptitonSubmit(): Here');
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
          <input type="hidden" name="pageUri" value="https://milton.church/map" />
          <input type="hidden" name="pageName" value="Map" />
          <input className="submit-button button" type="submit" value="Subscribe" />
        </form>
        ,
      </>,
    );
  };

  const sendMessage = () => {
    if (selectedNeighbourhood) {
      console.log('sessionData = %o', sessionData);
      setVisible(
        <>
          <div className="modal-title">Send a message</div>
          <div className="modal-description">
            Send a message to the advocate for the {selectedNeighbourhood.name} neighbourhood.
          </div>
          <form className="form" action={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              readOnly={true}
              defaultValue={sessionData?.user?.name || ''}
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              readOnly={true}
              defaultValue={sessionData?.user?.email!}
            />
            <textarea required name="message" rows={10} placeholder="Enter your message here" />
            <input className="submit-button button" type="submit" value="Send message" />
          </form>
          ,
        </>,
      );
    }
  };

  useEffect(() => {
    if (sendMessageFormStatus === 'complete') {
      setVisible(
        <div className="modal-contents">
          <div className="modal-title">Message sent successfully</div>
          <div className="modal-description">
            Your message has been sent successfully. The neighbourhood advocate for {selectedNeighbourhood?.name} should
            be in touch soon.
          </div>
          <div className="button" onClick={() => setVisible(null)}>
            Close
          </div>
        </div>,
      );
    }
  }, [sendMessageFormStatus]);

  useEffect(() => {
    if (subscribeFormStatus === 'complete') {
      setVisible(
        <div className="modal-contents">
          <div className="modal-title">Subscription successful</div>
          <div className="modal-description">
            You have successfully subscribed to the Milton.church mailing list. You can unsubscribe at any time using
            the link at the bottom of any the email that we send.
          </div>
          <div className="button" onClick={() => setVisible(null)}>
            Close
          </div>
        </div>,
      );
    }
  }, [subscribeFormStatus]);

  return (
    <>
      <div className={clsx('map-panel-button-container', { open: isOpen })}>
        <div className="map-panel-button" onClick={() => setIsOpen(true)}>
          <Image src="/logo.svg" height="20" width="20" alt="Open map panel" />
        </div>
      </div>
      <div className={clsx('map-panel-container', { open: isOpen })}>
        <div className="map-panel-background">
          <Image className="close" src={Close} width={24} onClick={() => setIsOpen(false)} alt="Close" />
          {user && !selectedNeighbourhood && <div className="title">Welcome to the map {user.name}.</div>}
          {user && selectedNeighbourhood && (
            <>
              <div className="title">{selectedNeighbourhood.name}</div>
              <div className="body">Send a message to the advocate for this neighbourhood</div>
              <div className="body">userId: {selectedNeighbourhood.userId}</div>
              <div className="button" onClick={() => sendMessage()}>
                Send message
              </div>
            </>
          )}
          {!user && !selectedNeighbourhood && (
            <>
              <div className="title">In Milton as it is in heaven.</div>
              <div className="body">
                Our hope is for every neighbourhood in Milton to have an advocate who is actively praying for and
                helping to build caring, supportive relationships.
              </div>
              <div className="body">Stay connected to the Church in Milton by subscribing or our mailing list.</div>
              <div
                className="button"
                style={{ display: 'inline-block', textAlign: 'center' }}
                onClick={() => handleSubscriptionModal()}
              >
                Subscribe
              </div>
              <div className="body">
                Browse the map to see the neighbourhoods in Milton that have advocates. Select a neighbourhood with an
                advocate to see more information, including stories of progress.
              </div>
              <div className="body">
                Volunteer to be a neighbourhood advocate who actively prays for your neighbourhood and works to build
                caring, supportive relationships in your community.
              </div>
            </>
          )}
          {!user && selectedNeighbourhood && (
            <>
              <div className="title">{selectedNeighbourhood.name}</div>
              <div className="body">See stats about this neighbourhood</div>
              <div className="body">Log in to send a message to the neighbourhood advocate</div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
