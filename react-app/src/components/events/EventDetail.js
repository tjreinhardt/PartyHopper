import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
// import EditEventModal from "../modals/EditEventModal";
import { getEventDetailThunk, deleteEventThunk, likeEventThunk } from "../../store/event"



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
  }, [dispatch]);
  let showButton = false
  // const [showButton, setShowButton] = useState(false);
  if (eventIsLoaded && event && (session.id === event.userId)) {
    showButton = true
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    return dispatch(deleteEventThunk(eventId)).then(() => history.push('/session/events'))
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
        {showButton && (<div className="event-detail-buttons">
          <button onClick={handleDelete} className="login-button" style={{ width: '100px' }}>Delete event</button>
        </div>)}
      </div>
    </div>
  </>
  )
}


export default EventDetail;
