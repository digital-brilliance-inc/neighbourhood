'use client';

import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useFormState } from 'react-dom';
import './church-modal.scss';
import { Church } from '@/lib/model/church';
import parse from 'html-react-parser';
import { SendMessageModal } from '../send-message-modal/send-message-modal';
import { useSession } from 'next-auth/react';

export const ChurchModal = ({
  modalVisible,
  churchData,
  setModalVisible,
}: {
  modalVisible: boolean;
  churchData: Church | undefined;
  setModalVisible: (modalVisible: boolean) => void;
}) => {
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const { data: session } = useSession();

  return (
    <Modal className="church-modal" show={modalVisible} onHide={() => setModalVisible(false)} centered>
      <Modal.Header closeButton className="pt-3 pb-3 ps-4 pe-4">
        <Modal.Title>{churchData?.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-3 pb-3 ps-4 pe-4">
        <h5>{churchData?.address}</h5>
        <div className="church-info-container">
          <div className="church-leader-container">
            <div
              className="church-leader-image-container"
              style={{ backgroundImage: `url(${churchData?.leaders[0].imageUrl})` }}
            ></div>
            <div className="church-leader-name mt-3">{churchData?.leaders[0].name}</div>
            <div className="church-leader-title">{churchData?.leaders[0].title}</div>
            <Button className="btn-sm mt-4" onClick={() => setContactModalVisible(true)}>
              Contact
            </Button>
          </div>
          <div className="church-description-container">{parse(churchData?.description || '<p></p>')}</div>
        </div>
      </Modal.Body>
      {churchData?.additionalImageUrls?.length && (
        <div className="church-images-container">
          {churchData?.additionalImageUrls.map((imgUrl) => (
            <div key={imgUrl} className="church-image-container" style={{ backgroundImage: `url(${imgUrl})` }}></div>
          ))}
        </div>
      )}
      <SendMessageModal
        modalVisible={contactModalVisible}
        setModalVisible={setContactModalVisible}
        description={`Send a message to ${churchData?.name || 'the church'} and someone will be in touch soon.`}
        successMessage="Your message was sent successfully. Thank you for reaching out!"
        subject="Connection Request via Milton.Church"
        context="Connection Request via Milton.Church"
        user={session?.user}
        title="Get in Touch"
      />
    </Modal>
  );
};
