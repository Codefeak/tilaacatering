import axios from 'axios';
import {
  START_FETCHING,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAILS,
  SUBSCRIPTION_FAILS,
  SIGNUP_SUCCESS,
  SIGNUP_FAILS,
  LOG_OUT,
  CHECK_USER,
  FETCH_USER,
} from './types';

export const startFetching = () => ({
  type: START_FETCHING,
});
export const authenticationSuccess = user => ({
  type: AUTHENTICATION_SUCCESS,
  payload: user,
});

export const authentication = values => async (dispatch) => {
  dispatch(startFetching());
  await axios
    .post('/api/users/login', values)
    .then(response => dispatch(
      axios
        .post('/stripe/checkSubscription', { ...values, data: response.data })
        .then(res => (res.data === 'Subscribed'
          ? dispatch(authenticationSuccess(response.data))
          : dispatch({
            type: SUBSCRIPTION_FAILS,
            payload: { err: res.data, values, userData: response.data },
          }))),
    ))
    .catch(err => dispatch({ type: AUTHENTICATION_FAILS, payload: err.response && err.response.data }));
};

export const registration = values => dispatch => axios
  .post('/api/users/register', { ...values, role: 'user' })
  .then(res => dispatch({
    type: SIGNUP_SUCCESS,
    payload: {
      data: res.data,
      message: 'Your Signup Request is Successful, Please Subscribe to login',
    },
  }))
  .catch(err => dispatch({
    type: SIGNUP_FAILS,
    payload: err.response.data,
  }));

export const logOut = () => async (dispatch) => {
  await axios.get('/api/users/logout');
  dispatch({ type: LOG_OUT });
};

export const checkUserSuccess = user => ({
  type: CHECK_USER,
  payload: user,
});
export const checkUser = () => async (dispatch) => {
  dispatch(startFetching());
  await axios
    .get('/api/users/current')
    .then(res => dispatch(checkUserSuccess(res.data)))
    .catch(() => dispatch(logOut()));
};

export const fetchAllUser = () => async (dispatch) => {
  dispatch(startFetching());
  await axios
    .get('/api/users/')
    .then(res => dispatch({ type: FETCH_USER, payload: res.data }))
    .catch(err => err.response);
};
