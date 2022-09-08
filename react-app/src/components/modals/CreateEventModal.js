import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateEventForm from '../events/CreateEvent';

function CreateEventModal({ setShowModal }) {

  return (
    <>

      {
        (
          <Modal onClose={() => setShowModal(false)} style={{ borderRadius: '50%' }}>
            <CreateEventForm hideModal={() => setShowModal(false)} />
          </Modal>
        )
      }
    </>
  )
}

export default CreateEventModal;
