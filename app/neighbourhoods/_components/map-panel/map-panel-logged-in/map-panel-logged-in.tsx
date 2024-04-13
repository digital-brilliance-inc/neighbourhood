'use client';
import { Button } from 'react-bootstrap';
import './map-panel-logged-in.scss';
import { useState } from 'react';
import { AdvocateModal } from '@/components/modals/advocate-modal/advocate-modal';
import { User } from 'next-auth';
import { Neighbourhood } from '@/lib/model/neighbourhood';
import { v4 as uuid } from 'uuid';

export const MapPanelLoggedIn = ({ user, createNeighbourhood }: { user: User; createNeighbourhood: () => void }) => {
  const [advocateModalVisible, setAdvocateModalVisible] = useState(false);

  return (
    <div className="map-panel-logged-in">
      <h4 className="bold mb-3">Ready to be a Neighbourhood Advocate?</h4>
      <p className="mb-5">
        You can become a Neighbourhood Advocate in <span className="text-orange bold">three easy steps.</span>
      </p>
      <div className="step-container mb-5">
        <div className="step-number orange">1</div>
        <div className="step-contents">
          <p>Click to start drawing the region on the map that you want to be responsible for.</p>
          <Button className="btn-sm" onClick={createNeighbourhood}>
            Draw My Region
          </Button>
        </div>
      </div>
      <div className="step-container mb-5">
        <div className="step-number orange">2</div>
        <div className="step-contents">
          <p>Provide some additional information about yourself and the neighbourhood.</p>
          <Button className="btn-sm" onClick={() => setAdvocateModalVisible(true)}>
            Fill Out Form
          </Button>
        </div>
      </div>
      <div className="step-container mb-5">
        <div className="step-number orange">3</div>
        <div className="step-contents">
          <p>
            A local Neighbourhood Coach will contact you to further describe the role and to answer any questions you
            may have.
          </p>
        </div>
      </div>
      <p>
        <span className="text-orange bold">That&apos;s it!</span>
      </p>
      <AdvocateModal
        user={user}
        refUrl="milton.church/neighbourhoods"
        modalVisible={advocateModalVisible}
        setModalVisible={setAdvocateModalVisible}
      />
    </div>
  );
};
