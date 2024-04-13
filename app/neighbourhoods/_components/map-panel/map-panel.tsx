'use client';
import { useEffect, useState } from 'react';
import './map-panel.scss';
import Close from '@/public/close.svg';
import Image from 'next/image';
import clsx from 'clsx';
import { User } from 'next-auth';
import { Neighbourhood } from '@/lib/model/neighbourhood';
import { useModal } from '@/app/contexts/modal-context/modal-context';
import { useSession } from 'next-auth/react';
import { sendMessage as sendMessageAction, subscribeToMailingListAction } from '@/lib/actions';
import { useFormState } from 'react-dom';
import { DEFAULT_MIN_VERSION } from 'tls';
import { MapPanelLoggedOut } from './map-panel-logged-out/map-panel-logged-out';
import { MapPanelNeighbourhoodSelected } from './map-panel-neighbourhood-selected/map-panel-neighbourhood-selected';
import { MapPanelChurchSelected } from './map-panel-church-selected/map-panel-church-selected';
import { Church } from '@/lib/model/church';
import { MapPanelLoggedIn } from './map-panel-logged-in/map-panel-logged-in';
import { Spinner } from 'react-bootstrap';

export const MapPanel = ({
  isLoading,
  user,
  selectedNeighbourhood,
  selectedChurch,
  createNeighbourhood,
}: {
  isLoading: boolean;
  user?: User;
  selectedNeighbourhood?: Neighbourhood;
  selectedChurch?: Church;
  createNeighbourhood: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const { data: sessionData } = useSession();

  console.log('User = %o, sessionData = %o', user, sessionData);

  return (
    <>
      <div className={clsx('map-panel-button-container', { open: isOpen })}>
        <div className="map-panel-button" onClick={() => setIsOpen(true)}>
          <Image src="/logo.svg" height="20" width="20" alt="Open map panel" />
        </div>
      </div>
      <div className={clsx('map-panel-container', { open: isOpen })}>
        <Image className="close" src={Close} width={24} onClick={() => setIsOpen(false)} alt="Close" />
        <div className="map-panel-background">
          <div className="map-panel-body">
            {isLoading && (
              <div className="loading-container">
                <Spinner animation="grow" variant="primary" />
                <div className="loading-label">Loading churches and Neighbourhood Advocates</div>
              </div>
            )}
            {!isLoading && selectedNeighbourhood && (
              <MapPanelNeighbourhoodSelected neighbourhood={selectedNeighbourhood} user={user} />
            )}
            {!isLoading && selectedChurch && <MapPanelChurchSelected church={selectedChurch} user={user} />}
            {!isLoading && !user && !selectedNeighbourhood && !selectedChurch && <MapPanelLoggedOut />}
            {!isLoading && user && !selectedNeighbourhood && !selectedChurch && (
              <MapPanelLoggedIn user={user} createNeighbourhood={createNeighbourhood} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
