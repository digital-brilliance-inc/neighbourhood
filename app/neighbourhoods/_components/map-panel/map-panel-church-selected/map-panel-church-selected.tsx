'use client';
import { SendMessageModal } from '@/components/modals/send-message-modal/send-message-modal';
import './map-panel-church-selected.scss';
import { Church } from '@/lib/model/church';
import parse from 'html-react-parser';
import { User } from 'next-auth';
import { Button } from 'react-bootstrap';
import { useState } from 'react';

export const MapPanelChurchSelected = ({ church, user }: { church: Church; user: User | undefined }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <div className="map-panel-church-selected">
      <div className="tag purple mb-2">Selected Church</div>
      <h4 className="bold mb-4">{church.name}</h4>
      <p className="mb-4">{church.address}</p>
      <p className="mb-4">
        {church.leaders[0].name}
        <br />
        {church.leaders[0].title}
      </p>
      {church.shortDescription && <p className="church-description mb-4">{parse(church.shortDescription)}</p>}
      {!user && (
        <div className="create-account-container mb-4">
          <p className="mb-0">
            <a className="pink bold">Create a Free Account</a>
            <br /> to send a message to {church.name}.
          </p>
        </div>
      )}
      {user && (
        <Button className="mb-4" onClick={() => setModalVisible(true)}>
          Send a Message
        </Button>
      )}

      <div className="church-picture-container" style={{ backgroundImage: `url(${church.primaryImageUrl})` }}></div>
      {user && (
        <SendMessageModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          user={user}
          description={`Send a message to ${church.name}`}
          successMessage={`Your message has been sent successfully. ${church?.name} should be in touch soon.`}
        />
      )}
    </div>
  );
};
