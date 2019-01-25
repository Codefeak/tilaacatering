// @flow
import React from 'react';
import { connect } from 'react-redux';

import type { StoreState } from '../../../utls/flowTypes';
import * as actions from '../../../store/actions';
import {
  getSingleEvent,
  getShareState,
  getBuyAccessState,
  getCheckUser,
} from '../../../store/reducers';
import Button from '../../Button';
import LocationMap from '../../LocationMap';
import CheckoutForm from '../../Stripe/CheckoutForm';
import DeviceView from '../../DeviceView';

type Props = {
  location: { state: { id: string } },
  computedMatch: { params: { id: string } },
  fullEventDetails: {
    eventSubmissionDate: string,
    eventDate: string,
    eventType: string,
    eventRegion: string,
    eventGuests: number,
    eventFreeMessage: string,
    contactAddress: string,
    contactName: string,
    contactEmail: string,
    contactNumber: string,
  },
  id: string,
  buyAccessState: boolean,
  handleBuyAccess: boolean => mixed,
};

const FullEvent = (props: Props) => {
  const { fullEventDetails, buyAccessState, handleBuyAccess } = props;
  const {
    contactName, contactEmail, contactAddress, contactNumber,
  } = fullEventDetails;
  const handleOnClick = () => {
    handleBuyAccess(buyAccessState);
  };
  return (
    <section className="full-event">
      <h2 className="full-event__title">Contact Information</h2>
      {!contactName ? (
        <div className="full-event__buy-access">
          <div className={`${buyAccessState ? 'hide' : 'show'}`}>
            <Button
              variant="contained"
              color="on-light"
              type="button"
              label="Buy Details"
              onClick={handleOnClick}/>
          </div>
          <div className={`full-event__stripe-form ${buyAccessState ? 'show' : 'hide'}`}>
            <CheckoutForm {...props} />
          </div>
        </div>
      ) : (
        <React.Fragment>
          <div className="full-event__details">
            <DeviceView device="mobile">
              <span className="fas fa-user" />
              <span className="fas fa-phone" />
              <span className="far fa-envelope" />
              <span className="fas fa-map-marker" />
            </DeviceView>
            <DeviceView device="mobileAndLarger">
              <span className="full-event__details__item">Name</span>
              <span className="full-event__details__item">Number</span>
              <span className="full-event__details__item">Email</span>
              <span className="full-event__details__item">Event Address</span>
            </DeviceView>
            <span className="full-event__details__value">{contactName}</span>

            <span className="full-event__details__value">{contactNumber}</span>

            <span className="full-event__details__value">
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            </span>

            <span className="full-event__details__value">
              <a href={`https://maps.google.com/?q=${contactAddress}`}>{contactAddress}</a>
            </span>
          </div>

          <LocationMap className="full-event__map" contactAddress={contactAddress}/>

          <div className="full-event__purchase-info">
            <h2>Purchase Details</h2>
            <div className="full-event__purchase-info__data">
              <span>Amount:</span>
              <span>4999 eur</span>
              <span>Method:</span>
              <span>Visa^^65</span>
              <span>Date:</span>
              <span>12/12/18</span>
            </div>
          </div>
        </React.Fragment>
      )}
    </section>
  );
};
const mapStateToProps = (state: StoreState) => ({
  fullEventDetails: getSingleEvent(state),
  isShared: getShareState(state),
  buyAccessState: getBuyAccessState(state),
  currentUser: getCheckUser(state),
});

export default connect(
  mapStateToProps,
  actions,
)(FullEvent);
