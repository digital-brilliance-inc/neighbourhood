'use client';

import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useFormState } from 'react-dom';
import './church-modal.scss';
import { Church } from '@/lib/model/church';
import parse from 'html-react-parser';

export const ChurchModal = ({
  modalVisible,
  churchData,
  setModalVisible,
}: {
  modalVisible: boolean;
  churchData: Church | undefined;
  setModalVisible: (modalVisible: boolean) => void;
}) => {
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
            <Button className="btn-sm mt-4">Contact</Button>
          </div>
          <div className="church-description-container">
            <p>{parse(churchData?.description || '')}</p>
          </div>
        </div>
      </Modal.Body>
      {churchData?.additionalImageUrls?.length && (
        <div className="church-images-container">
          {churchData?.additionalImageUrls.map((imgUrl) => (
            <div key={imgUrl} className="church-image-container" style={{ backgroundImage: `url(${imgUrl})` }}></div>
          ))}
        </div>
      )}
    </Modal>
  );
};
