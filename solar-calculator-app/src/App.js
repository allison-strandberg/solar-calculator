import React, { useState, useEffect } from 'react';
import './App.css';
import GoogleMap from './components/GoogleMap';
import SearchPane from './components/SearchPane';
import { GOOGLE_MAPS_API_KEY } from './apiKey';

const App = () => {
  const [scriptReady, setScriptReady] = useState(false);
  const [centerLatitude, setCenterLatitude] = useState(42.360092);
  const [centerLongitude, setCenterLongitude] = useState(-71.088171);
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
      const squareFeet = 10.764 * squareMeters;

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
