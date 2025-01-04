'use client';

import { subscribeToMailingListAction } from '@/lib/actions';
import { useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { useFormState } from 'react-dom';
import './mailing-list-modal.scss';

export const MailingListModal = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
}) => {
  const [errorMessageSubscribe, dispatchSubscribe] = useFormState(subscribeToMailingListAction, undefined);
  const [subscribeFormStatus, setSubscribeFormStatus] = useState<string>('none');

  const handleSubscriptionSubmit = async (args: FormData) => {
    setSubscribeFormStatus('working');
    await dispatchSubscribe(args);
    setSubscribeFormStatus('complete');
    // setModalVisible(false);
  };

  return (
    <Modal className="mailing-list-modal" show={modalVisible} onHide={() => setModalVisible(false)} centered>
      <Modal.Header closeButton className="pt-3 pb-3 ps-4 pe-4">
        <Modal.Title>Subscribe to the Newsletter</Modal.Title>
      </Modal.Header>

      <form className="form" action={handleSubscriptionSubmit}>
        <Modal.Body className="pt-3 pb-3 ps-4 pe-4">
          <p>
            Stay connected with the Church in Milton and keep up to date with what is happening in our neighbourhoods
            and around the city.
          </p>
          {subscribeFormStatus === 'none' && (
            <div className="form-body">
              <div className="name-container" style={{ display: 'flex', gap: 8 }}>
                <input
                  style={{ flexGrow: 1, flexBasis: 1 }}
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  required={true}
                />
                <input
                  style={{ flexGrow: 1, flexBasis: 1 }}
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  required={true}
                />
              </div>
              <input type="email" name="email" placeholder="Email address" required={true} />
              <input type="text" name="church" placeholder="What church are you connected to (if any)?" />
              <input type="hidden" name="pageUri" value="https://milton.church" />
              <input type="hidden" name="pageName" value="Home" />
            </div>
          )}
          {subscribeFormStatus === 'working' && (
            <div className="loading-container">
              <Spinner animation="grow" variant="primary" />
              <div className="loading-label">Subscribing to newsletter</div>
            </div>
          )}
          {subscribeFormStatus === 'complete' && (
            <div className="mt-5 mb-5 text-center">
              <h5>You are now subscribed to the newsletter!</h5>
            </div>
          )}
        </Modal.Body>

        {subscribeFormStatus === 'none' && (
          <Modal.Footer className="pt-3 pb-3 ps-4 pe-4">
            <Button variant="tertiary" onClick={() => setModalVisible(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Subscribe
            </Button>
          </Modal.Footer>
        )}
        {subscribeFormStatus === 'complete' && (
          <Modal.Footer className="pt-3 pb-3 ps-4 pe-4">
            <Button variant="primary" onClick={() => setModalVisible(false)}>
              Done
            </Button>
          </Modal.Footer>
        )}
      </form>
    </Modal>
  );
};
