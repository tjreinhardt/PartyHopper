import * as React from 'react';
import { useState, useMemo } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Pin from './Pin'
import { GeolocateControl } from 'react-map-gl';
import './Map2.css'
import { useSelector } from 'react-redux';
import { getAllEventsThunk } from '../../store/event';
import Geocoder from './Geocoder';
import NavBar from '../NavBar';
import { rsvpEventThunk } from "../../store/event";
import { NavLink } from 'react-router-dom';
import { loadImages } from '../../store/image';

const MAPBOX_TOKEN = 'pk.eyJ1IjoidGpyZWluaGFyZHQiLCJhIjoiY2w4MHJyMzI1MDh6bDN2cnU1dzQwZGZobCJ9.f93BsV65IIUxtBJkbiiqXg'; // Set your mapbox token here


export default function MapGL2() {
  const history = useHistory();
  const dispatch = useDispatch();
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
  const events = Object.values(eventsList)
  const event = useSelector(state => state.event[eventId]);

  const imgs = useSelector(state => state?.images)
  const imagesArr = imgs ? Object.values(imgs) : null;

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

          // draggable={true}

          onClick={e => {
            e.originalEvent.stopPropagation();
            setPopupInfo({ ...event })
          }}
        >
          <Pin />
        </Marker>
      )),
    [events, event, popupInfo]
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


  const handleRsvps = async (eventId) => {
    setPopupInfo(null)
    dispatch(rsvpEventThunk(eventId))
    window.alert("RSVP updated, taking you to event details!")
    history.push(`/events/${eventId}`)
  }


  let showButton = false
  if (eventIsLoaded && event && (session.id === event.userId)) {
    showButton = true
  }


  useEffect(() => {
    dispatch(getAllEventsThunk())
    dispatch(loadImages());
  }, [dispatch, event, rsvpEventThunk, popupInfo])

  useEffect(() => {
    createFeatureCollection(events)
  }, [events, event])



  return (
    <div
      style={{
        overflowY: "hidden"
      }}
    >
      <NavBar />
      <div>
        <div>
          <Map
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

            mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
            projection="globe"
            mapboxAccessToken={MAPBOX_TOKEN}
          >
            <Geocoder />
            <GeolocateControl
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
              onGeolocate={(position) => {
                setNewLocation([position.coords.latitude, position.coords.longitude]);
              }}
            />
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
                    backgroundSize: 'cover'
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '0',
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
                        {popupInfo.rsvpStatus === 1 ?
                          null
                          :
                          <button onClick={() => handleRsvps(popupInfo.id)}
                            style={{
                              height: '35px',
                              width: '325px',
                              border: '2px solid black'
                            }}>RSVP
                          </button>
                        }
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
