import { useListings } from "../services/providers/context";
import ListingCard from './ListingCard';

function ListingsContainer() {
  //get listing data
  const listingData = useListings()

  return (
    <main>
      {!listingData.isLoading && listingData.listing !== null ?
      <ul className="cards">
        {/* use the ListingCard component to display listings */}
        {listingData.query == undefined ? listingData.listing.map(item => {
          return <ListingCard item={item} key={item.id} />
        }):
        listingData.filtered.map(item => {
          return <ListingCard item={item} key={item.id} />
        }) }
      </ul> : <li>loading</li>}
    </main>
  );
}

export default ListingsContainer;
