import { createContext, useContext, useEffect, useReducer} from "react";

const ListingContext = createContext(undefined)
const ListingDispatchContext = createContext(undefined)


export default function listingReducer(state, action) {
    const {type} = action;
    switch (type) {
        case 'search-listing':
            const filteredListing = state.listing.filter(listing => listing.description.toLowerCase().includes(action.query))
            return {
                ...state,
                filtered: filteredListing,
                query: action.query
            }
        case 'set-listing':
            return{
                ...state,
                listing: action.payload,
                isLoading: action.isLoading,
                query: action.query
            }
        case 'delete-listing':
            console.log(action.existingListing);
            return{
                ...state,
                listing: state.listing.filter(item => item.id !== action.itemId),
                favorite: action.existingListing.filter(item => item.id !== action.itemId)
            } 
        case 'favorite-listing':
            if(action.existingListing.length > 0){
                if(action.existingListing.find(({id}) => id === action.item.id) !== undefined){
                    return{
                        ...state,
                        favorite: action.existingListing.filter((item) => item.id !== action.item.id)
                    }
                };
            }
            action.existingListing.push(action.item)
            const pushedItem = action.existingListing
            return {
                ...state,
                favorite: pushedItem 
            }
        default:
            return state
    }
}

export function ListingProvider({children}){
    const baseURL = 'http://localhost:6001'
    const [listingState, dispatch] = useReducer(listingReducer, {
        listing: null,
        filtered: null,
        isLoading: true,
        favorite: [],
        query: ''
    })
    
    
    const fetchListings = async () => {
        const response = await fetch(`${baseURL}/listings`)
        const data = await response.json()
        
        dispatch({
          type: 'set-listing',
          payload: data,
          isLoading: false
        })
    }
    
      useEffect(() => {
        fetchListings()
        return () => {}
      }, [])
    
    return(
        <ListingContext.Provider value={listingState}>
            <ListingDispatchContext.Provider value={dispatch}>
                {children}
            </ListingDispatchContext.Provider>
        </ListingContext.Provider>
    )
}

export function useListings(){
    return useContext(ListingContext)
}
export function useListingsDispatch(){
    return useContext(ListingDispatchContext)
}