// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import dayjs from 'dayjs';
import type { StoreState } from '../../../utls/flowTypes';
import {
  getSingleEvent,
  getSingleEventLoading,
  getCheckUser,
  getUserList,
} from '../../../store/reducers';
import * as actions from '../../../store/actions';
import EventFullDetails from '../EventFullDetails';
import EventToCalendar from '../../EventToCalendar';
import DateIcon from '../../DateIcon';
import Button from '../../Button';
import Loader from '../../Loader';
import DeviceView from '../../DeviceView';

type User = { _id: string, id: string, company: string };

type Props = {
  fetchSingleEvent: (id: string) => mixed,
  fetchAllUser: () => mixed,
  location: { state: { id: string, back: string } },
  singleEvent: {
    eventSubmissionDate: string,
    eventDate: string,
    eventRegion: string,
    eventFreeMessage: string,
    eventGuests: number,
    eventType: string,
    eventDateEnd: string,
    eventPrice: string,
    eventPurchasers: Array<{ user: string }>,
    user: User,
  },
  user: User,
  dateToNumber: (string | number) => number,
  loading: boolean,
  userList: Array<User>,
};

const posted = publishedOn => (
  <div className="sgl-event-lay__posted">
    <span className="far fa-calendar-alt" />
    <span className="last-posted">{publishedOn} days ago</span>
  </div>
);

class SingleEventLayout extends Component<Props> {
  componentDidMount() {
    const { fetchSingleEvent, location, fetchAllUser } = this.props;
    const { id } = location.state;
    fetchSingleEvent(id);
    fetchAllUser();
  }

  render() {
    const {
      location, singleEvent, dateToNumber, loading, user, userList,
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
        eventPrice,
        eventPurchasers,
      } = singleEvent;

      const dateObj = dayjs(eventDate);
      const dateEndObj = dayjs(eventDateEnd);
      const date = dateObj.format('ddd, MMMM D, YYYY');
      const time = `${dateObj.format('h:mm A')} – ${dateEndObj.format('h:mm A')}`;

      const renderField = [
        { field: 'Date and Time', className: 'sgl-event-lay__date-time', content: [date, time] },
        { field: 'Number of Guests', className: 'sgl-event-lay__guests', content: [eventGuests] },
      ];
      const today = Date.now();
      const publishedOn = dateToNumber(today) - dateToNumber(eventSubmissionDate);
      const eventPurchasersArray = eventPurchasers
        && eventPurchasers.map(buyer => userList.filter(allUser => allUser._id === buyer.user));
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
                <DeviceView device="mobile">{posted(publishedOn)}</DeviceView>
              </div>
              <DeviceView device="mobileAndLarger">{posted(publishedOn)}</DeviceView>
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
                <div className="sgl-event-lay__value">{eventFreeMessage}</div>
              </div>
              <div className="sgl-event-lay__price">
                <span className="sgl-event-lay__value">
                  {eventPurchasers && eventPurchasers.some(buyer => buyer.user === user.id)
                    ? 'Purchased'
                    : `${(Number(eventPrice) / 100).toFixed(2)} €`}
                </span>
              </div>
              <div className="sgl-event-lay__purchasers">
                <span className="sgl-event-lay__item">Purchasers</span>
                <ul className="sgl-event-lay__value">
                  {eventPurchasersArray
                    && eventPurchasersArray.map(data => data.map(uD => <li key={uD._id}> {uD.company}</li>))}
                </ul>
              </div>
            </div>
          </section>
          <hr className="divider" />
          <EventFullDetails id={id} />
        </React.Fragment>
      );
    }
    return <React.Fragment>{loading ? <Loader /> : element}</React.Fragment>;
  }
}

const mapStateToProps = (state: StoreState) => ({
  user: getCheckUser(state),
  singleEvent: getSingleEvent(state),
  loading: getSingleEventLoading(state),
  userList: getUserList(state),
});

export default connect(
  mapStateToProps,
  actions,
)(SingleEventLayout);
