import React, { useState } from 'react';
import EventSelector from '../components/eventSelector/EventSelector';
import AttendeeList from '../components/atendeeList/AttendeeListContainer';

const Dashboard = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState(-1);
  const onSelectedEvent = eventIndex => setSelectedEvent(eventIndex);

  return (
    <>
      <EventSelector events={events} selectedEvent={onSelectedEvent} />
      <AttendeeList eventId={selectedEvent} />
    </>
  );
};

export default Dashboard;
