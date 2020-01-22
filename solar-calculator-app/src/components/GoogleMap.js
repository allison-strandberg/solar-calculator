import React, { useEffect } from 'react';

const GoogleMap = (props) => {
  const googleMapRef = React.createRef();

  const createGoogleMap = () =>
    new window.google.maps.Map(googleMapRef.current, {
      disableDefaultUI: true,
      zoom: 17,
      center: {
        lat: props.centerLatitude,
        lng: props.centerLongitude,
      }
    });

  // Render the map when the component updates.
  useEffect(() => {
    googleMapRef.current = createGoogleMap();
  });

  return (
      <div
        className="google-map"
        ref={googleMapRef}
      />
  )
}

export default GoogleMap