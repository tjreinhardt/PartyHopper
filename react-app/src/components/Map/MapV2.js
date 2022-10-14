import * as React from 'react';
import { useState, useMemo } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Pin from './Pin'
import { GeolocateControl, NavigationControl } from 'react-map-gl';
import './Map2.css'
import { useSelector } from 'react-redux';
import { getAllEventsThunk } from '../../store/event';
import Geocoder from './Geocoder';
import NavBar from '../NavBar';
import { rsvpEventThunk } from "../../store/event";
import { NavLink } from 'react-router-dom';
import { loadImages } from '../../store/image';
import CreateEventModal from '../modals/CreateEventModal';
import { logout } from '../../store/session';

const MAPBOX_TOKEN = 'pk.eyJ1IjoidGpyZWluaGFyZHQiLCJhIjoiY2w4MHJyMzI1MDh6bDN2cnU1dzQwZGZobCJ9.f93BsV65IIUxtBJkbiiqXg'; // Set your mapbox token here


export default function MapGL2() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [createModal, setCreateModal] = useState(false);
  const [viewState, setViewState] = React.useState({
    longitude: -100,
    latitude: 40,
    zoom: 3.5
  });
  const { eventId } = useParams();
  const mapRef = React.useRef()
  const [popupInfo, setPopupInfo] = useState(null);
  const [projectionState, setProjectionState] = useState('globe')
  const [newLocation, setNewLocation] = useState(null);
  const eventsList = useSelector(state => state.event);
  const session = useSelector(state => state.session.user);
  const [eventIsLoaded, setEventIsLoaded] = useState(false);
  const events = Object.values(eventsList)
  const event = useSelector(state => state.event[eventId]);

  const imgs = useSelector(state => state?.images)
  const imagesArr = imgs ? Object.values(imgs) : null;
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/')
  };
  const evPhoto = (id) => {
    return imagesArr.filter(image => image.eventId === id)[0];
  }

  const pins = useMemo(
    () =>
      events.map((event, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={event.lng}
          latitude={event.lat}
          anchor="bottom"
          onClick={e => {
            e.originalEvent.stopPropagation();
            setPopupInfo({ ...event })
          }}>
          <Pin />
        </Marker>
      )),
    [events]
  )


  const createFeatureCollection = (eventsArray) => {
    return {
      "type": "FeatureCollection",
      "features": eventsArray.map((dbEvent) => {
        return {
          "type": "Feature",
          "properties": {
            "eventId": dbEvent.eventId,
            "url": dbEvent.imageUrl,
            "title": dbEvent.title,
            "body": dbEvent.description,
            "userId": dbEvent.userId
          },
          "geometry": {
            "type": "Point",
            "coordinates": [dbEvent.lng, dbEvent.lat]
          }
        }
      })
    }
  }


  let showButton = false
  if (eventIsLoaded && event && (session.id === event.userId)) {
    showButton = true
  }


  useEffect(() => {
    dispatch(getAllEventsThunk())
    setProjectionState('globe')
    dispatch(loadImages());
  }, [dispatch, event, popupInfo, projectionState])

  useEffect(() => {
    createFeatureCollection(events)
  }, [events, event])



  return (
    <div
      style={{
        overflowY: "hidden"
      }}
    >
      <nav className='navbar-nav' style={{ padding: '0px' }}>
        <div className='nav-outer-wrapper' style={{ margin: '0px', padding: '0px' }}>
          {/* <NavLink className="nav-partyhopper-logo" to={'/'}>PartyHopper
          </NavLink> */}
          {user && (
            <>
              <NavLink className={'navlinks'} to='/' exact={true} activeClassName='active'>
                <button className='navbar-buttons' style={{ width: '100vw', height: '60px', padding: '0px', margin: '0px', borderTopRightRadius: '0px', borderTopLeftRadius: '0px' }}>Home</button>
              </NavLink>
              {/* <NavLink id={'create-nav-button-id'} className={'navlinks'} to="/map"><button className="navbar-buttons">Create</button></NavLink> */}
              {/* <div className={'navlinks'}>
                <button id={"logout-butt"} className={'navbar-buttons'} onClick={onLogout} style={{ width: '50vw', height: '100px', padding: '0px', margin: '0px' }}>Logout</button>
              </div> */}
              {createModal && <CreateEventModal setShowModal={setCreateModal} />}
            </>

          )}
          {!user && (
            <>
              <NavLink to='/login' exact={true} activeClassName='active'>
                <button className='navbar-buttons'>Log In</button>
              </NavLink>
              <NavLink to='/sign-up' exact={true} activeClassName='active'>
                <button className='nav-signup-button-red'>Sign Up</button>
              </NavLink>

            </>
          )}
        </div>
      </nav >
      <div>
        <div>
          <Map
            reuseMaps
            ref={mapRef}
            {...viewState}
            className={'map-wrapper'}
            onMove={evt => setViewState(evt.viewState)}
            style={{
              zIndex: '0',
              position: "absolute",
              top: '-00px',
              height: '100%',
              right: '-0px',
              marginLeft: '20px',
              border: '3px solid black',
              borderBottomLeftRadius: '4px',
              marginTop: "100px",
              backgroundImage: `url(https://wallpaperaccess.com/full/2401680.jpg)`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}

            mapStyle="mapbox://styles/tjreinhardt/cl98pst0m000f14rwx68mhs81"
            projection="globe"
            mapboxAccessToken={MAPBOX_TOKEN}
          >
            <Geocoder />
            <GeolocateControl
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
              showAccuracyCircle={false}
              showUserHeading={true}
              onGeolocate={(position) => {
                setNewLocation([position.coords.latitude, position.coords.longitude]);
              }}
            />
            <NavigationControl />
            {pins}
            {popupInfo && (
              <Popup
                anchor="top"
                longitude={Number(popupInfo.lng)}
                latitude={Number(popupInfo.lat)}
                onClose={() => setPopupInfo(null)}
                style={{
                  padding: '0px',
                  margin: '0px'
                }}
              >
                <div className="popup-info-container"
                  style={{
                    position: 'relative',
                    backgroundImage: `url(${evPhoto(popupInfo?.id)?.image_url})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    boxShadow: '1px 1px 12px 1px darkergray'
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      paddingTop: '4px',
                      color: 'white',
                      backgroundColor: 'black',
                      width: '101%',
                      margin: '10px 10px 15px',
                      marginBottom: '0px',
                      fontSize: '20px'
                    }}
                  >
                    <NavLink to={`/events/${popupInfo.id}`} className='popup-name-navlink'>
                      {popupInfo.name}
                    </NavLink>
                    <br />
                    {popupInfo.totalRsvps} {(popupInfo.totalRsvps) !== 1 ? "others attending" : "other attending"}
                    <br />

                    <div
                      style={{
                        marginLeft: 'auto',
                        marginRight: '100%'
                      }}
                    >
                      <div
                        style={{
                          marginLeft: '0px'
                        }}
                        className="event-rsvp-buttons"

                      >
                        {/* {popupInfo.rsvpStatus === 1 ?
                          null
                          :
                          <button onClick={() => handleRsvps(popupInfo.id)}
                            style={{
                              height: '35px',
                              width: '18.2rem',
                              border: '2px solid black'
                            }}>RSVP
                          </button>
                        } */}
                        <NavLink to={`/events/${popupInfo.id}`}>
                          <button style={{
                            height: '35px',
                            width: '13.1rem',
                            border: '2px solid black'
                          }}>Details</button>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </Popup>
            )}
          </Map>
        </div>
      </div>
    </div>
  );
}
