import React, { useState, useEffect } from 'react';
import './App.css';
import GoogleMap from './components/GoogleMap';
import SearchPane from './components/SearchPane';
import { GOOGLE_MAPS_API_KEY } from './apiKey';

const App = () => {
  const [scriptReady, setScriptReady] = useState(false);

  // Load the Google Maps script when the component mounts.
  useEffect(() => {
    if (!document.getElementById('script-google-maps')) {
      const googleMapsScript = document.createElement('script');
      googleMapsScript.id = 'script-google-maps';
      googleMapsScript.src = "https://maps.googleapis.com/maps/api/js?" +
        "key=" + GOOGLE_MAPS_API_KEY +
        "&libraries=places";
      window.document.body.appendChild(googleMapsScript);

      googleMapsScript.addEventListener('load', () => {
        setScriptReady(true);
      });
    }
  }, []);

  return (
    <div className="app">
      {scriptReady ? <SearchPane /> : ''}
      {scriptReady ? <GoogleMap /> : ''}
    </div>
  );
}

export default App;
