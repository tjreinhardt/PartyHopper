import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadImages } from "../../store/image";
import { Modal } from "../../context/Modal";
import { getAllEventsThunk } from "../../store/event";
import NavBar from "../NavBar";

const EventPhotos = () => {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const images = useSelector(state => state?.images);
  const evImagesArr = images ? Object.values(images) : null;
  const event = useSelector(state => state.event[eventId]);

  const evImages = evImagesArr?.filter(image => {
    return image.eventId === Number(eventId);
  })


  const evPhoto = (id) => {
    return evImagesArr.filter(image => image.eventId === id)[1];
  }

  useEffect(() => {
    dispatch(loadImages());
    dispatch(getAllEventsThunk())
  }, [dispatch])

  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState('');


  const handleClick = (e, idx) => {
    e.preventDefault();
    setShowModal(true)
    setSelected(idx)
  }

  return (
    <>
      <NavBar />
      <div className="eventphotos-content-container">
        <h1 className="eventphotos-h1">Photos for {event?.name} </h1>
        <div className="eventphotos-event-card">
          <div className="eventphotos-event-photo">
            <div>
              <NavLink to={`/events/${eventId}`}>
                <img className="eventphotos-event-img" src={evPhoto(Number(eventId))?.image_url} />
              </NavLink>
            </div>
            <div className="eventphotos-info-div">
              <NavLink className='eventphotos-info-name' to={`/events/${eventId}`}>{event?.name}</NavLink>
              <div className="eventphotos-rating-div">
              </div>
            </div>
          </div>
          <div>
            <NavLink to={`/event_user_photos/${eventId}/upload`}>
              <button className="eventphotos-add-btn">Add photos</button>
            </NavLink>
          </div>
        </div>
        <div className="eventphotos-images-container">
          {evImages && evImages.map((image, idx) => (
            <div>
              <div>
                <img className="eventphotos-images-img" src={image.image_url} onClick={(e) => handleClick(e, idx)} />
              </div>
              <div id='enlarged-photo-div'>
                {showModal && (
                  <Modal onClose={() => setShowModal(false)}>
                    <div id="enlarged-photo-modal">
                      <img className="enlarged-img" src={evImages[selected].image_url} style={{ width: 'auto', height: '550px' }} />
                    </div>
                  </Modal>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default EventPhotos;
