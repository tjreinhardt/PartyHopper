import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { loadImages } from "../../store/image";
import { getReviewsThunk } from "../../store/review";
import { FaStar } from 'react-icons/fa';
import { Modal } from "../../context/Modal";
import { getAllEventsThunk } from "../../store/event";
import NavBar from "../NavBar";

const EventPhotos = ({ events }) => {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const images = useSelector(state => state?.images);
  const reviews = useSelector(state => state?.reviews);
  const evImagesArr = images ? Object.values(images) : null;
  // let event = Object.values(events)?.filter(event => {
  //   return event.id === Number(eventId)
  // });
  const event = useSelector(state => state.event[eventId]);

  console.log(event, "eventsssss")
  // event = event[0];
  const evImages = evImagesArr?.filter(image => {
    return image.eventId === Number(eventId);
  })

  // const evReviews = Object.values(reviews)?.filter(review => {
  //   return review.eventId === Number(eventId)
  // });

  const evPhoto = (id) => {
    return evImagesArr.filter(image => image.eventId === id)[1];
  }

  // const evRatings = evReviews.map(review => review.rating);
  // const getAvrg = evRatings.reduce((a, b) => a + b, 0) / evRatings.length
  // const totalFilled = Math.floor(getAvrg);
  // const stars = Array(5).fill(0);

  useEffect(() => {
    dispatch(loadImages());
    dispatch(getAllEventsThunk())
    // dispatch(getReviewsThunk());
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
                {/* <div>
                  {stars.map((_, index) => (
                    <FaStar
                      key={index}
                      isFilled={index + 1 < totalFilled}
                      color={index < totalFilled ? "#f15c00" : "#a9a9a9"}
                      size={14}
                    ></FaStar>
                  ))}
                </div> */}
                {/* <div className="eventphotos-reviews-ct">
                  {evReviews?.length} reviews
                </div> */}
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
                      <img className="enlarged-img" src={evImages[selected].image_url} style={{ width: '550px', height: '550px' }} />
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
