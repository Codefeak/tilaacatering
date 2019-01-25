// @flow
import { HANDLE_CHECK_BOX, HANDLE_BUY_ACCESS } from '../actions/types';
import type{ CommonState } from '../../utls/flowTypes';

type Action = { type: string, payload: {} };

const initialState = {
  inputType: 'password',
  isShared: 'hide',
  value: 'asc',
  buyAccess: false,
};

export default function (state: CommonState = initialState, action: Action) {
  switch (action.type) {
    case HANDLE_CHECK_BOX:
      return {
        ...state,
        inputType: action.payload,
      };
    case HANDLE_BUY_ACCESS:
      return {
        ...state,
        buyAccess: action.payload,
      };
    default:
      return state;
  }
}
