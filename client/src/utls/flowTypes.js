// @flow
/* eslint-disable flowtype/no-types-missing-file-annotation */

export type EventListProps = {
  events: Array<{
    contactAddress: string,
    contactEmail: string,
    contactName: string,
    contactNumber: string,
    eventDate: string,
    eventFreeMessage: string,
    eventGuests: number,
    eventPurchases: number,
    eventRegion: string,
    eventSubmissionDate: string,
    eventType: string,
    __v: number,
    _id: string,
  }>,
  fetchEvent: () => mixed,
  convertDate: (inputFormat: string) => () => string,
};

export type Authentication = {
  loading: boolean,
  authErrors: string,
  signUpErrors: string,
  signUpMessage: string,
  user: {
    id: string,
    name: string,
    email: string,
  },
  userData: {},
  logOut: boolean,
};

export type Event = {
  loading: boolean,
  eventFetchErr: Array<string>,
  events: Array<{}>,
  singleEventErr: Array<string>,
  singleEvent: {},
  purchasedState: {},
  purchasedStateErr: Array<string>,
  searchedEvents: Array<string>,
};

export type CommonState = {
  inputType: string,
  isShared: string,
  isLogIn: boolean,
  buyAccess: boolean,
};
export type Profile = {
  purchasedState: Array<{}>,
  loading: boolean,
  profileState: {},
  profileFetchErr: Array<string>,
  purchasedStateErr: Array<string>,
};

export type StoreState = {
  authentication: Authentication,
  event: Event,
  commonState: CommonState,
  profile: Profile,
};
