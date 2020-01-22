import React, { useEffect, useRef } from 'react';

const SearchPane = (props) => {
	const searchFieldRef = React.createRef();
  const searchField = useRef(null);

  const createAutocompleteField = () =>
    new window.google.maps.places.Autocomplete(searchFieldRef.current, {
      types: ['address']
    });

  // Render the search field when the component updates.
  useEffect(() => {
    searchField.current = createAutocompleteField();
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