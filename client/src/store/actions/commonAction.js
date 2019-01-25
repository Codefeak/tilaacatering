// @flow
import { HANDLE_CHECK_BOX, HANDLE_BUY_ACCESS } from './types';

type Fn = (string | number) => mixed;
type DateToNumber = string => () => number;

export const convertDate: Fn = inputFormat => () => {
  const pad = s => (s < 10 ? `0${s}` : s);
  const d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('.');
};

export const dateToNumber: DateToNumber = inputFormat => () => {
  const d = new Date(inputFormat);
  return Number(d.getFullYear() * 365 + (d.getMonth() + 1) * 30 + d.getDate());
};

export const toggleInputType: Fn = (inputType) => {
  const tmp = inputType === 'password' ? 'text' : 'password';
  return { type: HANDLE_CHECK_BOX, payload: tmp };
};

export const handleCheck = inputType => (dispatch) => {
  dispatch(toggleInputType(inputType));
};

export const toggleIsBuyAccess: Fn = input => ({ type: HANDLE_BUY_ACCESS, payload: !input });

export const handleBuyAccess = input => (dispatch) => {
  dispatch(toggleIsBuyAccess(input));
};
