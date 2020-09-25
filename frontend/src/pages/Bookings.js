import React, { useContext, useEffect, useState } from 'react';
import BookingList from '../components/Bookings/BookingList/BookingList';
import BookingsCharts from '../components/Bookings/BookingsCharts/BookingsCharts';
import BookingsControls from '../components/Bookings/BookingsControls/BookingsControls';
import Spinner from '../components/Spinner/Spinner';
import authContext from '../contexts/auth-context';

export default () => {
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [outputType, setOutputType] = useState('list');
  const context = useContext(authContext);
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    setIsLoading(true);
    const requestBody = {
      query: `
        query {
          bookings {
            _id
            createdAt
            event {
              _id
              title
              date
              price
            }
          }
        }
      `,
    };
    fetch('http://localhost:8000/graphql/', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + context.token,
      },
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed');
        }
        return res.json();
      })
      .then(resData => {
        const bookings = resData.data.bookings;
        setBookings(bookings);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };
  const deleteBookingHandler = bookingId => {
    setIsLoading(true);
    const requestBody = {
      query: `
        mutation CancelBooking($id: ID!) {
          cancelBooking(bookingId: $id) {
            _id
            title
          }
        }
      `,
      variables: {
        id: bookingId,
      },
    };
    fetch('http://localhost:8000/graphql/', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + context.token,
      },
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed');
        }
        return res.json();
      })
      .then(resData => {
        const updatedBookings = bookings.filter(booking => {
          return booking._id !== bookingId;
        });
        setBookings(updatedBookings);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const onChangeOutputTypeHandler = type => {
    if (type === 'list') {
      setOutputType('list');
    } else {
      setOutputType('chart');
    }
  };

  let content = <Spinner />;
  if (!isLoading) {
    content = (
      <>
        <BookingsControls
          activeOutputType={outputType}
          onChange={onChangeOutputTypeHandler}
        />
        <div>
          {outputType === 'list' ? (
            <BookingList bookings={bookings} onDelete={deleteBookingHandler} />
          ) : (
            <BookingsCharts bookings={bookings} />
          )}
        </div>
      </>
    );
  }
  return <>{content}</>;
};
