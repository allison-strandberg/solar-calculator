import React, { useEffect, useRef } from 'react';

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

  // Render the search field when the component updates.
  useEffect(() => {
    searchField.current = createAutocompleteField();
    // Only return geometry info, which contains latitude and longitude.
    searchField.current.setFields(['geometry']);
    // Handle selection of an autocomplete suggestion.
    searchField.current.addListener(
      'place_changed', handlePlaceChange);
  });

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
        <p>Area is {props.area} square feet</p>
      </div>
  )
}

export default SearchPane