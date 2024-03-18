'use client';
import { useState } from 'react';
import './map-panel.scss';
import Close from '@/public/close.svg';
import Image from 'next/image';
import clsx from 'clsx';
import { User } from 'next-auth';
import { Neighbourhood } from '@/lib/model/neighbourhood';

export const MapPanel = ({ user, selectedNeighbourhood }: { user?: User; selectedNeighbourhood?: Neighbourhood }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div className={clsx('map-panel-button-container', { open: isOpen })}>
        <div className="map-panel-button" onClick={() => setIsOpen(true)}>
          <Image src="/logo.svg" height="20" width="20" alt="Open map panel" />
        </div>
      </div>
      <div className={clsx('map-panel-container', { open: isOpen })}>
        <div className="map-panel-background">
          <Image className="close" src={Close} width={24} onClick={() => setIsOpen(false)} alt="Close" />
          {user && !selectedNeighbourhood && <div className="title">Welcome to the map {user.name}.</div>}
          {user && selectedNeighbourhood && (
            <>
              <div className="title">{selectedNeighbourhood.name}</div>
              <div className="body">Send a message to the advocate for this neighbourhood</div>
              <div className="body">userId: {selectedNeighbourhood.userId}</div>
            </>
          )}
          {!user && !selectedNeighbourhood && (
            <>
              <div className="title">In Milton as it is in heaven.</div>
              <div className="body">
                Browse the map to see the neighbourhoods in Milton that have advocates. Select a neighbourhood with an
                advocate to see more information, including stories of progress.
              </div>
            </>
          )}
          {!user && selectedNeighbourhood && (
            <>
              <div className="title">{selectedNeighbourhood.name}</div>
              <div className="body">See stats about this neighbourhood</div>
              <div className="body">Log in to send a message to the neighbourhood advocate</div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
