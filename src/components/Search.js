import React, { useCallback, useState } from "react";
import { useListings, useListingsDispatch} from "../services/providers/context";

function Search() {
  const listingData = useListings()
  const dispatch = useListingsDispatch()
  
  const [searchInput, setSearchInput] = useState({
    value: ""
  });
  
  const handleChange = useCallback((text) => {
    setSearchInput(() => {
      return {value: text}  
    })
    dispatch({
      type: 'search-listing',
      query: text,
    })
  },[dispatch])

  return (
    <div className="searchbar">
      { listingData.data !== null &&
      <input
        type="text"
        id="search"
        placeholder="search free stuff"
        value={searchInput.value}
        onChange={(e) => handleChange(e.target.value)}
      />
      }
      {/* <button type="submit">🔍</button> */}
    </div>
  );
}

export default Search;
