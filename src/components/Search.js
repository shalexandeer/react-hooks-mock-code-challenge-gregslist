import React, { memo } from "react";
import { useListings } from "../services/providers/context";

function Search({ handleChange, searchInput }) {
  const listingData = useListings();
  console.log('search rendered');

  return (
    <div className="searchbar">
      {listingData.data !== null && (
        <input
          type="text"
          id="search"
          placeholder="search free stuff"
          value={searchInput.value}
          onChange={(e) => handleChange(e.target.value)}
        />
      )}
    </div>
  );
}

export default memo(Search);