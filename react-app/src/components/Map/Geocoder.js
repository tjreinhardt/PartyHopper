import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useControl } from 'react-map-gl';
import { useValue } from '../../context/ContextProvider';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoidGpyZWluaGFyZHQiLCJhIjoiY2w4MHJyMzI1MDh6bDN2cnU1dzQwZGZobCJ9.f93BsV65IIUxtBJkbiiqXg'; // Set your mapbox token here

const Geocoder = () => {
  const { dispatch } = useValue();
  const ctrl = new MapBoxGeocoder({
    accessToken: MAPBOX_TOKEN,
    marker: false,
    collapsed: false,
  });
  useControl(() => ctrl);
  ctrl.on('result', (e) => {
    const coords = e.result.geometry.coordinates;
    dispatch({
      type: 'UPDATE_LOCATION',
      payload: { lng: coords[0], lat: coords[1] },
    });
  });
  return null;
};

export default Geocoder;
