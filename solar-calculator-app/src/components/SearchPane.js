import React, { useEffect, useRef } from 'react';
import * as constants from '../constants';

const SearchPane = (props) => {
  const searchFieldRef = React.createRef();
  const searchField = useRef(null);

  const createAutocompleteField = () =>
    new window.google.maps.places.Autocomplete(searchFieldRef.current, {
      // Only suggest addresses, not other kinds of locations.
      types: ['address']
    });

  // Update the latitude and longitude values in the application state
  // based on the selected address.
  const handlePlaceChange = () => {
    const place = searchField.current.getPlace();
    const latitude = place.geometry.location.lat();
    const longitude = place.geometry.location.lng();
    props.onPlaceChange(latitude, longitude);
  }

  const calculateNominalPower = (areaInSquareFeet) => 
    Math.round(
      (areaInSquareFeet 
       * constants.WATTS_PER_SQUARE_FOOT) / constants.WATTS_PER_KILOWATT
    );

  // Render the search field when the component mounts.
  useEffect(() => {
    searchField.current = createAutocompleteField();
    // Only return geometry info, which contains latitude and longitude.
    searchField.current.setFields(['geometry']);
    // Handle selection of an autocomplete suggestion.
    searchField.current.addListener(
      'place_changed', handlePlaceChange);
  }, []);

  return (
      <div className="search-pane">
        <input
          className="field-search"
          type="text"
          ref={searchFieldRef}
        />
        <p>Click two points on the map to draw a line between them.</p>
        <p>Draw a shape to see the nominal power 
        of a solar installation in that area.</p>
        <p>Area is 
          <b> {props.area} square feet.</b>
        </p>
        <p>Peak power is 
          <b> {calculateNominalPower(props.area)} kilowatts.</b>
        </p>
        <button 
          className="button-clear"
          onClick={props.onResetMapClick}
        ><b>Reset Map</b></button>
      </div>
  )
}

export default SearchPane