import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import * as eventActions from '../store/event'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const HomePage = () => {
  const { eventId } = useParams()
  const dispatch = useDispatch()
  const events = Object.values(useSelector(state => state.event))
  console.log(events, 'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww')



  useEffect(() => {
    dispatch(eventActions.getAllEventsThunk())
  }, [dispatch])


  return (
    <>
      <div>
        {events &&
          events.map(event =>
            <div>
              <br></br>
              <NavLink to={`/events/${event.id}`}>
                <div>{event.name}</div>
              </NavLink>
              <div>{event.description}</div>
              <img src={event.imageUrl}></img>
              <div>OWNER USER ID: {event.userId}</div>
              <div>EVENT TYPE: {event.eventType}</div>
              <div>EVENT ENTERTAINMENT: {event.entertainment}</div>
              <div>START TIME: {event.startTime}</div>
              <div>END TIME: {event.endTime}</div>
              <div>LATTITUDE: {event.lat}</div>
              <div>LONGITUDE: {event.lng}</div>
              <div>CREATED AT: {event.createdAt}</div>
            </div>
          ).reverse()
        }
      </div>
    </>
  )
}

export default HomePage
