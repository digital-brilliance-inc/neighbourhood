'use client';

import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useFormState } from 'react-dom';
import { sendMessage as sendMessageAction } from '@/lib/actions';
import './send-message-modal.scss';
import { User } from 'next-auth';

export const SendMessageModal = ({
  modalVisible,
  title = 'Send a Message',
  description,
  successMessage,
  user,
  setModalVisible,
}: {
  modalVisible: boolean;
  title?: string;
  description: string;
  successMessage: string;
  user?: User;
  setModalVisible: (modalVisible: boolean) => void;
}) => {
  const [errorMessage, dispatchSendMessage] = useFormState(sendMessageAction, undefined);
  const [formStatus, setFormStatus] = useState<string>('none');

  /* <div className="modal-description">
    Your message has been sent successfully. The neighbourhood advocate for {selectedNeighbourhood?.name} should
    be in touch soon.
  </div> */

  const handleSubmit = async (args: FormData) => {
    setFormStatus('working');
    await dispatchSendMessage(args);
    setFormStatus('complete');
    // setModalVisible(false);
  };

  const handleClose = () => {
    setModalVisible(false);
    setFormStatus('none');
  };

  return (
    <Modal className="send-message-modal" show={modalVisible} onHide={() => setModalVisible(false)} centered>
      <Modal.Header closeButton className="pt-3 pb-3 ps-4 pe-4">
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <form className="form" action={handleSubmit}>
        <Modal.Body className="pt-3 pb-3 ps-4 pe-4">
          {formStatus !== 'complete' && (
            <>
              <p>{description}</p>
              <div className="form-body">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  readOnly={user?.name ? true : false}
                  defaultValue={user?.name || ''}
                  required
                />
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  readOnly={user?.name ? true : false}
                  defaultValue={user?.email || ''}
                  required
                />
                <textarea required name="message" rows={10} placeholder="Enter your message here" />
              </div>
            </>
          )}
          {formStatus === 'complete' && <p>{successMessage || 'Message sent successfully'}</p>}
        </Modal.Body>

        <Modal.Footer className="pt-3 pb-3 ps-4 pe-4">
          {formStatus !== 'complete' && (
            <>
              <Button variant="tertiary" onClick={() => handleClose()}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Send Message
              </Button>
            </>
          )}
          {formStatus === 'complete' && (
            <Button variant="primary" onClick={() => handleClose()}>
              Close
            </Button>
          )}
        </Modal.Footer>
      </form>
    </Modal>
  );
};
