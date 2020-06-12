import React from 'react';
import EventDetails from './EventDetails';
import PropTypes from 'prop-types';
import { css } from 'emotion';

/*
Select is just a styled component, has no state and is not shareable to other
components
*/
const Select = ({ events = [], selectEvent }) => {
  const changeValue = e => {
    selectEvent(e.target.value);
  };
  /*
  e => {
          console.log(e);
          selectEvent(e.target.value);
        } */
  return (
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
        onChange={changeValue}
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
        {events.map(({ name, _id }, i) => (
          <option key={_id} value={i}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

Select.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    })
  ),
};

const EventSelector = ({ events = [], selectedEvent }) => {
  const [currentEventIndex, setEventIndex] = React.useState(-1);

  const onSelectEvent = eventIndex => {
    setEventIndex(eventIndex);
    selectedEvent(events[eventIndex]._id || '');
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
      <Select events={events} selectEvent={onSelectEvent} />
      <EventDetails {...(events[currentEventIndex] || {})} />
    </div>
  );
};

EventSelector.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
      totalPeople: PropTypes.number.isRequired,
      totalChekedIn: PropTypes.number,
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
