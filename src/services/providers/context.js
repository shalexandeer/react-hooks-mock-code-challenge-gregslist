import { createContext, useContext, useEffect, useReducer, useState } from "react";

const ListingContext = createContext(undefined)
const ListingDispatchContext = createContext(undefined)


export default function listingReducer(state, action) {
    const {type} = action;
    switch (type) {
        case 'search-listing':
            return {
                ...state,
                filtered: state.listing.filter(listing => listing.description.toLowerCase().includes(action.query.value)),
                query: action.query.value
            }
        case 'set-listing':
            return{
                ...state,
                listing: action.payload,
                isLoading: action.isLoading
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
    })
    
    
    const fetchListings = async () => {
        const response = await fetch(`${baseURL}/listings`)
        const data = await response.json()
        
        // setInitialState(data)
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