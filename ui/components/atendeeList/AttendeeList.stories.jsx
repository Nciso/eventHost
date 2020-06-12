import React from 'react';
//  import { action } from '@storybook/addon-actions';
import AttendeeList from './AttendeeList';
import { GlobalStyle } from '../../theme';
import { css } from 'emotion';

import { attendeeProps } from './Attendee/Attendee.stories';

export default {
  component: AttendeeList,
  title: 'AttendeeList',
  decorators: [
    storyFn => (
      <>
        <GlobalStyle />
        <ul
          className={css`
            padding: 0.5rem;
          `}
        >
          {storyFn()}
        </ul>
      </>
    ),
  ],
  excludeStories: /.*Props$/,
};

const multipleAttendees = [attendeeProps, attendeeProps]

export const defaultView = () => (
  <AttendeeList attendeeList={multipleAttendees} />
);

export const emptyState = () => <AttendeeList attendeeList={[]} />;
