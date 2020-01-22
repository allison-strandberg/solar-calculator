import React, {useEffect, useRef} from 'react';
import { GOOGLE_MAPS_API_KEY } from '../apiKey.js';

// East Campus, MIT
const location = {
  lat: 42.360092,
  lng: -71.088171,
};

const GoogleMap = (props) => {
  const googleMapRef = React.createRef();
  const googleMap = useRef(null);
  const searchFieldRef = React.createRef();
  const searchField = useRef(null);

  const createGoogleMap = () =>
    new window.google.maps.Map(googleMapRef.current, {
      disableDefaultUI: true,
      zoom: 17,
      center: {
        lat: location.lat,
        lng: location.lng,
      }
    });

  const createAutocompleteField = () =>
    new window.google.maps.places.Autocomplete(searchFieldRef.current, {
      types: ['address']
    });

  // Render the map when the component updates.
  useEffect(() => {
    const googleMapScript = document.createElement('script');
    googleMapScript.src = "https://maps.googleapis.com/maps/api/js?" +
      "key=" + GOOGLE_MAPS_API_KEY +
      "&libraries=places";
    window.document.body.appendChild(googleMapScript);

    // Ensure files from Google Maps have loaded before creating the map.
    googleMapScript.addEventListener('load', () => {
      googleMap.current = createGoogleMap();
      searchField.current = createAutocompleteField();
    })
  });

  return (
    <div className="google-map-wrapper">
      <div className="panel">
        <input
          className="field-search"
          type="text"
          ref={searchFieldRef}
        />
      </div>
      <div
        className="google-map"
        ref={googleMapRef}
      />
    </div>
  );
}

export default GoogleMap