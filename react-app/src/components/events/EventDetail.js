import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getEventDetailThunk, deleteEventThunk } from "../../store/event"
import EditEventModal from "../modals/EditEventModal";
import NavBar from "../NavBar";
import '../../styles/EventDetail.css'
import GetReviews from "../reviews/ReviewList"
import CreateReviewForm from "../reviews/CreateReview";
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
    if (!reviewsList.length) return 0;
    if (reviewsList.length === 2) return ((reviewsList[0].rating + reviewsList[1].rating) / 2)
    else {
      for (let i = 0; i < reviewsList.length; i++) {
        sum += reviewsList[i].rating
        i++
      }
      return (sum / reviewsList.length).toFixed(2)
    }
  }

  const timeConversion = (startTime) => {
    let parts = startTime.split(":")
    // console.log(parts)
    if (parts[0] > 12) {
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
    // console.log(removeZeroes, 'removeZeroes')

    let monthsNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    console.log(removeZeroes, "removeZeroes")
    // console.log(months[10], "months[10]")
    console.log(monthsNumber[10] - 2, "monthsNumber[10] - 1")
    for (let i = 0; i < months.length; i++) {
      if (`${monthsNumber[i]}` == removeZeroes) {
        return `${months[i]} ${day}, ${year}`
      }
    }
    // let day = parts[2]
    // return
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
          <div style={{
            textTransform: 'capitalize'
          }} className={"event-detail-name-div"}>{event.name}</div>
          <div className={"event-detail-rating-reviews-content-div"}>
            <Rating
              // className="overall-rating-stars"
              initialValue={0}
              ratingValue={averageReviews(reviewsList)}
              transition={true}
              allowHover={false}
              readonly={true}
            />
            <div style={{
              display: 'flex',
              justifyContent: 'flex-start',
              paddingLeft: '0px'
            }}>
              <div className={
                "event-detail-total-reviews-div"
              }>{event.totalReviews} {(event.totalReviews) !== 1 ? "reviews" : "review"}</div>

              <div className={"event-detail-type-div"}>{event.eventType}, </div>
              <div className={"event-detail-entertainment-div"}>{event.entertainment}</div>
            </div>
          </div>

        </div>
        {/* <div>Create Review
        <CreateReviewForm eventId={eventId} />
      </div> */}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        {showButton && (<div className="event-detail-buttons">
          <button style={{
            fontWeight: '800',
            fontSize: '16px',
            height: '36px',
            marginTop: '10px',
            marginRight: '8px',
            width: '150px',
            marginLeft: '5%',
            marginTop: '10px',
          }} onClick={() => setEditModal(true)}>Edit Event</button>
          <button style={{
            fontWeight: '800',
            fontSize: '16px',
            height: '36px',
            width: '150px',
            marginTop: '10px'
          }} onClick={handleDelete}>Delete Event</button>
          {editModal && <EditEventModal style={{ zIndex: '7' }} event={event} setShowModal={setEditModal} />}
        </div>)}
      </div>
      <div style={{
        fontWeight: '550',
        marginLeft: '12px',
        marginTop: '6px'
      }} className={"event-start-date-div"}>Event Date: {dateConversion(event.startDate)}</div>
      <div style={{
        fontWeight: '550',
        marginLeft: '12px',
        marginTop: '6px'
      }} className={"event-start-time-div"}>Starts At: {timeConversion(event.startTime)}</div>
      <div style={{
        fontSize: '20px',
        textTransform: 'capitalize',
        maxWidth: '60%',
        marginLeft: '12px',
        marginTop: '8px',
        wordBreak: 'break-word',
        textOverflow: 'clip'
      }} className={"event-description-div"}>{event.description}</div>
      <div>
        {session.id !== event.userId && sessionLinks}
      </div>
      <div>
        <GetReviews eventId={eventId} />
      </div>


    </div>
  </>
  )
}


export default EventDetail;
