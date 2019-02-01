// @flow
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authenticationReducer from './authenticationReducer';
import eventListReducer from './eventListReducer';
import commonReducers from './commonReducers';
import profileReducer from './profileReducer';
import type { StoreState } from '../../utls/flowTypes';

type Fn = (state: StoreState) => mixed;

export default combineReducers({
  authentication: authenticationReducer,
  form: formReducer,
  event: eventListReducer,
  commonState: commonReducers,
  profile: profileReducer,
});

export const getAuthentication: Fn = state => state.authentication;
export const getUser: Fn = state => state.authentication.user;
export const getSignedUpData: Fn = state => state.authentication.userData;
export const getAuthenticationErrors: Fn = state => state.authentication.authErrors;

export const getSignUpMessage: Fn = state => state.authentication.signUpMessage;
export const getSignUpErrors: Fn = state => state.authentication.signUpErrors;

export const getCheckUser: Fn = state => state.authentication.user;

export const getEvent: Fn = state => state.event.events;
export const getEventFetchErrors: Fn = state => state.event.eventFetchErr;
export const getPurchaseEvent: Fn = state => state.event.purchasedState;
export const getPurchaseEventErrors: Fn = state => state.event.purchasedStateErr;
export const getSearchedEvents: Fn = state => state.event.searchedEvents;

export const getSingleEventLoading: Fn = state => state.event.loading;
export const getSingleEvent: Fn = state => state.event.singleEvent;
export const getSingleEventErrors: Fn = state => state.event.singleEventErr;

export const getInputType: Fn = state => state.commonState.inputType;
export const getShareState: Fn = state => state.commonState.isShared;
export const getBuyAccessState: Fn = state => state.commonState.buyAccess;

export const getProfileState: Fn = state => state.profile.profileState;
export const getProfileErr: Fn = state => state.profile.profileFetchErr;
export const getPurchasedEvent: Fn = state => state.profile.purchasedState;
export const getPurchasedEventErr: Fn = state => state.profile.purchasedStateErr;
