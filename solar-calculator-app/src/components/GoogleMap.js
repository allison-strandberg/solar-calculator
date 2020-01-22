import React, { useEffect } from 'react';

const GoogleMap = (props) => {
  const googleMapRef = React.createRef();

  const createGoogleMap = () => {
    const googleMap = new window.google.maps.Map(googleMapRef.current, {
      disableDefaultUI: true,
      zoom: 17,
      center: {
        lat: props.centerLatitude,
        lng: props.centerLongitude,
      }
    });
    return googleMap
  }

  const createPolyline = (googleMap) => {
    const polyline = new window.google.maps.Polyline({
      path: props.solarCoordinates,
      strokeColor: '#000000',
      strokeOpacity: 1.0,
      strokeWeight: 3
    });
    polyline.setMap(googleMap);
    return polyline
  }

  // Render the map when the component updates.
  useEffect(() => {
    googleMapRef.current = createGoogleMap();
    createPolyline(googleMapRef.current);
    googleMapRef.current.addListener('click', props.onClick);
  });

  return (
      <div
        className="google-map"
        ref={googleMapRef}
      />
  )
}

export default GoogleMap