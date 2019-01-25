// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import dayjs from 'dayjs';
import type { StoreState } from '../../../utls/flowTypes';
import { getSingleEvent, getSingleEventLoading } from '../../../store/reducers';
import * as actions from '../../../store/actions';
import EventFullDetails from '../EventFullDetails';
import EventToCalendar from '../../EventToCalendar';
import DateIcon from '../../DateIcon';
import Button from '../../Button';
import Loader from '../../Loader';
import DeviceView from '../../DeviceView';

type Props = {
  fetchSingleEvent: (id: string) => mixed,
  location: { state: { id: string, back: string } },
  singleEvent: {
    eventSubmissionDate: string,
    eventDate: string,
    eventRegion: string,
    eventFreeMessage: string,
    eventGuests: number,
    eventType: string,
    eventDateEnd: string,
  },
  user: {},
  dateToNumber: (string | number) => number,
  loading: boolean,
};

const posted = publishedOn => (
  <div className="sgl-event-lay__posted">
    <span className="far fa-calendar-alt" />
    <span className="last-posted">{publishedOn} days ago</span>
  </div>
)

const calenderItem = (size, eventDate, singleEvent) => (
  <React.Fragment>
    <DateIcon date={eventDate} size={size} color="default" />
    <EventToCalendar singleEvent={singleEvent} />
  </React.Fragment>
)

class SingleEventLayout extends Component<Props> {
  componentDidMount() {
    const { fetchSingleEvent, location } = this.props;
    const { id } = location.state;
    fetchSingleEvent(id);
  }

  render() {
    const {
      location, singleEvent, dateToNumber, loading,
    } = this.props;
    const { state } = location;
    const { id, back } = state;
    let element;
    if (singleEvent) {
      const {
        eventDate,
        eventDateEnd,
        eventFreeMessage,
        eventGuests,
        eventRegion,
        eventSubmissionDate,
        eventType,
      } = singleEvent;

      const dateObj = dayjs(eventDate);
      const dateEndObj = dayjs(eventDateEnd);
      const date = dateObj.format('ddd, MMMM D, YYYY');
      const time = `${dateObj.format('h:mm A')} – ${dateEndObj.format('h:mm A')}`;

      const renderField = [
        { field: 'Date and time', className: 'sgl-event-lay__date-time', content: [date, time] },
        { field: 'Number of Guests', className: 'sgl-event-lay__guests', content: [eventGuests] },
      ];
      const today = Date.now();
      const publishedOn = dateToNumber(today) - dateToNumber(eventSubmissionDate);
      element = (
        <React.Fragment>
          <section className="sgl-event-lay__top">
            <div className="sgl-event-lay__top__back-button">
              <Link to={back} className="anchor-btn">
                <Button variant="outlined" color="secondary" type="button" label="Back" />
              </Link>
            </div>
            <div className="sgl-event-lay__top__calendar">
              <DeviceView device="tabletAndLarger">
                <DateIcon date={eventDate} size="lg" color="default" />
                <EventToCalendar singleEvent={singleEvent} />
              </DeviceView>
              <DeviceView device="tablet">
                <DateIcon date={eventDate} size="md" color="default" />
                <EventToCalendar singleEvent={singleEvent} />
              </DeviceView>
            </div>
            <div className="sgl-event-lay__top__details">
              <DeviceView device="mobile">
                <div className="sgl-event-lay__top__calendar">
                  <DateIcon date={eventDate} size="sm" color="default" />
                  {/* <EventToCalendar singleEvent={singleEvent} /> */}
                </div>
              </DeviceView>
              <div className="sgl-event-lay__title">
                <h2>
                  {eventRegion} - {eventType} event
                </h2>
                <DeviceView device="mobile">
                  {posted(publishedOn)}
                </DeviceView>
              </div>
              <DeviceView device="mobileAndLarger">
                {posted(publishedOn)}
              </DeviceView>
              {renderField.map(item => (
                <div key={item.field} className={item.className}>
                  <span className="sgl-event-lay__item">{item.field}</span>
                  {item.content.map(value => (
                    <span className="sgl-event-lay__value" key={`${item.field} ${value}`}>
                      {value}
                      <br />
                    </span>
                  ))}
                </div>
              ))}
              <div className="sgl-event-lay__message">
                <span className="sgl-event-lay__item">Message</span>
                <div className="sgl-event-lay__value">"{eventFreeMessage}"</div>
              </div>
            </div>
          </section>
          <hr className="divider"/>
          <EventFullDetails id={id} />
        </React.Fragment>
      );
    }
    return <React.Fragment>{loading ? <Loader /> : element}</React.Fragment>;
  }
}

const mapStateToProps = (state: StoreState) => ({
  singleEvent: getSingleEvent(state),
  loading: getSingleEventLoading(state),
});

export default connect(
  mapStateToProps,
  actions,
)(SingleEventLayout);
