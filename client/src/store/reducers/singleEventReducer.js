// @flow
import {
  START_FETCHING,
  FETCH_SINGLE_EVENT_SUCCESS,
  FETCH_SINGLE_EVENT_FAILS,
} from '../actions/types';

type Action = { type: string, payload: {} };
type State = {
  loading: boolean,
  singleEventFetchErr: null | [],
  singleEvent: null | [],
};

const intialState = {
  loading: false,
  singleEventFetchErr: null,
  singleEvent: null,
};

export default function (state: State = intialState, action: Action) {
  switch (action.type) {
    case START_FETCHING:
      return {
        ...state,
        loading: true,
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
    default:
      return state;
  }
}
