// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import type { StoreState } from '../../../utls/flowTypes';
import Event from '../EventListComponent';
import Button from '../../Button';
import * as actions from '../../../store/actions';
import {
  getEvent,
  getSearchedEvents,
  getPurchasedEvent,
  getCheckUser,
} from '../../../store/reducers';

type fields = {
  contactAddress: string,
  contactEmail: string,
  contactName: string,
  contactNumber: string,
  eventDate: string,
  eventFreeMessage: string,
  eventGuests: number,
  eventPurchases: number,
  eventPurchasers: Array<{ _id: string }>,
  eventRegion: string,
  eventSubmissionDate: string,
  eventType: string,
  __v: number,
  _id: string,
};
type Fn = (e: SyntheticEvent<HTMLButtonElement>) => mixed;

type Props = {
  user: { id: string, role: string },
  searchedEvents: Array<fields>,
  events: Array<fields>,
  fetchEvent: () => mixed,
  convertDate: (string | number) => string,
  dateToNumber: (string | number) => number,
  search: string => mixed,
  purchasedEvents: Array<{ _id: string }>,
  fetchPurchasedList: string => mixed,
};

type State = {
  sortedBy: string,
  orderEventDateBy: string,
  orderGuestBy: string,
  orderTypeBy: string,
  orderRegionBy: string,
  searching: string,
  sorting: string,
};

class EventList extends React.Component<Props, State> {
  state = {
    sortedBy: '',
    orderEventDateBy: '',
    orderGuestBy: '',
    orderTypeBy: '',
    orderRegionBy: '',
    searching: '',
    sorting: '',
  };

  componentDidMount() {
    const { user, fetchPurchasedList, fetchEvent } = this.props;
    fetchEvent();
    fetchPurchasedList(user.id);
  }

  toggleOrder: Fn = (e) => {
    const {
      orderEventDateBy, orderGuestBy, orderTypeBy, orderRegionBy,
    } = this.state;
    let { sortedBy } = this.state;
    const { innerHTML } = e.target;
    if (innerHTML === 'Date') {
      sortedBy = 'eventDate';
      return this.setState({
        sortedBy,
        orderEventDateBy: orderEventDateBy === 'asc' ? 'dsc' : 'asc',
        sorting: orderEventDateBy,
      });
    }
    if (innerHTML === 'Guests') {
      sortedBy = 'guest';
      return this.setState({
        sortedBy,
        orderGuestBy: orderGuestBy === 'asc' ? 'dsc' : 'asc',
        sorting: orderGuestBy,
      });
    }
    if (innerHTML === 'Type') {
      sortedBy = 'type';
      return this.setState({
        sortedBy,
        orderTypeBy: orderTypeBy === 'asc' ? 'dsc' : 'asc',
        sorting: orderTypeBy,
      });
    }
    if (innerHTML === 'Region') {
      sortedBy = 'region';
      return this.setState({
        sortedBy,
        orderRegionBy: orderRegionBy === 'asc' ? 'dsc' : 'asc',
        sorting: orderRegionBy,
      });
    }
  };

  handleSort: Fn = (e) => {
    const {
      orderEventDateBy, orderGuestBy, orderTypeBy, orderRegionBy,
    } = this.state;
    const { innerHTML } = e.target;

    const { dateToNumber, events } = this.props;
    this.toggleOrder(e);

    if (innerHTML === 'Date') {
      return orderEventDateBy === 'asc'
        ? events.sort((a, b) => dateToNumber(b.eventDate) - dateToNumber(a.eventDate))
        : events.sort((a, b) => dateToNumber(a.eventDate) - dateToNumber(b.eventDate));
    }
    if (innerHTML === 'Guests') {
      return orderGuestBy === 'asc'
        ? events.sort((a, b) => b.eventGuests - a.eventGuests)
        : events.sort((a, b) => a.eventGuests - b.eventGuests);
    }
    if (innerHTML === 'Type') {
      return orderTypeBy === 'asc'
        ? events.sort((a, b) => {
          const nameA = a.eventType;
          const nameB = b.eventType;
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        })
        : events.sort((a, b) => {
          const nameA = a.eventType;

          const nameB = b.eventType;
          if (nameA < nameB) return 1;
          if (nameA > nameB) return -1;
          return 0;
        });
    }
    if (innerHTML === 'Region') {
      return orderRegionBy === 'asc'
        ? events.sort((a, b) => {
          const nameA = a.eventRegion;
          const nameB = b.eventRegion;
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        })
        : events.sort((a, b) => {
          const nameA = a.eventRegion;

          const nameB = b.eventRegion;
          if (nameA < nameB) return 1;
          if (nameA > nameB) return -1;
          return 0;
        });
    }
  };

  determinePurchaseLevel = (event) => {
    switch (event.eventPurchases) {
      case 1:
        return 'green';
      case 2:
        return 'yellowgreen';
      case 3:
        return 'yellow';
      case 4:
        return 'orange';
      case 5:
        return 'red';
      default:
        return '';
    }
  };

  render() {
    let { events } = this.props;
    const {
      convertDate, search, searchedEvents, purchasedEvents, user,
    } = this.props;
    const { searching, sorting } = this.state;
    if (searching !== '') {
      events = searchedEvents;
    }
    return (
      // <div className="event-list_section">
      <React.Fragment>
        <div className="heading">
          <ul className="event_panel_heading" onClick={e => this.handleSort(e)}>
            {['Date', 'Region', 'Guests', 'Type'].map(label => (
              <li key={`sortbtn-${label}`}>
                <Button label={label} size="sm" variant="outlined" color="secondary-dark" />
              </li>
            ))}
            <div
              style={{
                float: 'right',
                width: '20px',
                margin: '0px 40px 0px',
              }}>
              <div
                style={{
                  color: sorting === 'asc' ? 'white' : 'black',
                }}>
                &#x25B2;
              </div>
              <div
                style={{
                  color: sorting === 'asc' ? 'black' : 'white',
                }}>
                &#x25BC;
              </div>
            </div>
          </ul>
          <div className="search-bar">
            <input
              id="search-input"
              placeholder="Search here..."
              onChange={(e) => {
                search(e.target.value);
                this.setState({ searching: e.target.value });
              }}/>
            <span className="search-icon fas fa-search" />
          </div>
        </div>
        <div className="list-container">
          {events.map((event) => {
            const element = (
              <div className="event-list" key={event._id}>
                <Link
                  to={{
                    pathname: '/singleEventLayout',
                    state: { id: `${event._id}`, back: '/' },
                  }}
                  className="anchor-btn">
                  <Event
                    event={event}
                    convertDate={convertDate}
                    purchaseLevel={this.determinePurchaseLevel(event)}
                    purchased={
                      purchasedEvents.map(tmp => tmp._id).includes(event._id) ? 'purchased' : ''
                    }/>
                </Link>
              </div>
            );
            return user.role === 'admin' ? element : event.eventPurchases < 6 && element;
          })}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  user: getCheckUser(state),
  events: getEvent(state),
  searchedEvents: getSearchedEvents(state),
  purchasedEvents: getPurchasedEvent(state),
});

export default connect(
  mapStateToProps,
  actions,
)(EventList);
