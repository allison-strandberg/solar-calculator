import React, { useEffect } from 'react';

const SearchPane = (props) => {
	const searchFieldRef = React.createRef();

  const createAutocompleteField = () =>
    new window.google.maps.places.Autocomplete(searchFieldRef.current, {
      // Only suggest addresses, not other kinds of locations.
      types: ['address']
    });

  // Update the latitude and longitude values in the application state
  // based on the selected address.
  const handlePlaceChange = () => {
    const place = searchFieldRef.current.getPlace();
    const latitude = place.geometry.location.lat();
    const longitude = place.geometry.location.lng();
    props.onPlaceChange(latitude, longitude);
  }

  // Render the search field when the component updates.
  useEffect(() => {
    searchFieldRef.current = createAutocompleteField();
    // Only return geometry info, which contains latitude and longitude.
    searchFieldRef.current.setFields(['geometry']);
    // Handle selection of an autocomplete suggestion.
    searchFieldRef.current.addListener(
    	'place_changed', handlePlaceChange);
  });

  return (
      <div className="search-pane">
        <input
          className="field-search"
          type="text"
          ref={searchFieldRef}
        />
      </div>
  )
}

export default SearchPane