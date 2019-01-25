// @flow
import React from 'react';
import AddToCalendarHOC from 'react-add-to-calendar-hoc';
import moment from 'moment-timezone';
import Button from '../Button';

type Props = {
  singleEvent: {
    eventDate: string,
    eventDateEnd: string,
    eventGuests: number,
    eventRegion: string,
    eventType: string,
    }
};

type PropsDropdown = {
  children: any,
};

const Dropdown = (props: PropsDropdown) => {
  const { children } = props;
  return (
    <div className='event-to-calendar__list'>
      {children.map(link => (
        <div className="event-to-calendar__list__link" key={`calendar-link-${link.key}`}>
            {link}
        </div>
      ))}
    </div>
  );
};

const EventToCalendar = (props: Props) => {
  const {
    singleEvent: {
      eventDate, eventDateEnd, eventGuests, eventRegion, eventType,
    },
  } = props;
  // Timezone should come form props as soon as it's implemented in database.
  const timezone = 'Europe/Helsinki';
  const AddToCalendarDropdown = AddToCalendarHOC(Button, Dropdown);

  const event = {
    description: '',
    duration: moment
      .duration(moment(eventDateEnd).diff(moment(eventDate)))
      .asHours()
      .toString(),
    endDatetime: moment(eventDateEnd)
      .tz(timezone)
      .format('YYYYMMDDTHHmmss'),
    location: '',
    startDatetime: moment(eventDate)
      .tz(timezone)
      .format('YYYYMMDDTHHmmss'),
    timezone,
    title: `TilaaCatering - ${eventType} event @${eventRegion} - ${eventGuests} ppl`,
  };

  return (
    <AddToCalendarDropdown
      buttonProps={{
        className: 'Button event-to-calendar__button',
        type: 'button',
        label: 'Export Event',
        color: 'secondary',
        variant: 'outlined',
        size: 'lg',
      }}
      linkProps={{
        className: 'Button',
      }}
      className="event-to-calendar"
      event={event}/>
  );
};

export default EventToCalendar;
