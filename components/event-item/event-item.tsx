import { ReactNode } from 'react';
import './event-item.scss';
import { EventModel } from '@/lib/model/event-model';
import moment from 'moment';
import calendarIcon from '@/public/calendar.png';
import placeIcon from '@/public/place.png';
import Image from 'next/image';

export const EventItem = ({ eventItem }: { eventItem: EventModel }) => {
  return (
    <div className="event-item class-for-specificity">
      <div
        className="event-item-image-container"
        style={{
          backgroundImage: `url(${eventItem.imageUrl})`,
        }}
      ></div>
      <div className="event-details-container">
        <div className="event-title">{eventItem.title}</div>
        <div className="event-description">{eventItem.shortDescription}</div>
        <div className="event-date-place-container">
          <div className="item">
            <Image className="icon" src={calendarIcon} width={24} alt="calendar"></Image>
            <div>
              <div>{moment(eventItem.startDate).format('MMMM D, YYYY')}</div>
              <div>{eventItem.startTime + (!eventItem.endTime ? '' : ' - ' + eventItem.endTime)}</div>
            </div>
          </div>
          <div className="item">
            <Image className="icon" src={placeIcon} width={24} alt="place"></Image>
            <div>
              <div>{eventItem.locationName}</div>
              <div>{eventItem.locationAddress}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
