import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

const EventDetails = ({
  totalPeople = 0,
  totalChekedIn = 0,
  companyArray = [],
}) => {
  const peopleLeft = totalPeople - totalChekedIn;
  return (
    <div
      className={css`
        text-align: left;
        @media (min-width: 420px) {
          width: 30rem;
        }
      `}
    >
      <p>People in the event right now: {totalChekedIn}</p>
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

// eslint-disable-next-line react/no-typos
EventDetails.PropTypes = {
  totalPeople: PropTypes.number.isRequired,
  totalChekedIn: PropTypes.number.isRequired,
  companyArray: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ),
};

export default EventDetails;
