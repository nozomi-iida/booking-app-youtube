import React from 'react';
import EventItem from './EventItem/EventItem';
import './EventList.css';

export default ({ events, authUserId, onViewDetail }) => {
  const eventsItem = events.map(event => {
    return <EventItem key={event._id} event={event} userId={authUserId} onDetail={onViewDetail} />;
  });
  return <ul className='event__list'>{eventsItem}</ul>;
};
