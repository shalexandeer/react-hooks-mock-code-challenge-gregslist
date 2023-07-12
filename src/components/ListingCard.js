import React, { useCallback, useState } from "react";

function ListingCard({item}) {
  const [favorite, setFavorite] = useState(false);

  const handleFavourite = useCallback(() => {
    setFavorite(prevFavorite => !prevFavorite)
  },[])  
  
  return (
    <li className="card">
      <div className="image">
        <span className="price">$0</span>
        <img src={`${item.image}`} alt={item.description} />
      </div>
      <div className="details">
        <button className={`emoji-button favorite ${favorite && 'active'}`} onClick={() => handleFavourite()}>★</button>
        <strong>{item.description}</strong>
        <span> · {item.location}</span>
        <button className="emoji-button delete">🗑</button>
      </div>
    </li>
  );
}

export default ListingCard;
