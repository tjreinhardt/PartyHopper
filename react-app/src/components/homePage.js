import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import * as eventActions from '../store/event'
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./NavBar";
import { useSpringCarousel } from 'react-spring-carousel';
import '../styles/HomePage.css'
import { getReviewsThunk } from "../store/review";
import setGlobals from "react-map-gl/dist/esm/utils/set-globals";
var _ = require('lodash')

const HomePage = ({ eventId, event, showModal }) => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.session.user);
  const events = Object.values(useSelector(state => state.event))

  const randomNum = Math.random(0, 5)
  console.log('randomNum', randomNum)


  const images = [
    {
      imageUrl: "https://wallpaperaccess.com/full/127026.jpg"
    },
    {
      imageUrl: "https://wallpaper.dog/large/5550560.jpg"
    },
    {
      imageUrl: "https://i.pinimg.com/originals/5d/45/3a/5d453a797fa54005ec2c87108f0caab4.jpg"
    },
    {
      imageUrl: "https://i.pinimg.com/originals/0e/6d/8b/0e6d8bbaaaa958cc3de3483fc3d7ec43.jpg"
    },
    {
      imageUrl: "https://images.squarespace-cdn.com/content/v1/5c5b5ef4ab1a623eb4af6637/945a84bb-0938-405b-8a77-2f91515160d7/SponsorImage4.png"
    },
    {
      imageUrl: "https://occ-0-3211-1361.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABSRfEOw1Q6MqQ3aLcgJYIjafLUQFK5G8q4I8XKXJsUxuiqIinFVa_7COYRJpNb6bICIsbYnQF8BwlOHGUbWH7gOmtiQ0ne0p30oz.jpg?r=955"
    },
    {
      imageUrl: "https://adventure.com/wp-content/uploads/2017/07/Hero-Burning-Man-sunset-at-art-car-Photo-credit-Nicola-Bailey-2-1920x1080.jpg"
    },
    {
      imageUrl: "https://wallpaperset.com/w/full/e/5/9/475472.jpg"
    },
  ]

  let string = 'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW'

  const stringShorten = (string) => {

    if (string.length > 77) {
      const newString = _.truncate(string, {
        'length': 77,
        'separator': /,? +/
      });
      return newString
    } else {
      return string
    }
  }


  const nameShorten = (string) => {

    if (string.length > 30) {
      const newString = _.truncate(string, {
        'length': 30,
        'separator': /,? +/
      });
      return newString
    } else {
      return string
    }
  }



  // console.log(newString, 'newString')


  const {
    carouselFragment,
    slideToNextItem
  } = useSpringCarousel({
    draggingSlideTreshold: 1,
    withLoop: true,
    items: images.map((i) => ({
      id: i.id,
      renderItem: (
        <div>
          <div className="image-cards" style={{ margin: '0px', height: "682px", maxWidth: "100vw", maxHeight: "682px" }} key={i.id} to={`/images/${i.id}`}>
            <div>
              {i.title}
            </div>
            <div>
              <img alt="" style={{ opacity: "100%", margin: '0px', position: 'sticky', top: '0', minHeight: '682px', minWidth: '100vw', width: '100vw', height: "100vh", bottom: '60px' }} className="image-card" src={i.imageUrl}>
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
    // You MUST add the slide methods to the dependency list useEffect!
  }, [slideToNextItem]);

  useEffect(() => {
    dispatch(eventActions.getAllEventsThunk())
    dispatch(getReviewsThunk(eventId))
  }, [dispatch, eventId])



  let content;
  if (!showModal) {
    content = (
      <div>
        <div className={'welcome-user-home'}></div>
      </div>
    )
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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h2>Your Next Event Awaits</h2>

      </div>
      <div className="page-content-wrapper">
        <div className="content-wrapper">
          {events &&
            events.map(event =>
              <div key={event.id} to={`/events/${event.id}`} className="event-card">
                <NavLink className={'event-name-navlink'} to={`/events/${event.id}`}>
                  <img alt='' className='event_image' onError={({ target }) => {
                    target.onError = null
                    target.src = "https://www.k1speed.com/wp-content/uploads/2021/07/christmas-holiday-party.jpeg"
                  }} src={event.imageUrl}></img>
                </NavLink>
                <br></br>
                <div className="name-description-reviews-homepage-wrapper">
                  <div className="event-content-wrapper">
                    <NavLink className={'event-name-navlink'} to={`/events/${event.id}`}>
                      <div style={{ color: 'black', wordBreak: 'break-word', textTransform: 'capitalize' }} className="event-name-div">{nameShorten(event.name)}</div>
                    </NavLink>
                    <div style={{ marginTop: '8px', marginLeft: '1px', fontSize: '12px', color: 'black', wordBreak: 'break-word', textTransform: 'capitalize' }} className="event-description-div">{stringShorten(event.description)}</div>
                  </div>
                  <div className='star-chart-wrapper'>
                    <div className='star-chart-inner-div' style={{ display: 'flex', marginBottom: '10px', position: 'inherit', bottom: '0' }}>
                      <NavLink to={`/events/${event.id}`} style={{ display: 'flex', flexDirection: 'row', textDecoration: 'none' }}>
                        <div className="homepage-rate-button">Details / Reviews</div>
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
