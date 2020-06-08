import React from 'react';
import EventDetails from './EventDetails';
import PropTypes from 'prop-types';
import { css } from 'emotion';

/*
Select is just a styled component, has no state and is not shareable to other
components
*/
const Select = ({ events = [], selectEvent }) => (
  <div
    className={css`
      display: flex;
      flex-direction: column;
      @media (min-width: 420px) {
        display: block;
      }
    `}
  >
    <label htmlFor="event_select">Select Event:</label>
    <select
      id="event_select"
      onChange={e => {
        selectEvent(e.target.value);
      }}
      className={css`
        width: 15rem;
        height: 3rem;
        margin-left: 0;
        border-radius: 5px;
        @media (min-width: 420px) {
          margin-left: 1rem;
        }
      `}
    >
      <option>Select an event</option>
      {events.map(({ name, _id }) => (
        <option key={_id} value={_id}>
          {name}
        </option>
      ))}
    </select>
  </div>
);

// eslint-disable-next-line react/no-typos
Select.PropTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    })
  ),
};

const EventSelector = ({ events = [] }) => {
  const eventNames = events.map(({ name = '', _id = '' }) => ({ name, _id }));
  const [currentEvent, setCurrentEvent] = React.useState({});

  const onSelectEvent = eventId => {
    const selected = events.find(event => event._id === eventId);
    setCurrentEvent(selected);
  };

  return (
    <div
      className={`${css`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100;
        justify-content: center;
        padding-top: 1.5rem;
        @media (min-width: 420px) {
          padding: 5rem;
        }
      `} main-background`}
    >
      <Select events={eventNames} selectEvent={onSelectEvent} />
      <EventDetails {...currentEvent} />
    </div>
  );
};

// eslint-disable-next-line react/no-typos
EventSelector.PropTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
      totalPeople: PropTypes.number.isRequired,
      totalChekedIn: PropTypes.number.isRequired,
      companyArray: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          count: PropTypes.number.isRequired,
        })
      ),
    })
  ),
};

export default EventSelector;
