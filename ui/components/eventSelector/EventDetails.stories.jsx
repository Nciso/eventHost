import React from 'react';
import EventDetails from './EventDetails';
import { GlobalStyle } from '../../utils';

export default {
  component: EventDetails,
  title: 'EventDetails',
  decorators: [
    storyFn => (
      <>
        <GlobalStyle />
        {storyFn()}
      </>
    ),
  ],
  excludeStories: /.*Props$/,
};

export const eventDetailsProps = {
  totalPeople: 100,
  totalChekedIn: 15,
  companyArray: [
    { name: 'Acme', count: 5 },
    { name: 'Acme2', count: 5 },
    { name: 'Acm4', count: 5 },
  ],
};

export const defaultView = () => <EventDetails {...eventDetailsProps} />;
