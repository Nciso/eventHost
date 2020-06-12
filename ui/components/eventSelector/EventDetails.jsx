import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

const EventDetails = ({
  totalPeople = 0,
  totalCheckedIn = 0,
  companyArray = [],
}) => {
  const peopleLeft = totalPeople - totalCheckedIn;
  return (
    <div
      className={css`
        text-align: left;
        padding: 1rem;
        @media (min-width: 420px) {
          width: 30rem;
          padding: 0;
        }
      `}
    >
      <p>People in the event right now: {totalCheckedIn}</p>
      <p>
        People by company in the event right now:
        {companyArray
          .map(({ name, count }) => ` ${name} (${count})`)
          .join(', ')}
      </p>
      <p>People not checked-in: {peopleLeft}</p>
    </div>
  );
};

EventDetails.propTypes = {
  totalPeople: PropTypes.number,
  totalCheckedIn: PropTypes.number,
  companyArray: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ),
};

export default EventDetails;
