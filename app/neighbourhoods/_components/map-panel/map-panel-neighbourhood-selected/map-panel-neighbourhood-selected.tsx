'use client';
import { Neighbourhood } from '@/lib/model/neighbourhood';
import './map-panel-neighbourhood-selected.scss';
import { User } from 'next-auth';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { SendMessageModal } from '@/components/modals/send-message-modal/send-message-modal';

export const MapPanelNeighbourhoodSelected = ({
  neighbourhood,
  user,
}: {
  neighbourhood: Neighbourhood;
  user: User | undefined;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <div className="map-panel-neighbourhood-selected">
      <div className="tag pink mb-2">Selected Neighbourhood</div>
      <h4 className="bold mb-4">{neighbourhood.name}</h4>
      <p className="mb-4">
        <span className="text-pink bold">Hooray!</span> This neighbourhood has an advocate who is committed to praying,
        building relationships and sharing the practical love of Jesus.
      </p>
      {!user && (
        <div className="create-account-container mb-4">
          <p className="mb-0">
            <a className="pink bold" href="/api/auth/signin">
              Create a Free Account
            </a>
            <br /> to send a message to this Neighbourhood Advocate.
          </p>
        </div>
      )}
      {user && (
        <Button className="mb-4" onClick={() => setModalVisible(true)}>
          Get Connected
        </Button>
      )}

      <h5 className="bold mb-2">Stories</h5>
      <p className="mb-3">
        As stories of progress and change are gathered in this neighbourhood, check back here to see them.
      </p>
      <div
        className="neighbourhood-picture-container"
        style={{ backgroundImage: `url(${neighbourhood.imageUrl})` }}
      ></div>
      {user && (
        <SendMessageModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          user={user}
          description={`Send a message to the neighbourhood advocate for ${neighbourhood.name}`}
          successMessage={`Your message has been sent successfully. The neighbourhood advocate for ${neighbourhood?.name} should be in touch soon.`}
        />
      )}
    </div>
  );
};
