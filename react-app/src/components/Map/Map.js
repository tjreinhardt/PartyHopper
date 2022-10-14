import * as React from 'react';
import { useState, useCallback } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Pin from './Pin'
import { GeolocateControl, NavigationControl } from 'react-map-gl';
import './Map.css'
import { useSelector } from 'react-redux';
import { getAllEventsThunk } from '../../store/event';
import { useHistory } from 'react-router-dom';
import Geocoder from './Geocoder';
import NavBar from '../NavBar';
import { rsvpEventThunk } from "../../store/event";
import CreateEventModal from '../modals/CreateEventModal';
import { NavLink } from 'react-router-dom';
import CreateEventForm from '../events/CreateEvent';
import { logout } from '../../store/session';


const MAPBOX_TOKEN = 'pk.eyJ1IjoidGpyZWluaGFyZHQiLCJhIjoiY2w4MHJyMzI1MDh6bDN2cnU1dzQwZGZobCJ9.f93BsV65IIUxtBJkbiiqXg'; // Set your mapbox token here


export default function MapGL() {
  const dispatch = useDispatch();
  const history = useHistory()
  const [createModal, setCreateModal] = useState(false);
  const [viewState, setViewState] = React.useState({
    longitude: -100,
    latitude: 40,
    zoom: 3.5
  });
  const { eventId } = useParams();
  const user = useSelector(state => state.session.user)
  const mapRef = React.useRef()
  const [popupInfo, setPopupInfo] = useState(null);
  const [newLocation, setNewLocation] = useState(null);
  const session = useSelector(state => state.session.user);
  const [eventIsLoaded, setEventIsLoaded] = useState(false);
  const [latt, setLatt] = useState(null)
  const [long, setLong] = useState(null)
  const [newIdea, setNewIdea] = useState(null)
  const event = useSelector(state => state.event[eventId]);

  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/')
  };

  const handleViewportChange = useCallback(
    (newViewState) => setViewState(newViewState),
    []
  );
  const handleGeocoderViewportChange = useCallback(
    (newViewState) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };
      return handleViewportChange({
        ...newViewState,
        ...geocoderDefaultOverrides
      });
    },
    []
  );

  const handleAddClick = (e) => {
    const [longitude, latitude] = e.lngLat.toArray();
    setNewIdea({
      lat: latitude,
      long: longitude,
    });
    setLatt(latitude)
    setLong(longitude)
  };


  const handleRsvps = async (eventId) => {
    setPopupInfo(null)
    dispatch(rsvpEventThunk(eventId))
    window.alert("RSVP updated")
  }

  let showButton = false
  if (eventIsLoaded && event && (session.id === event.userId)) {
    showButton = true
  }




  useEffect(() => {
    dispatch(getAllEventsThunk())
  }, [dispatch, event, rsvpEventThunk, popupInfo])



  return (
    <>
      <nav className='navbar-nav'>
        <div className='nav-outer-wrapper'>
          <NavLink className="nav-partyhopper-logo" to={'/'}>PartyHopper
          </NavLink>
          {user && (
            <>
              <NavLink className={'navlinks'} to='/' exact={true} activeClassName='active'>
                <button className='navbar-buttons'>Home</button>
              </NavLink>
              <div className={'navlinks'}>
                <button id={"logout-butt"} className={'navbar-buttons'} onClick={onLogout}>Logout</button>
              </div>
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
      <div >
        <div style={{ overflowY: 'scroll' }}>
          <Map
            reuseMaps
            ref={mapRef}
            {...viewState}
            className={'map-wrapper'}
            onMove={evt => setViewState(evt.viewState)}
            onViewportChange={handleViewportChange}
            onDblClick={handleAddClick}
            projection="globe"
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
            mapboxAccessToken={MAPBOX_TOKEN}
          >
            {newIdea && (
              <Marker
                longitude={newIdea.long}
                latitude={newIdea.lat}
                anchor="bottom"
                closeButton={true}
                closeOnClick={false}
                onClose={() => setNewIdea(null)}>
                <Pin />
              </Marker>
            )}
            <Geocoder
              mapRef={mapRef}
              onViewportChange={handleGeocoderViewportChange}
              mapboxAccessToken={MAPBOX_TOKEN}
              reverseGeocode
            />
            <GeolocateControl
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
              showUserHeading={true}
              showUserLocation={true}
              onGeolocate={(position) => {
                setNewLocation([position.coords.latitude, position.coords.longitude]);
              }}
            />
            <NavigationControl />
            {popupInfo && (
              <Popup
                anchor="top"
                longitude={Number(popupInfo.lng)}
                latitude={Number(popupInfo.lat)}
                onClose={() => setPopupInfo(null)}
                style={{ padding: '0px', margin: '0px' }}

              >
                <div className="popup-info-container" style={{ position: 'relative', width: '13rem', height: '13rem', backgroundImage: `url(${popupInfo.imageUrl})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
                  <div style={{ position: 'absolute', bottom: '0', color: 'white', backgroundColor: 'black', width: '100%', margin: '10px 10px 15px', marginBottom: '0px', fontSize: '20px' }}>
                    <NavLink to={`/events/${popupInfo.id}`} className='popup-name-navlink'>
                      {popupInfo.name}
                    </NavLink>
                    <br />
                    {popupInfo.totalRsvps} {(popupInfo.totalRsvps) !== 1 ? "others attending" : "other attending"}
                    <br />

                    <div style={{ marginLeft: 'auto', marginRight: '100%' }}>
                      <div style={{ marginLeft: '30px' }} className="event-rsvp-buttons" onClick={() => handleRsvps(popupInfo.id)}>
                        {popupInfo.rsvpStatus === 1 ?
                          <button style={{ height: '35px', width: '150px' }}>Cancel RSVP</button>
                          :
                          <button style={{ height: '35px', width: '150px' }}>RSVP</button>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </Popup>
            )}
          </Map>
        </div>
        <div className="create-event-form-wrap">
          <CreateEventForm lat={latt} lng={long} />
        </div>
      </div>
    </>
  );
}
