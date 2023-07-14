import { useEffect, useState } from "react";
import { useListings } from "../services/providers/context";
import ListingCard from './ListingCard';

function ListingsContainer() {
  const listingData = useListings();
  const [showFavorite, setShowFavorite] = useState(false);

  console.log('listingcontainer rendered');

  useEffect(() => {
    if (listingData.query !== undefined && listingData.filtered !== null) {
      setShowFavorite(false);
    }
  }, [listingData]);

  const renderListings = () => {
    if (showFavorite) {
      return listingData.favorite.length > 0 ? (
        listingData.favorite.map(item => (
          <ListingCard item={item} key={item.id} />
        ))
      ) : (
        <p>no favorite</p>
      );
    } else {
      return listingData.isLoading ? (
        <li>loading</li>
      ) : (
        <ul className="cards">
          {listingData.filtered
            ? listingData.filtered.map(item => (
                <ListingCard item={item} key={item.id} />
              ))
            : listingData.listing.map(item => (
                <ListingCard item={item} key={item.id} />
              ))}
        </ul>
      );
    }
  };

  return (
    <main>
      <button onClick={() => setShowFavorite(prevState => !prevState)}>
        Show favorite
      </button>
      {renderListings()}
    </main>
  );
}

export default ListingsContainer;