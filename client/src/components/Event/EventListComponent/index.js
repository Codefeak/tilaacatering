// @flow
import React from 'react';
import DateIcon from '../../DateIcon';

type Props = {
  event: {
    eventDate: string,
    eventGuests: number,
    eventType: string,
    eventRegion: string,
    eventSubmissionDate: string,
    eventFreeMessage: string,
    eventPurchases: number,
  },
  purchased: string,
};
const Event = ({ event, purchased }: Props) => {
  const {
    eventDate, eventGuests, eventType, eventRegion,
  } = event;
  return (
    <ul className="event_panel">
      <li>
        <DateIcon date={eventDate} size="sm" />
      </li>
      <li>{eventRegion}</li>
      <li>{eventGuests}</li>
      <li>{eventType}</li>
      <li className={purchased} />
    </ul>
  );
};

export default Event;
