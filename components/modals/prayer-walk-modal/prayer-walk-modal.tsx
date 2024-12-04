'use client';

import { registerForPrayerWalkActionAction, subscribeToMailingListAction } from '@/lib/actions';
import { useState } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { useFormState } from 'react-dom';
import './prayer-walk-modal.scss';

export const PrayerWalkModal = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [church, setChurch] = useState('');
  const [location, setLocation] = useState('');
  const [errorMessageRegister, dispatchRegister] = useFormState(registerForPrayerWalkActionAction, undefined);
  const [registerFormStatus, setRegisterFormStatus] = useState<string>('none');

  const handleSubscriptionSubmit = async (args: FormData) => {
    console.log('formData = %o', { firstName, lastName, email, church, location });
    setRegisterFormStatus('working');
    args.set('firstName', firstName);
    args.set('lastName', lastName);
    args.set('email', email);
    args.set('church', church);
    args.set('location', location);
    args.set('pageUri', 'https://milton.church/events?eventId=christmas-prayer-walk');
    args.set('pageName', 'Events - Christmas Prayer Walk');
    await dispatchRegister(args);
    setRegisterFormStatus('complete');
  };

  return (
    <Modal className="prayer-walk-modal" show={modalVisible} onHide={() => setModalVisible(false)} centered>
      <Modal.Header closeButton className="pt-3 pb-3 ps-4 pe-4">
        <Modal.Title>Register for the Christmas Prayer Walk</Modal.Title>
      </Modal.Header>

      <Form className="form" action={handleSubscriptionSubmit}>
        <Modal.Body className="pt-3 pb-3 ps-4 pe-4">
          <p>Let us know to expect you on Friday, December 20th!</p>
          {registerFormStatus === 'none' && (
            <div className="form-body">
              <Form.Group className="mb-2" controlId="firstName">
                <Form.Control
                  type="text"
                  placeholder="First name"
                  required
                  onChange={(e) => setFirstName(e.currentTarget.value)}
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="lastName">
                <Form.Control
                  type="text"
                  placeholder="Last name"
                  required
                  onChange={(e) => setLastName(e.currentTarget.value)}
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="email">
                <Form.Control
                  type="email"
                  placeholder="Email address"
                  required
                  onChange={(e) => setEmail(e.currentTarget.value)}
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="church">
                <Form.Control
                  type="text"
                  placeholder="Church (if you're connected to one)"
                  onChange={(e) => setChurch(e.currentTarget.value)}
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="location">
                <Form.Select
                  aria-label="What is your closest meeting location?"
                  onChange={(e) => setLocation(e.currentTarget.value)}
                >
                  <option>What is your closest meeting location?</option>
                  <option value="Southeast">
                    Southeast Milton (Bristol District Park - Thompson & Louie St. Laurent)
                  </option>
                  <option value="Southwest">Southwest Milton (Optimist Park - Savoline Blvd & Merkley Gate)</option>
                  <option value="Central">Central Milton (Victoria Park - Mary St. & Bell St.)</option>
                  <option value="Northwest">Northwest Milton (Halloway Park - Scott Blvd & Huntingford Gate)</option>
                  <option value="Northeast">
                    Northeast Milton (St. Peter Catholic Elementary School - Dixon Dr. & Pearson Way)
                  </option>
                </Form.Select>
              </Form.Group>

              <input type="hidden" name="pageUri" value="https://milton.church/events?eventId=christmas-prayer-walk" />
              <input type="hidden" name="pageName" value="Events - Christmas Prayer Walk" />
            </div>
          )}
          {registerFormStatus === 'working' && (
            <div className="loading-container">
              <Spinner animation="grow" variant="primary" />
              <div className="loading-label">Submitting Registration</div>
            </div>
          )}
          {registerFormStatus === 'complete' && (
            <div className="mt-5 mb-5 text-center">
              <h5>You are now registered for the prayer walk!</h5>
            </div>
          )}
        </Modal.Body>

        {registerFormStatus === 'none' && (
          <Modal.Footer className="pt-3 pb-3 ps-4 pe-4">
            <Button variant="tertiary" onClick={() => setModalVisible(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        )}
        {registerFormStatus === 'complete' && (
          <Modal.Footer className="pt-3 pb-3 ps-4 pe-4">
            <Button variant="primary" onClick={() => setModalVisible(false)}>
              Done
            </Button>
          </Modal.Footer>
        )}
      </Form>
    </Modal>
  );
};
