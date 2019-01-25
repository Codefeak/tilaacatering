// @flow
import * as React from 'react';
import SingleEventLayout from '../Event/SingleEventLayout';
import EventFullDetails from '../Event/EventFullDetails';

import EventList from '../Event/EventList';
import Profile from '../Profile';
import PurchasedEvents from '../PurchasedEvents';

type List = Array<{ path: string, name: string, component: React.Node }>;

const componentList: List = [
  {
    path: '/',
    component: EventList,
    name: 'Event',
  },
  {
    path: '/singleEventLayout',
    component: SingleEventLayout,
    name: '',
  },
  {
    path: '/profile',
    component: Profile,
    name: 'Profile',
  },
  {
    path: '/purchasedEvents',
    component: PurchasedEvents,
    name: 'Purchased History',
  },
  {
    path: '/:id/eventFullDetails',
    component: EventFullDetails,
    name: 'EventFullDetails',
  },
];

export default componentList;
