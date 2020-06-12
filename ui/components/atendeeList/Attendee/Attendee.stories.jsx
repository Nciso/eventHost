import React, { useState } from 'react';
//  import { action } from '@storybook/addon-actions';
import Attendee from './Attendee';
import { GlobalStyle } from '../../../theme';
import { css } from 'emotion';

export default {
  component: Attendee,
  title: 'Attendee',
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

export const attendeeProps = {
  _id: 'anId',
  firstName: 'Enrique',
  lastName: 'Enciso',
  title: 'Dev',
  companyName: 'Pathable',
  checkInDate: new Date(),
  checkOutDate: 'N/A',
  isCheckedIn: false,
};

export const defaultView = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [values, setValues] = useState(attendeeProps);
  const onCheckIn = () => {
    const previousCheked = !values.isCheckedIn;
    setValues({
      ...values,
      isCheckedIn: previousCheked,
      checkInDate: previousCheked ? new Date() : values.checkInDate,
      checkOutDate: !previousCheked ? new Date() : values.checkOutDate,
    });
  };
  return <Attendee {...values} onCheckIn={onCheckIn} />;
};
