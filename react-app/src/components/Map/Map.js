// import collect from '@turf/collect';
// import * as turf from '@turf/turf'

// collect(turf.points, turf.polys, 'population', 'populationValues');
import * as React from 'react';
import { useState, useMemo } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { useDispatch } from 'react-redux';
import Pin from './Pin'
import { GeolocateControl } from 'react-map-gl';
import './Map.css'
import { useSelector } from 'react-redux';
import { getAllEventsThunk } from '../../store/event';
import Geocoder from './Geocoder';
import NavBar from '../NavBar';
// import EventDetail from '../events/EventDetail';

const MAPBOX_TOKEN = 'pk.eyJ1IjoidGpyZWluaGFyZHQiLCJhIjoiY2w4MHJyMzI1MDh6bDN2cnU1dzQwZGZobCJ9.f93BsV65IIUxtBJkbiiqXg'; // Set your mapbox token here


export default function MapGL() {
  const dispatch = useDispatch();
  const mapRef = React.useRef()
  const [popupInfo, setPopupInfo] = useState(null);
  const [newLocation, setNewLocation] = useState(null);
  const eventsList = useSelector(state => state.event);
  const events = Object.values(eventsList)

  const onMapLoad = React.useCallback(() => {
    mapRef.current.on('style.load', () => {
      mapRef.current.setFog({
        "range": [0.8, 8],
        "color": "#dc9f9f",
        "horizon-blend": 0.5,
        "high-color": "#245bde",
        "space-color": "#000000",
        "star-intensity": 0.15
      })
    })
  }, [])



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
          }}
        >
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



  React.useEffect(() => {
    dispatch(getAllEventsThunk())
  }, [dispatch])

  React.useEffect(() => {
    createFeatureCollection(events)
  }, [events])


  return (
    <>
      <NavBar />
      <Map
        ref={mapRef}
        onLoad={onMapLoad}
        initialViewState={{
          latitude: 40,
          longitude: -100,
          zoom: 3
        }}
        style={{ position: "fixed", height: '89.1%', width: '100%', marginTop: "80px", backgroundImage: `url(https://wallpaperaccess.com/full/2401680.jpg)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}

        mapStyle="mapbox://styles/mapbox/dark-v10"
        projection="globe"

        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          onGeolocate={(position) => {
            // get latitude and longitude of user current location
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
            style={{ padding: '0px', margin: '0px' }}
          >
            <div className="popup-info-container" style={{ position: 'relative', width: '13rem', height: '13rem', backgroundImage: `url(${popupInfo.imageUrl})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
              <div style={{ position: 'absolute', bottom: '0', color: 'white', backgroundColor: 'black', width: '100%', margin: '10px 10px 15px', marginBottom: '0px' }}>
                {/* {popupInfo.event.title} */}
              </div>
              <br />
              {/* {popupInfo.eventDescription} */}
              <br />
              <br />
              {/* Longitude: {popupInfo.lng} */}
              <br />
              {/* Latitude: {popupInfo.lat} */}
              {/* <img className="map-event-popup" width="100%" height="100%" src={popupInfo.eventUrl} alt="" /> */}
              {/* <EventDetail /> */}
            </div>
          </Popup>
        )}
        <Geocoder />
      </Map>
    </>
  );
}
