import axios from 'axios';
import {
  START_FETCHING,
  FETCH_EVENTS_LIST_SUCCESS,
  FETCH_EVENTS_LIST_FAILS,
  FETCH_SINGLE_EVENT_SUCCESS,
  FETCH_SINGLE_EVENT_FAILS,
  PURCHASE_EVENT_SUCCESS,
  PURCHASE_EVENT_FAILS,
  SEARCH,
} from './types';

export const startEventFetching = () => ({
  type: START_FETCHING,
});

export const fetchEventSuccess = values => ({
  type: FETCH_EVENTS_LIST_SUCCESS,
  payload: values,
});
export const fetchEventFails = values => ({
  type: FETCH_EVENTS_LIST_FAILS,
  payload: values,
});

export const fetchEvent = () => (dispatch) => {
  dispatch(startEventFetching());
  axios
    .get('/api/events/')
    .then(res => dispatch(fetchEventSuccess(res.data)))
    .catch(err => dispatch(fetchEventFails(err.res)));
};

export const fetchSingleEventSuccess = values => ({
  type: FETCH_SINGLE_EVENT_SUCCESS,
  payload: values,
});
export const fetchSingleEventFails = values => ({
  type: FETCH_SINGLE_EVENT_FAILS,
  payload: values,
});

export const fetchSingleEvent = id => (dispatch) => {
  dispatch(startEventFetching());
  axios
    .get(`/api/events/${id}`)
    .then(res => dispatch(fetchSingleEventSuccess(res.data)))
    .catch(err => dispatch(fetchSingleEventFails(err.res)));
};

export const startPurchasingEvent = () => ({
  type: START_FETCHING,
});
export const purchaseEventSuccess = values => ({
  type: PURCHASE_EVENT_SUCCESS,
  payload: values,
});
export const purchaseEventFails = values => ({
  type: PURCHASE_EVENT_FAILS,
  payload: values,
});
export const purchaseEvent = id => async (dispatch) => {
  dispatch(startPurchasingEvent());
  await axios
    .put(`/api/events/${id}/purchase`)
    .then(res => dispatch(purchaseEventSuccess(res.data)))
    .catch(err => dispatch(purchaseEventFails(err.res)));
  dispatch(fetchSingleEvent(id));
};

export const search = value => ({ type: SEARCH, payload: value });
