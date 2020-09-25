import React from 'react';

import './BookingsControls.css';

export default ({activeOutputType, onChange}) => {
  return (
    <div className='bookings-control'>
      <button
        className={activeOutputType === 'list' ? 'active' : ''}
        onClick={onChange.bind(this, 'list')}
      >
        List
      </button>
      <button
        className={activeOutputType === 'chart' ? 'active' : ''}
        onClick={onChange.bind(this, 'chart')}
      >
        Chart
      </button>
    </div>
  );
};
