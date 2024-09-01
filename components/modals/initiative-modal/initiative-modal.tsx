'use client';

import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useFormState } from 'react-dom';
import './initiative-modal.scss';
import parse from 'html-react-parser';
import { SendMessageModal } from '../send-message-modal/send-message-modal';
import { useSession } from 'next-auth/react';
import { Initiative } from '@/lib/model/initiative';
import { InitiativeStageTag } from '@/components/initiative-stage-tag/initiative-stage-tag';

export const InitiativeModal = ({
  modalVisible,
  initiativeData,
  setModalVisible,
}: {
  modalVisible: boolean;
  initiativeData: Initiative | undefined;
  setModalVisible: (modalVisible: boolean) => void;
}) => {
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const { data: session } = useSession();

  return (
    <Modal className="initiative-modal" show={modalVisible} onHide={() => setModalVisible(false)} centered>
      <Modal.Header closeButton className="pt-3 pb-3 ps-4 pe-4">
        <div>
          <Modal.Title>{initiativeData?.title}</Modal.Title>
          {initiativeData && (
            <div className="initiative-stage-tag-container">
              <InitiativeStageTag initiative={initiativeData}></InitiativeStageTag>
            </div>
          )}
        </div>
      </Modal.Header>

      <Modal.Body className="pt-3 pb-3 ps-4 pe-4">
        <h5>{initiativeData?.shortDescription}</h5>
        <div className="initiative-info-container">
          {initiativeData && initiativeData?.leaders?.length > 0 && (
            <div className="initiative-leader-container">
              {initiativeData?.leaders?.[0]?.imageUrl && (
                <div
                  className="initiative-leader-image-container"
                  style={{ backgroundImage: `url(${initiativeData?.leaders[0].imageUrl})` }}
                ></div>
              )}
              <div className="initiative-leader-name mt-3">{initiativeData?.leaders[0].name}</div>
              <div className="initiative-leader-title">{initiativeData?.leaders[0].title}</div>
            </div>
          )}
          <div className="initiative-description-container">{parse(initiativeData?.description || '<p></p>')}</div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-sm btn-inverse" onClick={() => setContactModalVisible(true)}>
          Get in Touch
        </Button>
      </Modal.Footer>
      <SendMessageModal
        modalVisible={contactModalVisible}
        setModalVisible={setContactModalVisible}
        description={`Send a message to the organizers of this initiative and someone will be in touch soon.`}
        successMessage="Your message was sent successfully. Thank you for reaching out!"
        user={session?.user}
        title="Get in Touch"
      />
    </Modal>
  );
};
