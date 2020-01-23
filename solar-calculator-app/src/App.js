import React, { useState, useEffect } from 'react';
import './App.css';
import GoogleMap from './components/GoogleMap';
import SearchPane from './components/SearchPane';
import { GOOGLE_MAPS_API_KEY } from './apiKey';
import * as constants from './constants';

const App = () => {
  const [scriptReady, setScriptReady] = useState(false);
  const [centerLatitude, setCenterLatitude] = useState(
    constants.INITIAL_LATITUDE
  );
  const [centerLongitude, setCenterLongitude] = useState(
    constants.INITIAL_LONGITUDE
  );
  const [solarCoordinates, setSolarCoordinates] = useState([]);
  const [solarLatLng, setSolarLatLng] = useState([]);
  const [area, setArea] = useState(0);

  // Recenter the map on a given latitude and longitude.
  const recenterMap = (latitude, longitude) => {
    setCenterLatitude(latitude);
    setCenterLongitude(longitude);
  }

  const handleMapClick = event => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSolarCoordinates(solarCoordinates => 
      [...solarCoordinates, {lat, lng}]
    );
    setSolarLatLng(solarLatLng => 
      [...solarLatLng, event.latLng]
    );
  }

  const handleResetMapClick = () => {
    setSolarCoordinates([]);
    setSolarLatLng([]);
  }

  // Load the Google Maps script when the component mounts.
  useEffect(() => {
    if (!document.getElementById('script-google-maps')) {
      const googleMapsScript = document.createElement('script');
      googleMapsScript.id = 'script-google-maps';
      googleMapsScript.src = "https://maps.googleapis.com/maps/api/js?" +
        "key=" + GOOGLE_MAPS_API_KEY +
        "&libraries=places,geometry";
      window.document.body.appendChild(googleMapsScript);

      googleMapsScript.addEventListener('load', () => {
        setScriptReady(true);
      });
    }
  }, []);

  // When the solar installation coordinates are updated, recalculate the area.
  useEffect(() => {
    if (scriptReady) {
      const squareMeters = window.google.maps.geometry.spherical.computeArea(
        solarLatLng
      );
      const squareFeet = constants.SQUARE_FEET_PER_SQUARE_METER * squareMeters;

      setArea(Math.round(squareFeet));
    }
  }, [solarLatLng])

  return (
    <div className="app">
      {scriptReady 
        ? <SearchPane 
            onPlaceChange={recenterMap}
            onResetMapClick={handleResetMapClick}
            area={area}
          />
        : ''}
      {scriptReady 
        ? <GoogleMap 
            centerLatitude={centerLatitude}
            centerLongitude={centerLongitude}
            onClick={handleMapClick}
            solarCoordinates={solarCoordinates}
          /> 
        : ''
      }
    </div>
  );
}

export default App;
