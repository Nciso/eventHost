import React, { useState } from 'react';
import { css } from 'emotion';
import formatDate from '../../../utils/formatDate';
import { neutral } from '../../../theme';
import { typeScale } from '../../../theme';
import Button from './CheckInButton';

const Attendee = ({
  _id = '',
  firstName = '',
  lastName = '',
  companyName = '',
  title = '',
  checkInDate = '',
  checkOutDate = '',
  isCheckedIn = false,
  onCheckIn,
}) => {
  const timerSettings = {
    activeTimer: false,
    currentSecond: 5,
  };

  const [timerValues, setTimerValues] = useState(timerSettings);

  /**
   * This function shows a timer for allowing the user to check out the user after a check in
   * @name delay
   * @param {numer} second current second of the timer
   * @param {number} maxLimit max limit of seconds
   */
  const delay = (second, maxLimit) => {
    setTimeout(() => {
      const displaySecond = maxLimit - second;
      if (displaySecond === 0) {
        setTimerValues({ ...timerSettings });
        return;
      }
      setTimerValues({ activeTimer: true, currentSecond: displaySecond });
    }, second * 1000);
  };

  /**
   * This function triggers the behavior of the counter of  seconds
   */
  function changeStatus() {
    for (let i = 0; i <= 5; i++) {
      delay(i, timerValues.currentSecond);
    }
    // if (didMountRef.current) {
    // } else didMountRef.current = true;
  }

  const dateLabelsStyle = css`
    color: black;
    font-size: 1.1rem;
  `;

  /**
   * This Function notifies the parent for a click in the principal button
   */
  const changeAttendeeStatus = () => {
    onCheckIn(_id);
    if (!isCheckedIn) {
      changeStatus();
    }
  };

  return (
    <li
      className={css`
        display: flex;
        padding: 1rem;
        flex-direction: column;
        border-radius: 5px;
        margin-bottom: 30px;
        -webkit-box-shadow: 0px 12px 15px 0px rgba(0, 0, 0, 0.67);
        box-shadow: 0px 12px 15px 0px rgba(0, 0, 0, 0.67);
        background-color: ${neutral[100]};
        @media (min-width: 420px) {
          flex-direction: row;
        }
      `}
    >
      <div
        className={css`
          flex-grow: 3;
        `}
      >
        <p
          className={css`
            font-size: ${typeScale.header3};
          `}
        >
          Full name:{' '}
          <strong>
            {' '}
            {firstName} {lastName}
          </strong>
        </p>
        <p
          className={css`
            font-size: ${typeScale.header4};
          `}
        >
          Title: <strong>{title}</strong>
        </p>
        <p
          className={css`
            font-size: ${typeScale.header4};
          `}
        >
          Company: {companyName}
        </p>
        <div
          className={css`
            display: flex;
          `}
        >
          <div
            className={css`
              flex-grow: 0.5;
            `}
          >
            <label className={dateLabelsStyle}>Check-in date</label>
            <p>{formatDate(checkInDate) || 'N/A'}</p>
          </div>
          <div>
            <label className={dateLabelsStyle}>Check-out date</label>
            <p>{formatDate(checkOutDate) || 'N/A'}</p>
          </div>
        </div>
      </div>
      <div
        className={css`
          flex-grow: 1;
          display: flex;
          flex-direction: row;
          justify-content: center;
          @media (min-width: 420px) {
            flex-direction: column;
          }
        `}
      >
        {timerValues.activeTimer || (
          <Button
            onClick={changeAttendeeStatus}
            variant={isCheckedIn ? 'warning' : 'primary'}
          >
            {!isCheckedIn ? 'Check in' : 'Check out'}{' '}
            {`${firstName} ${lastName}`}
          </Button>
        )}
        <p
          className={css`
            display: ${timerValues.activeTimer ? 'block' : 'none'};
          `}
        >
          you can check-out {firstName} in {timerValues.currentSecond}s
        </p>
      </div>
    </li>
  );
};

export default Attendee;
