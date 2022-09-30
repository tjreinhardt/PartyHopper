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

  const colors = {
    'yellow': "rgb(219, 142, 0)",
    'gray': "#a9a9a9"
  }

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

  const averageReviews = (reviewsList) => {
    let sum = 0;
    if (reviewsList.length === 0) return
    if (reviewsList.length === 1) return reviewsList[0].rating - 1
    if (reviewsList.length === 2) return (((reviewsList[0].rating - 1) + reviewsList[1].rating) / 2)
    if (reviewsList.length >= 3) {
      let newArray = []
      for (let i = 0; i < reviewsList.length; i++) {
        newArray.push(reviewsList[i].rating)
        let newValue = reviewsList[i].rating
        sum += newValue
      }
      return sum / reviewsList.length - 1
    }
    return ((sum / reviewsList.length)).toFixed(2)
  }

  const timeConversion = (startTime) => {
    let parts = startTime.split(":")
    console.log(parts[0], "parts[0]")
    if (parts[0] === '00') {
      return `${(Number(parts[0])) + 12}:${parts[1]} AM`
    }
    else if (parts[0] > 12) {
      return `${(parts[0]) - 12}:${parts[1]} PM`
    } else return `${startTime} AM`
  }

  const dateConversion = (startDate) => {
    let parts = startDate.split("-")
    let year = parts[0]
    let month = parts[1]
    let day = parts[2]
    let removeZeroes;
    if (parts[1].startsWith('0')) {
      removeZeroes = parts[1].split("0")
      removeZeroes.shift()
      removeZeroes = removeZeroes[0]
    } else removeZeroes = month

    let monthsNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    for (let i = 0; i < months.length; i++) {
      if (`${monthsNumber[i]}` === removeZeroes) {
        return `${months[i]} ${day}, ${year}`
      }
    }
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
