// @flow

import {
  START_FETCHING,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAILS,
  SIGNUP_SUCCESS,
  SIGNUP_FAILS,
  LOG_OUT,
  CHECK_USER,
} from '../actions/types';

type Action = { type: string, payload: {} };
type State = {
  loading: boolean,
  authErrors: null | Array<{}>,
  signUpErrors: null | Array<{}>,
  user: null | {},
  userData: null | {},
};
const initialState = {
  loading: false,
  authErrors: null,
  signUpErrors: null,
  signUpMessage: null,
  user: null,
  userData: null,
};

export default function (state: State = initialState, action: Action) {
  switch (action.type) {
    case START_FETCHING:
      return {
        ...state,
        loading: true,
      };
    case AUTHENTICATION_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        authErrors: null,
        signUpErrors: null,
      };
    case AUTHENTICATION_FAILS:
      return {
        ...state,
        loading: false,
        authErrors: action.payload,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        signUpErrors: null,
        signUpMessage: action.payload.message,
        userData: action.payload.data,
      };
    case SIGNUP_FAILS:
      return {
        ...state,
        loading: false,
        signUpErrors: action.payload,
      };
    case CHECK_USER:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        user: null,
        loading: false,
      };
    default:
      return state;
  }
}
