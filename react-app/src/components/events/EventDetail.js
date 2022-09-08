import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getEventDetailThunk, deleteEventThunk } from "../../store/event"
import EditEventModal from "../modals/EditEventModal";
import NavBar from "../NavBar";
import '../../styles/EventDetail.css'
import GetReviews from "../reviews/ReviewList"
import CreateReviewForm from "../reviews/CreateReview";
import EditReviewForm from "../reviews/EditReview";
import { getReviewsThunk } from "../../store/review";
import { Rating } from "react-simple-star-rating";



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
  const [rating, setRating] = useState(0)


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


  // const handleLikes = async (eventId) => {
  //   return dispatch(likeEventThunk(eventId))
  // }


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

  console.log(reviewsList, 'ReviewsList')
  const averageReviews = (reviewsList) => {
    let sum = 0;
    if (!reviewsList.length) return 0;
    if (reviewsList.length === 2) return ((reviewsList[0].rating + reviewsList[1].rating) / 2)
    else {
      for (let i = 0; i < reviewsList.length; i++) {
        sum += reviewsList[i].rating
        // console.log(sum, 'reviewsList[i].rating')
        i++
      }
      return (sum / reviewsList.length).toFixed(2)
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
            <img className="event-detail-img" src={event.imageUrl} alt=""></img>
          </div>
        </div>
        <div className="overlay-content-on-image">
          <div className={"event-detail-name-div"}>{event.name}</div>
          <div className={"event-detail-rating-reviews-content-div"}>
            <Rating
              // className="overall-rating-stars"
              initialValue={0}
              ratingValue={averageReviews(reviewsList)}
              transition={true}
            // allowHover={false}
            // readonly={true}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: '0px' }}>
              <div className={"event-detail-total-reviews-div"}>{event.totalReviews} reviews</div>

              <div className={"event-detail-type-div"}>{event.eventType}, </div>
              <div className={"event-detail-entertainment-div"}>{event.entertainment}</div>
            </div>
          </div>

        </div>
        {/* <div>Create Review
        <CreateReviewForm eventId={eventId} />
      </div> */}
      </div>
    </div>
    <div className={"event-description-div"}>{event.description}</div>
    {/* <div className={"event-total-rsvps-div"}>{event.totalRsvps}</div> */}
    <div className={"event-user-id-div"}>OWNER USER ID: {event.userId}</div>
    <div className={"event-id-div"}>{event.id} EVENT ID</div>
    <div className={"event-start-date-div"}>START DATE: {event.startDate}</div>
    <div className={"event-start-time-div"}>START TIME: {event.startTime}</div>
    {/* <div className={"event--div"}>LATTITUDE: {event.lat}</div>
        <div className={"event--div"}>LONGITUDE: {event.lng}</div> */}
    <div className={"event--div"}>CREATED AT: {event.createdAt}</div>
    {/* <div>TOTAL RSVPS: {event.totalRsvps}</div> */}
    <div>
      <GetReviews eventId={eventId} />
    </div>

    <div>
      {showButton && (<div className="event-detail-buttons">
        <button onClick={handleDelete}>Delete event</button>
        <button onClick={() => setEditModal(true)}>Edit event</button>
        {editModal && <EditEventModal style={{ zIndex: '7' }} event={event} setShowModal={setEditModal} />}
      </div>)}
      <div>
        {/* {userReviewed === true && <CreateReviewForm eventId={eventId}/>} */}
        {session.id !== event.userId && sessionLinks}
      </div>

    </div>
  </>
  )
}


export default EventDetail;
