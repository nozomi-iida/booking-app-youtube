import React from 'react';
import './BookingList.css';

export default ({ bookings, onDelete }) => (
  <ul className='bookings__list'>
    {bookings.map(booking => (
      <li key={booking._id} className="bookings__item">
        <div className="bookings__item-data">
          {booking.event.title} - {new Date(booking.createdAt).toLocaleDateString()}
        </div>
        <div className="bookings__item-actions">
          <button className="btn" onClick={onDelete.bind(this, booking._id)}>Cancel</button>
        </div>
      </li>
    ))}
  </ul>
);