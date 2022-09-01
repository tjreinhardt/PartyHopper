import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getEventDetailThunk, deleteEventThunk } from "../../store/event"
import EditEventModal from "../modals/EditEventModal";



const EventDetail = () => {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const history = useHistory()
  const event = useSelector(state => state.event[eventId]);
  const session = useSelector(state => state.session.user);
  const [eventIsLoaded, setEventIsLoaded] = useState(false);
  const [editModal, setEditModal] = useState(false);


  useEffect(() => {
    dispatch(getEventDetailThunk(eventId)).then(() => setEventIsLoaded(true));
  }, [dispatch, eventId]);

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




  return (eventIsLoaded && event && <>
    <div>
      <div>
        <p>{event.name}</p>
        <p>{event.description}</p>
        <p>{event.totalRsvps}</p>
        <img src={event.imageUrl}></img>
        <div>OWNER USER ID: {event.userId}</div>
        <div>EVENT TYPE: {event.eventType}</div>
        <div>EVENT ENTERTAINMENT: {event.entertainment}</div>
        <div>START DATE: {event.startDate}</div>
        <div>START TIME: {event.startTime}</div>
        <div>LATTITUDE: {event.lat}</div>
        <div>LONGITUDE: {event.lng}</div>
        <div>CREATED AT: {event.createdAt}</div>
        <div>TOTAL RSVPS: {event.totalRsvps}</div>
        <div>
          {showButton && (<div className="event-detail-buttons">
            <button onClick={handleDelete}>Delete event</button>
            <button onClick={() => setEditModal(true)}>Edit event</button>
            {editModal && <EditEventModal event={event} setShowModal={setEditModal} />}
          </div>)}
        </div>
      </div>
    </div>
  </>
  )
}


export default EventDetail;
