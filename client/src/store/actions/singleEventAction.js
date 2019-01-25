import axios from 'axios';
import { START_FETCHING, FETCH_SINGLE_EVENT_SUCCESS, FETCH_SINGLE_EVENT_FAILS } from './types';

export const startSingleEventFetching = () => ({
  type: START_FETCHING,
});

export const fetchSingleEventSuccess = values => ({
  type: FETCH_SINGLE_EVENT_SUCCESS,
  payload: values,
});
export const fetchSingleEventFails = values => ({
  type: FETCH_SINGLE_EVENT_FAILS,
  payload: values,
});

export const fetchSingleEvent = id => (dispatch) => {
  dispatch(startSingleEventFetching());
  axios
    .get(`/api/events/${id}`)
    .then(res => dispatch(fetchSingleEventSuccess(res.data)))
    .catch(err => dispatch(fetchSingleEventFails(err.res)));
};
