import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import * as eventActions from '../store/event'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { useSpringCarousel } from 'react-spring-carousel';
import '../styles/HomePage.css'

const HomePage = () => {
  const { startDate } = useParams()
  console.log(startDate)
  const dispatch = useDispatch()
  const events = Object.values(useSelector(state => state.event))


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

  const {
    carouselFragment,
    slideToPrevItem,
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

              <img style={{ opacity: "100%", margin: '0px', position: 'sticky', top: '0', minHeight: '682px', minWidth: '100vw', width: '100vw', height: "100vh", bottom: '60px' }} className="image-card" src={i.imageUrl}>
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
  }, [dispatch])


  return (
    <> <NavBar />
      <div className="carousel-outer-div">
        <div className="carousel-content-div">
          {/* <button style={{ zIndex: '2', position: 'relative', top: '600px', left: '44vw' }} onClick={slideToPrevItem}>Prev item</button> */}
          {carouselFragment}
          {/* <button style={{ zIndex: '2', position: 'absolute', top: '600px', left: '51vw' }} onClick={slideToNextItem}>Next item</button> */}
        </div>
      </div>
      <div className="page-content-wrapper">
        {/* <button onClick={slideToNextItem}>Next item</button>
        <button onClick={slideToPrevItem}>Prev item</button> */}
        <div className="content-wrapper">
          {events &&
            events.map(event =>
              <NavLink to={`/events/${event.id}`} className="event-card">
                <img src={event.imageUrl} alt='event-imageUrl'></img>
                <br></br>
                <div className="event-content-wrapper">
                  <NavLink className={'event-name-navlink'} to={`/events/${event.id}`}>
                    <div style={{ color: 'black' }} className="event-name-div">{event.name}</div>
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
