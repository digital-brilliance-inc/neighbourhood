'use client';

import { sendAdvocateRequest } from '@/lib/actions';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useFormState } from 'react-dom';
import './advocate-modal.scss';
import { User } from 'next-auth';

export const AdvocateModal = ({
  refUrl,
  user,
  modalVisible,
  setModalVisible,
}: {
  refUrl: string;
  user: User;
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
}) => {
  const [errorMessage, dispatch] = useFormState(sendAdvocateRequest, undefined);
  const [formStatus, setFormStatus] = useState<string>('none');

  const handleAdvocateSumbit = async (args: FormData) => {
    setFormStatus('working');
    await dispatch(args);
    setFormStatus('complete');
    setModalVisible(false);
  };

  return (
    <Modal className="advocate-modal" show={modalVisible} onHide={() => setModalVisible(false)} centered>
      <Modal.Header closeButton className="pt-3 pb-3 ps-4 pe-4">
        <Modal.Title>Become a Neighbourhood Advocate</Modal.Title>
      </Modal.Header>

      <form className="form" action={handleAdvocateSumbit}>
        <Modal.Body className="pt-3 pb-3 ps-4 pe-4">
          <p>
            We&apos;re so excited your ready to become a Neighbourhood Advocate! Fill in this form and we&apos;ll be in
            touch shortly.
          </p>
          <div className="form-body">
            <input
              type="text"
              name="neighbourhoodName"
              placeholder="What is the name of this neighbourhood or area?"
              required={true}
            />
            <input type="text" name="church" placeholder="What church are you currently connected to (if any)?" />
            <input type="hidden" name="userId" value={user.id || ''} />
            <input type="hidden" name="userName" value={user.name || ''} />
            <input type="hidden" name="userEmail" value={user.email || ''} />
            <input type="hidden" name="pageUri" value={refUrl} />
            <input type="hidden" name="pageName" value="Neighbourhood" />
          </div>
        </Modal.Body>

        <Modal.Footer className="pt-3 pb-3 ps-4 pe-4">
          <Button variant="tertiary" onClick={() => setModalVisible(false)}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
