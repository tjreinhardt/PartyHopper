import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getEventDetailThunk, deleteEventThunk } from "../../store/event"
import EditEventModal from "../modals/EditEventModal";
import NavBar from "../NavBar";
import '../../styles/EventDetail.css'
import GetReviews from "../reviews/ReviewList"
import CreateReviewForm from "../reviews/CreateReview";
import { FaStar } from 'react-icons/fa'
import { rsvpEventThunk } from "../../store/event";
import { averageReviews, timeConversion, dateConversion, colors } from "../HelperFunctions/EventDetailHelp";



const EventDetail = () => {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const reviews = useSelector(state => state.review)
  const history = useHistory()
  const event = useSelector(state => state.event[eventId]);
  const session = useSelector(state => state.session.user);
  const [eventIsLoaded, setEventIsLoaded] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const reviewsList = Object.values(reviews)

  const rate = Array(5).fill(0)

  useEffect(() => {
    dispatch(getEventDetailThunk(eventId)).then(() => setEventIsLoaded(true));
  }, [dispatch, eventId, reviewsList.length]);


  let showButton = false
  if (eventIsLoaded && event && (session.id === event.userId)) {
    showButton = true
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    return dispatch(deleteEventThunk(eventId)).then(() => history.push('/'))
  }

  const handleRsvps = async (eventId) => {
    return dispatch(rsvpEventThunk(eventId))
  }



  if (!event) {
    return null
  }

  let userReviewed;
  for (let i = 0; i < reviewsList.length; i++) {
    if (reviewsList[i].userId === session.id)
      userReviewed = false;
  }

  let sessionLinks;
  if (userReviewed === false) {
    sessionLinks = null
  } else {
    sessionLinks = (
      <CreateReviewForm eventId={eventId} />
    )
  }



  return (eventIsLoaded && event && <>
    <NavBar />
    <div>
      <div className="header-content-wrapper">
        <div className="image-header-block">
          <div className="image-header-content-block">
          </div>
          <div className="event-detail-image-wrapper">
            <img alt='' className={'event-detail-image'}
              onError={({ target }) => {
                target.onError = null
                target.src = "https://www.k1speed.com/wp-content/uploads/2021/07/christmas-holiday-party.jpeg"
              }}
              src={event?.imageUrl}></img>
          </div>
        </div>
        <div className="overlay-content-on-image">
          <div className={"event-detail-name-div"}
          >{event.name}</div>
          <div
            className={"event-detail-rating-reviews-content-div"}>
            <div className='star-chart-wrapper'>
              <div className='star-chart-inner-div'>
                {rate.map((_, i) => {
                  return (
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <FaStar
                        key={i}
                        size={30}
                        isFilled={averageReviews(reviewsList)}
                        style={{
                          marginRight: 10
                        }}
                        color={i <= (averageReviews(reviewsList)) ? colors.yellow : colors.gray}
                      ></FaStar>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className={'overlay-details'}>
              <div className={
                "event-detail-total-reviews-div"
              }>
                {event.totalReviews} {(event.totalReviews) !== 1 ? "reviews" : "review"}
              </div>

              <div className={"event-detail-type-div"}>
                {event.totalRsvps} {(event.totalRsvps) !== 1 ? "RSVPS" : "RSVP"}
              </div>
              <div className={"event-detail-type-div"}>
                {event.eventType},
              </div>
              <div className={"event-detail-entertainment-div"}>
                {event.entertainment}
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="detail-button-wrapper">
        {showButton && (
          <div className="event-detail-buttons">
            <button
              className="detail-edit-button-style"
              onClick={() => setEditModal(true)}>
              Edit Event
            </button>
            <button
              className="detail-delete-button-style"
              onClick={handleDelete}>
              Delete Event
            </button>
            {editModal && <EditEventModal style={{ zIndex: '7' }} event={event} setShowModal={setEditModal} />}
          </div>
        )}
      </div>
      <div className="detail-body-outer-wrapper">
        <div className="detail-body-middle-wrapper">
          <div className="detail-body-innermost-wrapper">
            <div className={"event-start-date-div"}
            >
              <span className="event-date-label">
                Event Date:
              </span>
              {dateConversion(event.startDate)}
            </div>
            <div className={"event-start-time-div"}
            >
              <span className="event-time-label">
                Starts At:
              </span>
              {timeConversion(event.startTime)}
            </div>
            <div className={"event-description-div"}
            ><span className="details-label">
                Details:
              </span>
              <br />
              {event.description}
            </div>
            {!showButton && (
              <div className="rsvp-button-wrapper">
                <div className="event-rsvp-buttons"
                  onClick={() => handleRsvps(event.id)}>
                  {event.rsvpStatus === 1 ?
                    <button className="detail-rsvp-button">Cancel RSVP</button>
                    :
                    <button className="detail-rsvp-button">RSVP</button>}
                </div>
              </div>
            )}
            <div className="session-links-div">
              {session.id !== event.userId && sessionLinks}
            </div>
            <div className="detail-review-div">
              <GetReviews eventId={eventId} />
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-whitespace-div">
      </div>
    </div>
  </>
  )
}


export default EventDetail;
