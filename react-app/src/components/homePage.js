import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import * as eventActions from '../store/event'
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./NavBar";
import { useSpringCarousel } from 'react-spring-carousel';
import '../styles/HomePage.css'
import { getReviewsThunk } from "../store/review";
import { images, stringShorten, nameShorten } from "./HelperFunctions/HomePageHelp";
import { loadImages } from "../store/image";

const HomePage = ({ eventId, showModal }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user);
  const events = Object.values(useSelector(state => state.event))
  const eventsArr = events ? Object.values(events) : null;
  console.log(eventsArr, 'eventsArr')
  const imgs = useSelector(state => state?.images)
  const imagesArr = imgs ? Object.values(imgs) : null;

  const evPhoto = (id) => {
    return imagesArr.filter(image => image.eventId === id)[0];
  }

  const {
    carouselFragment,
    slideToNextItem
  } = useSpringCarousel({
    draggingSlideTreshold: 1,
    withLoop: true,
    items: images.map((i) => ({
      id: i.id,
      renderItem: (
        <div className="image-card-wrapper">
          <div className="image-cards" key={i.id} to={`/images/${i.id}`}>
            <div>
              {i.title}
            </div>
            <div>
              <img alt="" className="image-card" src={i.imageUrl}>
              </img>
            </div>
          </div>
        </div>
      ),
    })),
  });


  useEffect(() => {
    const timer = setInterval(() => {
      slideToNextItem();
    }, 5000);
    return () => {
      window.clearInterval(timer);
    };
  }, [slideToNextItem]);

  useEffect(() => {
    dispatch(eventActions.getAllEventsThunk())
    dispatch(getReviewsThunk(eventId))
    dispatch(loadImages());
  }, [dispatch, eventId])



  let content;
  if (!showModal) {
    content = null
  } else {
    content = null
  }


  return (user &&
    <> <NavBar />
      <div className="carousel-outer-div">
        {content}
        <div className="carousel-content-div">
          {carouselFragment}
        </div>
      </div>
      <div className="event-message">
        <h2>Your Next Event Awaits</h2>
      </div>
      <div className="page-content-wrapper">
        <div className="content-wrapper">
          {eventsArr &&
            eventsArr.map(event =>
              <div key={event} to={`/events/${event.id}`} className="event-card">
                <NavLink className={'event-name-navlink'} to={`/events/${event.id}`}>
                  <img className='event_image' src={evPhoto(event?.id)?.image_url} alt='' />
                </NavLink>
                <br></br>
                <div className="name-description-reviews-homepage-wrapper">
                  <div className="event-content-wrapper">
                    <NavLink className={'event-name-navlink'} to={`/events/${event.id}`}>
                      <div className="home-event-name-div">
                        {nameShorten(event.name)}
                      </div>
                    </NavLink>
                    <div className="home-event-description-div">
                      {stringShorten(event.description)}
                    </div>
                  </div>
                  <div className='star-chart-wrapper'>
                    <div className='star-chart-inner-div'>
                      <NavLink to={`/events/${event.id}`} className="detail-review-navlink">
                        <div className="homepage-rate-button">
                          Details
                        </div>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            ).reverse()
          }
        </div>
      </div>
    </>
  )
}

export default HomePage
