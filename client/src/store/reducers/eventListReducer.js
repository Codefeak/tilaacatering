// @flow

import {
  START_FETCHING,
  FETCH_EVENTS_LIST_SUCCESS,
  FETCH_EVENTS_LIST_FAILS,
  PURCHASE_EVENT_FAILS,
  PURCHASE_EVENT_SUCCESS,
  FETCH_SINGLE_EVENT_SUCCESS,
  FETCH_SINGLE_EVENT_FAILS,
  SEARCH,
} from '../actions/types';

type Action = { type: string, payload: {} };
type State = {
  loading: boolean,
  eventFetchErr: null | [],
  events: null | [],
  singleEventFetchErr: null | [],
  singleEvent: null | [],
  purchaseEvent: null | Array<{}>,
  searchedEvents: null | Array<{}>,
  filterPurchasedEvents: null | Array<{}>,
  purchaseEventErr: Array<string>,
  class: string,
};
const initialState = {
  loading: false,
  eventFetchErr: [],
  events: [],
  singleEventFetchErr: [],
  singleEvent: [],
  purchaseEvent: [],
  purchaseEventErr: [],
  searchedEvents: [],
  filterPurchasedEvents: [],
  class: 'not-purchased',
};

export default function (state: State = initialState, action: Action) {
  switch (action.type) {
    case START_FETCHING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_EVENTS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        events: action.payload,
      };
    case FETCH_EVENTS_LIST_FAILS:
      return {
        ...state,
        loading: false,
        eventFetchErr: action.payload,
      };
    case FETCH_SINGLE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        singleEvent: action.payload,
      };
    case FETCH_SINGLE_EVENT_FAILS:
      return {
        ...state,
        loading: false,
        singleEventFetchErr: action.payload,
      };
    case PURCHASE_EVENT_SUCCESS:
      return {
        ...state,
        purchaseEvent: action.payload,
      };
    case PURCHASE_EVENT_FAILS:
      return {
        ...state,
        purchaseEventErr: action.payload,
      };
    case SEARCH: {
      const { payload } = action;
      const works = state.events.filter(event => Object.keys(event).some(key => event[key]
        .toString()
        .toLowerCase()
        .includes(payload.toString().toLowerCase())));
      return {
        ...state,
        searchedEvents: works,
      };
    }
    default:
      return state;
  }
}
