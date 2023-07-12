import React, { useCallback, useContext, useEffect, useState } from "react";
import { useListingContext, useListings, useListingsDispatch} from "../services/providers/context";

function Search() {
  const listingData = useListings()
  const dispatch = useListingsDispatch()
  
  const [searchInput, setSearchInput] = useState({
    value: null
  });

  useEffect(() => {
    // console.log(searchInput.value);
  }, [searchInput.value]);
  
  const handleChange = useCallback((text) => {
    setSearchInput(() => {
      return {value: text}
    })
  },[searchInput])

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    dispatch({
      type: 'search-listing',
      query: searchInput,
      // data: listingData
    })
    // console.log(listingData);
  }

  return (
    <form className="searchbar" onSubmit={handleSubmitSearch}>
      { listingData.data !== null &&
      <input
        type="text"
        id="search"
        placeholder="search free stuff"
        onChange={(e) => handleChange(e.target.value)}
      />
      }
      <button type="submit">🔍</button>
    </form>
  );
}

export default Search;
