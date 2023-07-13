import React, { useCallback, useState } from "react";
import { useListings, useListingsDispatch } from "../services/providers/context";

function ListingCard({item}) {
  const listingData = useListings()
  const dispatch = useListingsDispatch()

  const [isFavorite, setIsFavorite] = useState(false);
  
  const handleFavorite = useCallback(() => {
    dispatch({
      type: 'favorite-listing',
      item,
      existingListing: listingData.favorite,
      listing: listingData.listing
    });
  }, [listingData.favorite, item, listingData.listing, dispatch]);

  const handleDelete = useCallback(() => {
    dispatch({
      type: 'delete-listing',
      itemId: item.id
    })
  }, [item.id, dispatch])

  
  return (
    <li className="card">
      <div className="image">
        <span className="price">$0</span>
        <img src={`${item.image}`} alt={item.description} />
      </div>
      <div className="details">
        <button className={`emoji-button favorite ${isFavorite && 'active'}`} 
        onClick={() => {
          setIsFavorite(!isFavorite)
          handleFavorite()
        }}>★</button>
        <strong>{item.description}</strong>
        <span> · {item.location}</span>
        <button className="emoji-button delete" onClick={(e) => handleDelete(e)}>🗑</button>
      </div>
    </li>
  );
}

export default ListingCard;
