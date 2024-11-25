'use client';

import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useFormState } from 'react-dom';
import './event-modal.scss';
import parse from 'html-react-parser';
import { SendMessageModal } from '../send-message-modal/send-message-modal';
import { useSession } from 'next-auth/react';
import { EventModel } from '@/lib/model/event-model';
import { AddToCalendarButton } from 'add-to-calendar-button-react';
import moment from 'moment';
import { useSearchParams } from 'next/navigation';

export const EventModal = ({
  modalVisible,
  eventItem,
  setModalVisible,
}: {
  modalVisible: boolean;
  eventItem: EventModel | undefined;
  setModalVisible: (modalVisible: boolean) => void;
}) => {
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const { data: session } = useSession();

  const closeModal = () => {
    const updatedSearchParams = new URLSearchParams();
    window.history.pushState(null, '', '?' + updatedSearchParams.toString());
    setModalVisible(false);
  };

  return (
    <Modal className="event-modal" show={modalVisible} onHide={closeModal} centered>
      <Modal.Header closeButton className="pt-3 pb-3 ps-4 pe-4">
        <Modal.Title className="w-100">
          <div style={{ flexGrow: 1 }}>{eventItem?.title}</div>
          <div style={{ paddingRight: 16 }}>
            <AddToCalendarButton
              name={eventItem?.title}
              options={['Apple', 'Google']}
              location={eventItem?.locationName + ' - ' + eventItem?.locationAddress}
              startDate={eventItem?.startDate}
              endDate={eventItem?.startDate}
              startTime={moment(eventItem?.startTime, 'h:mm a').format('HH:mm')}
              endTime={moment(eventItem?.endTime, 'h:mm a').format('HH:mm')}
              timeZone={Intl.DateTimeFormat().resolvedOptions().timeZone}
            ></AddToCalendarButton>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-3 pb-3 ps-4 pe-4">
        <h5>{eventItem?.shortDescription}</h5>
        <div className="event-info-container">
          {/* {eventItem && eventItem?.leaders?.length > 0 && (
            <div className="event-leader-container">
              {eventItem?.leaders?.[0]?.imageUrl && (
                <div
                  className="event-leader-image-container"
                  style={{ backgroundImage: `url(${eventItem?.leaders[0].imageUrl})` }}
                ></div>
              )}
              <div className="event-leader-name mt-3">{eventItem?.leaders[0].name}</div>
              <div className="event-leader-title">{eventItem?.leaders[0].title}</div>
            </div>
          )} */}
          <div>
            <div className="event-description-container">{parse(eventItem?.description || '<p></p>')}</div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {eventItem?.hubspotCTALabel && eventItem?.hubspotCTAClass && (
          <div>
            <Button className={'btn-sm btn-inverse ' + eventItem.hubspotCTAClass}>{eventItem.hubspotCTALabel}</Button>
          </div>
        )}
        {!eventItem?.hubspotCTALabel && !eventItem?.hubspotCTAClass && (
          <Button className="btn-sm btn-inverse" onClick={() => setContactModalVisible(true)}>
            Get in Touch
          </Button>
        )}
      </Modal.Footer>
      <SendMessageModal
        modalVisible={contactModalVisible}
        setModalVisible={setContactModalVisible}
        description={`Send a message to the organizers of this event and someone will be in touch soon.`}
        successMessage="Your message was sent successfully. Thank you for reaching out!"
        subject="Event Connection Request"
        context={'Event: ' + eventItem?.title}
        user={session?.user}
        title="Get in Touch"
      />
    </Modal>
  );
};
