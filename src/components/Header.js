import React, { useCallback, useState } from "react";
import Search from "./Search";
import { useListingsDispatch } from "../services/providers/context";

function Header() {
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
  },[searchInput, dispatch])

  console.log('header rendered');
  return (
    <header>
      <h1>
        <span className="logo" role="img">
          ☮
        </span>
        gregslist
      </h1>
      <Search searchInput={searchInput} handleChange={handleChange} />
    </header>
  );
}

export default Header;
