import React from 'react';
import { Modal } from '../../context/Modal';
import EditEventForm from '../events/EditEvent';

function EditEventModal({ event, setShowModal }) {

  return (
    <>
      {(
        <Modal onClose={() => setShowModal(false)}>
          <EditEventForm hideModal={() => setShowModal(false)} event={event} />
        </Modal>
      )
      }
    </>
  )
}

export default EditEventModal
