// @flow
import {
  START_FETCHING,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILS,
  FETCH_PURCHASED_LIST_SUCCESS,
  FETCH_PURCHASED_LIST_FAILS,
} from '../actions/types';

type Action = { type: string, payload: {} };
type State = {
  loading: boolean,
  profileState: null | Array<{}>,
  profileFetchErr: null | Array<{}>,
  purchasedState: null | Array<{}>,
  purchasedStateErr: null | Array<{}>,
};

const initialState = {
  loading: false,
  profileState: [],
  profileFetchErr: null,
  purchasedState: [],
  purchasedStateErr: null,
};

export default function (state: State = initialState, action: Action) {
  switch (action.type) {
    case START_FETCHING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        loading: true,
        profileState: action.payload,
      };
    case FETCH_PROFILE_FAILS:
      return {
        ...state,
        loading: true,
        profileFetchErr: action.payload,
      };
    case FETCH_PURCHASED_LIST_SUCCESS:
      return {
        ...state,
        loading: true,
        purchasedState: action.payload,
      };
    case FETCH_PURCHASED_LIST_FAILS:
      return {
        ...state,
        loading: true,
        purchasedStateErr: action.payload,
      };
    default:
      return state;
  }
}
