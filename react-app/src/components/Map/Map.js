// import collect from '@turf/collect';
// import * as turf from '@turf/turf'

// collect(turf.points, turf.polys, 'population', 'populationValues');
import * as React from 'react';
import { useState, useMemo } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import Pin from './Pin'
import { GeolocateControl } from 'react-map-gl';
import './Map.css'
import { useSelector } from 'react-redux';
import { getAllEventsThunk } from '../../store/event';
import Geocoder from './Geocoder';
import NavBar from '../NavBar';
import { rsvpEventThunk } from "../../store/event";
// import EventDetail from '../events/EventDetail';
import { NavLink } from 'react-router-dom';
import { getEventDetailThunk } from '../../store/event';
import CreateEventForm from '../events/CreateEvent';
import EditEventForm from '../events/EditEvent';
import EventDetail from '../events/EventDetail';
import { setRTLTextPlugin } from 'mapbox-gl';

const MAPBOX_TOKEN = 'pk.eyJ1IjoidGpyZWluaGFyZHQiLCJhIjoiY2w4MHJyMzI1MDh6bDN2cnU1dzQwZGZobCJ9.f93BsV65IIUxtBJkbiiqXg'; // Set your mapbox token here


export default function MapGL() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [viewState, setViewState] = React.useState({
    longitude: -100,
    latitude: 40,
    zoom: 3.5
  });
  const { eventId } = useParams();
  const { rsvpStatus } = useParams();
  const mapRef = React.useRef()
  const [popupInfo, setPopupInfo] = useState(null);
  const [newLocation, setNewLocation] = useState(null);
  const eventsList = useSelector(state => state.event);
  const session = useSelector(state => state.session.user);
  const [eventIsLoaded, setEventIsLoaded] = useState(false);
  const [latt, setLatt] = useState(null)
  const [long, setLong] = useState(null)
  const events = Object.values(eventsList)
  const [newIdea, setNewIdea] = useState(null)
  const event = useSelector(state => state.event[eventId]);


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




  React.useEffect(() => {
    dispatch(getAllEventsThunk())
  }, [dispatch, event, rsvpEventThunk, popupInfo])



  return (
    <>
      <NavBar />
      <div>
        <div>
          <Map
            ref={mapRef}
            // onLoad={onMapLoad}
            {...viewState}
            className={'map-wrapper'}
            onMove={evt => setViewState(evt.viewState)}
            onDblClick={handleAddClick}
            style={{ position: "absolute", right: '-0px', borderRight: '0px', borderBottomRightRadius: '0px', borderTopLeftRadius: '4px', borderTopRightRadius: '0px', height: '84.3%', width: '75vw', marginRight: 'auto', border: '3px solid black', borderBottomLeftRadius: '4px', marginTop: "80px", backgroundImage: `url(https://wallpaperaccess.com/full/2401680.jpg)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}

            mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
            projection="globe"
            mapboxAccessToken={MAPBOX_TOKEN}
          >
            {newIdea && (
              <Marker
                longitude={newIdea.long}
                latitude={newIdea.lat}
                anchor="left"
                closeButton={true}
                closeOnClick={false}
                onClose={() => setNewIdea(null)}>
                <Pin />
              </Marker>
            )}
            <GeolocateControl
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
              showUserHeading={true}
              showUserLocation={true}
              onGeolocate={(position) => {
                // get latitude and longitude of user current location
                setNewLocation([position.coords.latitude, position.coords.longitude]);
              }}
            />
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
                    {/* {popupInfo.description} */}
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

                      {/* <div>{!!event.totalRsvps && (event.totalRsvps === 1 ? <p>1 rsvp</p> : <p>{event.totalRsvps} rsvps</p>)}</div> */}
                    </div>



                    {/* </div> */}
                    {/* Longitude: {popupInfo.lng} */}

                    {/* <br /> */}
                    {/* Latitude: {popupInfo.lat} */}
                  </div>
                  {/* <br /> */}
                  {/* <br /> */}
                  {/* <br /> */}
                  {/* <br /> */}
                  {/* <img className="map-event-popup" width="100%" height="100%" src={popupInfo.eventUrl} alt="" /> */}
                  {/* <EventDetail /> */}
                </div>
              </Popup>
            )}
            <Geocoder style={{ width: '900px' }} />
          </Map>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '20vw', position: 'absolute', left: '29px' }}>
          <CreateEventForm lat={latt} lng={long} />
        </div>
        {/* <div style={{ display: 'flex', justifyContent: 'center', width: '24vw', position: 'absolute', right: '0px' }}>
          <EventDetail />
        </div> */}
      </div>
    </>
  );
}
