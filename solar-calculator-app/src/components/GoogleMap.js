import React, { useEffect, useRef } from 'react';

const GoogleMap = (props) => {
  const googleMapRef = React.createRef();
  const googleMap = useRef(null);
  const polyline = useRef(null);

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
    polyline.setMap(googleMap.current);
    return polyline
  }

  // Render the map when the component updates.
  useEffect(() => {
    googleMap.current = createGoogleMap();
    polyline.current = createPolyline(googleMap);
    googleMap.current.addListener('click', props.onClick);
  });

  return (
      <div
        className="google-map"
        ref={googleMapRef}
      />
  )
}

export default GoogleMap