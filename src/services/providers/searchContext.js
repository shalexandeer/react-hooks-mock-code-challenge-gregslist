//handle search context
import { createContext, useContext } from "react"

export const SearchContext = createContext(undefined)
export function useSearchContext(){
    const search = useContext(SearchContext)

    if(listing === undefined) {
        throw new Error("useListingContext must be used ")
    }
    return search
}