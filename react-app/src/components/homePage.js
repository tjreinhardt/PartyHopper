import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import * as eventActions from '../store/event'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const HomePage = () => {
  const { startDate } = useParams()
  console.log(startDate)
  const dispatch = useDispatch()
  const events = Object.values(useSelector(state => state.event))



  useEffect(() => {
    dispatch(eventActions.getAllEventsThunk())
  }, [dispatch])


  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        {events &&
          events.map(event =>
            <div
              style={{
                width: '90vw'
              }}>
              <br></br>
              <NavLink
                style={{
                  textDecoration: 'none',
                  cursor: 'pointer'
                }} to={`/events/${event.id}`}>
                <div
                  style={{
                    fontSize: '36px',
                    position: 'relative',
                    color: 'black',
                    textDecoration: 'none'
                  }}>{event.name}</div>
              </NavLink>
              <img src={event.imageUrl} alt='event-imageUrl'></img>
              <div
                style={{
                  fontSize: '24px',
                  position: 'relative'
                }}>{event.description}</div>
              {/* <div>ownerId: {event.userId}</div> */}
              <div>{event.eventType}</div>
              <div>{event.entertainment}</div>
              <div>Event Date: {event.startDate}</div>
              <div>Starts at: {event.startTime}</div>
              {/* <div>Coordinates: Lat: {event.lat}, Long: {event.lng}</div> */}
              <div>RSVPs: {event.totalRsvps}</div>
              {/* <div>CREATED AT: {event.createdAt}</div> */}
            </div>
          ).reverse()
        }
      </div>
    </>
  )
}

export default HomePage
