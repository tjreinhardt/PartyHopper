import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import * as eventActions from '../store/event'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import UsersList from "./UsersList";
// import '../styles/homePage.css'
// import likeIcon from '../Images/instagram-like-icon.png';
// import likedIcon from '../Images/PngItem_5229528.png'
// import commentIcon from '../Images/instagram-comment-icon.png';
// import { likeEventThunk } from "../store/event";

const HomePage = () => {
  const { eventId } = useParams()
  const dispatch = useDispatch()
  const events = Object.values(useSelector(state => state.event))
  console.log(events, 'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww')
  // test


  useEffect(() => {
    dispatch(eventActions.getAllEventsThunk())
  }, [dispatch])

  // const handleLikes = async (eventId) => {
  //   return dispatch(likeEventThunk(eventId))
  // }

  return (
    <>
      <div>
        {events &&
          events.map(event =>
            <div>
              <NavLink to={`/events/${event.id}`}>
                <div>{event.name}</div>
              </NavLink>
              <div>{event.description}</div>
            </div>
          ).reverse()
        }
      </div>
    </>
  )
}

export default HomePage
