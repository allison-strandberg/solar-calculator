import React, { useEffect, useRef } from 'react';

const GoogleMap = (props) => {
  const googleMapRef = React.createRef();
  const googleMap = useRef(null);
  const polyline = useRef(null);
  const polygon = useRef(null);

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
      strokeColor: '#F39C12',
      strokeOpacity: 1.0,
      strokeWeight: 3
    });
    polyline.setMap(googleMap.current);
    return polyline
  }

  const createPolygon = (googleMap) => {
    const polygon = new window.google.maps.Polygon({
      paths: [],
      strokeColor: '#F39C12',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#F39C12',
      fillOpacity: 0.35
    });
    polygon.setMap(googleMap.current);
    return polygon
  }

  const initMapObjects = () => {
    googleMap.current = createGoogleMap();
    polyline.current = createPolyline(googleMap);
    polygon.current = createPolygon(googleMap);
  }

  // Render the map when the component mounts.
  useEffect(() => {
    initMapObjects();
    googleMap.current.addListener('click', props.onClick);
  }, []);

  // Update the map center when the center latitude or longitude changes.
  useEffect(() => {
    googleMap.current.setCenter(
      new window.google.maps.LatLng(
        props.centerLatitude, props.centerLongitude
      )
    );
  }, [props.centerLatitude, props.centerLongitude]);

  // Update the path when the list of coordinates changes.
  useEffect(() => {
    polyline.current.setPath(props.solarCoordinates);
    polygon.current.setPath(props.solarCoordinates);
  }, [props.solarCoordinates]);

  return (
    <div
      className="google-map"
      ref={googleMapRef}
    />
  )
}

export default GoogleMap