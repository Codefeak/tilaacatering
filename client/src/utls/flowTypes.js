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
type User = null | {
  id: string,
  name: string,
  email: string,
};

export type Authentication = {
  loading: boolean,
  authErrors: null | Array<{}>,
  signUpMessage: null | Array<{}>,
  signUpErrors: null | Array<{}>,
  subsErrors: null | Array<{}>,
  userData: null | {},
  user: User,
  allUser: Array<User>,
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
