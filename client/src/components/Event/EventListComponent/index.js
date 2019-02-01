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
    eventPurchasers: Array<{ _id: string }>,
  },
  purchaseLevel: string,
  purchased: string,
};
const Event = ({ event, purchased, purchaseLevel }: Props) => {
  const {
    eventDate, eventGuests, eventType, eventRegion, eventPurchasers,
  } = event;
  return (
    <ul className="event_panel">
      <li>
        <DateIcon date={eventDate} size="sm" />
      </li>
      <li>{eventRegion}</li>
      <li>{eventGuests}</li>
      <li>{eventType}</li>
      <li className="purchase-level">
        {eventPurchasers.map(buyer => (
          <p key={buyer._id} className={`purchase-level--circle ${purchaseLevel}`} />
        ))}
      </li>
      <li className={purchased} />
    </ul>
  );
};

export default Event;
