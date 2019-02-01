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
import type { Authentication } from '../../utls/flowTypes';

type Action = { type: string, payload: { data: {}, message: {} } };

const initialState = {
  loading: false,
  authErrors: null,
  signUpErrors: null,
  signUpMessage: null,
  user: null,
  userData: null,
};

export default function (state: Authentication = initialState, action: Action) {
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
    case SIGNUP_SUCCESS: {
      const { data, message } = action.payload;
      return {
        ...state,
        loading: false,
        signUpErrors: null,
        signUpMessage: message,
        userData: data,
      };
    }
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
