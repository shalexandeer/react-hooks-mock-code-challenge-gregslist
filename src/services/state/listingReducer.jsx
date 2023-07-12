

export default function listingReducer(state, action) {
    const {type} = action;
    switch (type) {
        case 'search-listing':{
            console.log(state.filter(listing => listing.description.includes(searchInput.value)));
        }
        case SET_LISTINGS:
            return action.payload
        default:
            return state
    }
}