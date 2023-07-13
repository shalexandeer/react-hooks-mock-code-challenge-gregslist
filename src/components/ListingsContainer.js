import { useEffect, useState } from "react";
import { useListings} from "../services/providers/context";
import ListingCard from './ListingCard';

function ListingsContainer() {
  //get listing data
  const listingData = useListings()
  const [hasQuery, setHasQuery] = useState(false);
  const [showFavorite, setShowFavorite] = useState(false);
  
  useEffect(() => {
    if(listingData.query !== undefined && listingData.filtered !== null){
      setHasQuery(true)
    }else{
      setHasQuery(false)
    }
  }, [hasQuery, listingData]);
  
  return (
    <main>
      <button onClick={() => setShowFavorite(!showFavorite)}>Show favorite</button>
      {!showFavorite ?
      !listingData.isLoading && listingData.listing !== null ?
      <ul className="cards">
        {/* use the ListingCard component to display listings */}
        {
          !hasQuery ? 
          //has query 
          listingData.listing.map(item => {
            return <ListingCard item={item} key={item.id} />
          }) :
          // no query
          listingData.filtered.map(item => {
            return <ListingCard item={item} key={item.id} />
          }) 
        }
        
      </ul> : <li>loading</li>
      : 
      listingData.favorite.length > 0 ?
        listingData.favorite.map(item => {
          return <ListingCard item={item} key={item.id} />
        }) : <p>no favorite</p>}
      </main>
  );
}

export default ListingsContainer;
