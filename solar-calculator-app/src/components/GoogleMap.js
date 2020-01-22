import React, { useEffect, useRef } from 'react';

// East Campus, MIT
const location = {
  lat: 42.360092,
  lng: -71.088171,
};

const GoogleMap = (props) => {
  const googleMapRef = React.createRef();
  const googleMap = useRef(null);

  const createGoogleMap = () =>
    new window.google.maps.Map(googleMapRef.current, {
      disableDefaultUI: true,
      zoom: 17,
      center: {
        lat: location.lat,
        lng: location.lng,
      }
    });

  // Render the map when the component updates.
  useEffect(() => {
    googleMap.current = createGoogleMap();
  });

  return (
      <div
        className="google-map"
        ref={googleMapRef}
      />
  )
}

export default GoogleMap