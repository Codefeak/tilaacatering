import axios from 'axios';
import {
  START_FETCHING,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILS,
  FETCH_PURCHASED_LIST_SUCCESS,
  FETCH_PURCHASED_LIST_FAILS,
} from './types';

export const startProfileFetching = () => ({
  type: START_FETCHING,
});
export const startPurchasedListFetching = () => ({
  type: START_FETCHING,
});

export const fetchProfileSuccess = user => ({
  type: FETCH_PROFILE_SUCCESS,
  payload: user,
});
export const fetchProfileFails = err => ({
  type: FETCH_PROFILE_FAILS,
  payload: err,
});

export const fetchProfile = id => async (dispatch) => {
  dispatch(startProfileFetching());
  await axios
    .get(`/api/profile/${id}`)
    .then(res => dispatch(fetchProfileSuccess(res.data)))
    .catch(err => dispatch(fetchProfileFails(err.res)));
};

export const editProfile = (id, values) => async (dispatch) => {
  dispatch(startProfileFetching());
  await axios
    .put(`/api/profile/${id}`, values)
    .then(res => dispatch(fetchProfileSuccess(res.data)))
    .catch(err => dispatch(fetchProfileFails(err.res)));
};

export const fetchPurchasedListSuccess = values => ({
  type: FETCH_PURCHASED_LIST_SUCCESS,
  payload: values,
});
export const fetchPurchasedListFails = err => ({
  type: FETCH_PURCHASED_LIST_FAILS,
  payload: err,
});

export const fetchPurchasedList = id => async (dispatch) => {
  dispatch(startPurchasedListFetching());
  await axios
    .get(`/api/profile/${id}/purchasedEvents`)
    .then(res => dispatch(fetchPurchasedListSuccess(res.data.events)))
    .catch(err => dispatch(fetchPurchasedListFails(err.res)));
};
