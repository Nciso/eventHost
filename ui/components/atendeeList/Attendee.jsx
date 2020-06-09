import React, { useEffect, useRef, useState } from 'react';
import { css } from 'emotion';
import formatDate from '../../utils/formatDate';

const Button = props => (
  <button
    className={css`
      max-width: 12rem;
      height: 3rem;
      cursor: pointer;
    `}
    {...props}
  >
    {props.children}
  </button>
);

const Attendee = ({
  firstName = '',
  lastName = '',
  companyName = '',
  title = '',
  checkInDate = '',
  checkOutDate = '',
  isCheckedIn = false,
  onCheckIn,
}) => {
  // this reference is to prevent a call on the mount event in the useEffect hook
  const didMountRef = useRef(false);

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
  /*
    The reason I am disabling this eslint rule is because is easier for debugging
    having a function name in the useEffect, also is faster than the arrow function 
    beacuse we are not making an assigment. Lastly maybe this useEffect hook
    will run multiple times. 
  */
  useEffect(
    // eslint-disable-next-line prefer-arrow-callback
    function changeStatus() {
      /*
        This function will check if the checkInDate prop is changed, every time
        is changed, it will render the timeout for the 5 seconds.
        I didn't want to handle this behavior by the component itself because
        if two people are connected, the reactivity is lost
      */
      if (didMountRef.current) {
        for (let i = 0; i <= 5; i++) {
          delay(i, timerValues.currentSecond);
        }
      } else didMountRef.current = true;
    },
    [checkInDate]
  );

  return (
    <li
      className={css`
        display: flex;
        padding: 1rem;
        flex-direction: column;
        border-radius: 5px;
        -webkit-box-shadow: 0px 12px 15px 0px rgba(0, 0, 0, 0.67);
        box-shadow: 0px 12px 15px 0px rgba(0, 0, 0, 0.67);
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
        <p>
          Full name: {firstName} {lastName} <span>Title: {title}</span>
        </p>
        <p>Company: {companyName}</p>
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
            <p>Check in date</p>
            <p>{formatDate(checkInDate) || 'N/A'}</p>
          </div>
          <div>
            <p>Check out date</p>
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
          <Button onClick={onCheckIn}>
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
