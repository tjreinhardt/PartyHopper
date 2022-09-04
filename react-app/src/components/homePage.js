import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import * as eventActions from '../store/event'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import '../styles/HomePage.css'

const HomePage = () => {
  const { startDate } = useParams()
  console.log(startDate)
  const dispatch = useDispatch()
  const events = Object.values(useSelector(state => state.event))



  useEffect(() => {
    dispatch(eventActions.getAllEventsThunk())
  }, [dispatch])


  return (
    <> <NavBar />
    <div className="page-content-wrapper">
      <div className="content-wrapper">
        {events &&
          events.map(event =>
            <NavLink to={`/events/${event.id}`} className="event-card">
                <img src={event.imageUrl} alt='event-imageUrl'></img>
              <br></br>
              <div className="event-content-wrapper">
              <NavLink className={'event-name-navlink'}to={`/events/${event.id}`}>
                <div className="event-name-div">{event.name}</div>
              </NavLink>
              {/* <div className="event-description-div">{event.description}</div> */}
              {/* <div className="event-type-div">{event.eventType}</div> */}
              {/* <div className="event-entertainment-div">{event.entertainment}</div> */}
              {/* <div className="event-startdate-div">Event Date: {event.startDate}</div> */}
              {/* <div className="event-starttime-div">Starts at: {event.startTime}</div> */}
              {/* <div>Coordinates: Lat: {event.lat}, Long: {event.lng}</div> */}
              <div className="event-totalrsvps-div">RSVPs: {event.totalRsvps}</div>
              {/* <div>CREATED AT: {event.createdAt}</div> */}
              </div>
            </NavLink>
          ).reverse()
        }
      </div>
    </div>
    </>
  )
}

export default HomePage
