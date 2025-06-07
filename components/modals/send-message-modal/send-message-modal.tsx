'use client';

import { useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useFormState } from 'react-dom';
import { sendMessage as sendMessageAction } from '@/lib/actions';
import './send-message-modal.scss';
import { User } from 'next-auth';

export const SendMessageModal = ({
  modalVisible,
  title = 'Send a Message',
  description,
  subject,
  context,
  successMessage,
  user,
  messageDefault,
  setModalVisible,
}: {
  modalVisible: boolean;
  title?: string;
  description: string;
  context: string;
  subject: string;
  successMessage: string;
  user?: User;
  messageDefault?: string;
  setModalVisible: (modalVisible: boolean) => void;
}) => {
  const [errorMessage, dispatchSendMessage] = useFormState(sendMessageAction, undefined);
  const [formStatus, setFormStatus] = useState<string>('none');
  const formRef = useRef<HTMLFormElement | null>(null);

  const validateEmail = () => {
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const email = formData.get('email') as string;
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
  };

  /* <div className="modal-description">
    Your message has been sent successfully. The neighbourhood advocate for {selectedNeighbourhood?.name} should
    be in touch soon.
  </div> */

  const handleEmailEdit = () => {
    if (!validateEmail()) {
      setFormStatus('invalid_email');
    } else {
      setFormStatus('');
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setFormStatus('working');
    await dispatchSendMessage(formData);
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

      <form className="form" ref={formRef} action={handleSubmit}>
        <Modal.Body className="pt-3 pb-3 ps-4 pe-4">
          {formStatus !== 'complete' && (
            <>
              <p dangerouslySetInnerHTML={{ __html: description }}></p>
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
                  onChange={() => handleEmailEdit()}
                  readOnly={user?.name ? true : false}
                  defaultValue={user?.email || ''}
                  required
                />
                <input type="hidden" name="context" readOnly={true} defaultValue={context} />
                <input type="hidden" name="subject" readOnly={true} defaultValue={subject} />
                <textarea
                  className="text-area"
                  {...(messageDefault ? { defaultValue: messageDefault } : {})}
                  name="message"
                  placeholder="Enter your message here"
                />
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
              <Button variant="primary" type="submit" {...(formStatus === 'invalid_email' ? { disabled: true } : {})}>
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
