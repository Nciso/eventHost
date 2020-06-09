import React from 'react';
import EventSelector from './EventSelector';
import { GlobalStyle } from '../../theme';

export default {
  component: EventSelector,
  title: 'EventSelector',
  decorators: [
    storyFn => (
      <>
        <GlobalStyle />
        {storyFn()}
      </>
    ),
  ],
};

const eventSelectorProps = [
  {
    name: 'event 1',
    totalPeople: 100,
    _id: 'id1',
    totalChekedIn: 15,
    companyArray: [
      { name: 'Acme', count: 5 },
      { name: 'Acme2', count: 5 },
      { name: 'Acm4', count: 5 },
    ],
  },
  {
    name: 'event 2',
    totalPeople: 25,
    _id: 'id2',
    totalChekedIn: 15,
    companyArray: [
      { name: 'Acme', count: 10 },
      { name: 'Acme2', count: 5 },
    ],
  },
];

export const defaultView = () => <EventSelector events={eventSelectorProps} />;
