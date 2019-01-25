// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import type { StoreState } from '../../utls/flowTypes';
import { getPurchasedEvent } from '../../store/reducers';
import * as actions from '../../store/actions';

type Events = {
  _id: string,
  eventDate: string,
  contactEmail: string,
  eventRegion: string,
  contactName: string,
  eventGuests: number,
  contactAddress: string,
};
type State = {
  currentPage: number,
  noOfRequestsPerPage: number,
};
type Props = {
  user: { id: string },
  fetchPurchasedList: string => mixed,
  fetchEvent: () => mixed,
  purchasedEvents: Array<Events>,
};

class PurchasedEvents extends Component<Props, State> {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      noOfRequestsPerPage: 5,
    };
  }

  componentDidMount() {
    const { user, fetchPurchasedList, fetchEvent } = this.props;
    fetchEvent();
    fetchPurchasedList(user.id);
  }

  handleClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    this.setState({
      currentPage: Number(event.currentTarget.id),
    });
  };

  render() {
    const { purchasedEvents } = this.props;
    const { currentPage, noOfRequestsPerPage } = this.state;

    // Logic for displaying current paid requests
    const indexOfLastEvent = currentPage * noOfRequestsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - noOfRequestsPerPage;

    const currentEvents = purchasedEvents.slice(indexOfFirstEvent, indexOfLastEvent);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(purchasedEvents.length / noOfRequestsPerPage); i += 1) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => (
      <li role="presentation" key={number} id={number} onClick={this.handleClick}>
        {number}
      </li>
    ));
    return (
      <div>
        <div className="page-numbers">
          <ul>{renderPageNumbers}</ul>
        </div>
        <ul>
          <div className="paid-request_section">
            <ul className="paid_request_heading ">
              <li>Event Date</li>
              <li>Event Region</li>
              <li>No Of Guests</li>
            </ul>
            {purchasedEvents.length > 0 ? (
              currentEvents.map(purchased => (
                <Link
                  key={purchased._id}
                  to={{
                    pathname: '/singleEventLayout',
                    state: { id: `${purchased._id}`, back: '/PurchasedEvents' },
                  }}
                  className="anchor-btn">
                  <div className="paid-request-events">
                    <p className="border">{dayjs(purchased.eventDate).format('YYYY-MM-DD')}</p>
                    <p className="border">{purchased.eventRegion}</p>
                    <p className="border">{purchased.eventGuests}</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="paid-request-events">
                <p className="border">NO PURCHASED MADE YET</p>
              </div>
            )}
          </div>
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (state: StoreState) => ({
  purchasedEvents: getPurchasedEvent(state),
});
export default connect(
  mapStateToProps,
  actions,
)(PurchasedEvents);
