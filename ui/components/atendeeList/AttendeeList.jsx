import React from 'react';
import Attendee from './Attendee/Attendee';
import { css } from 'emotion';
import { neutral } from '../../theme';

const AttendeeList = ({ attendeeList = [], onChecked }) => (
  <div
    className={css`
      display: flex;
      justify-content: center;
      margin-top: -10px;
      @media (min-width: 420px) {
        margin-top: -20px;
      }
    `}
  >
    <div
      className={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
      `}
    >
      <ul
        className={css`
          margin: 0;
          padding: 0;
          background-color: ${neutral[400]};
          overflow-y: scroll;
          height: 60vh;
          padding: 1rem;
          width: 100%;
          @media (min-width: 420px) {
            width: 50%;
          }
        `}
      >
        {attendeeList.length === 0 && (
          <div
            className={css`
              text-align: center;
              display: flex;
              width: 100%;
              height: 100%;
              align-items: center;
              justify-content: center;
            `}
          >
            <h1>Please select an event.</h1>
          </div>
        )}
        {attendeeList.map(attendee => (
          <Attendee {...attendee} key={attendee._id} onCheckIn={onChecked} />
        ))}
      </ul>
    </div>
  </div>
);

export default AttendeeList;
