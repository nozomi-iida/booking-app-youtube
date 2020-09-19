import React from 'react';
import './Modal.css';

export default ({ title, children, canCancel, canConfirm, onCancel, onConfirm }) => {
  return (
    <div className='modal'>
      <header className='modal__header'>
        <h1>{title}</h1>
      </header>
      <section className='modal__content'>{children}</section>
      <section className='modal__actions'>
        {canCancel && (
          <button className='btn' onClick={onCancel}>
            Cancles
          </button>
        )}
        {canConfirm && (
          <button className='btn' onClick={onConfirm}>
            Confirm
          </button>
        )}
      </section>
    </div>
  );
};
