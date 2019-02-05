export function mainReducer (state = {user: {}, loggedIn:false, allCards: [], allListings: []}, action ){
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {...state, user: action.payload, loggedIn: true}
    case "RESET_CURRENT_USER":
      return {...state, user: {}, loggedIn: false}
    case "GET_ALL_CARDS":
      return {...state, allCards: action.payload}
    case "GET_ALL_LISTINGS":
      return {...state, allListings: action.payload}
    case "ADD_CARD_TO_LISTINGS":
      
      // return {...state, allListings: action.payload}
      let newListings = state.allListings.map(listing=>{
        let curCard = state.allCards.find(card=>{
          return card.id === listing.giftcard_id
        })
        let newListing = {...listing,giftcard: curCard}
        // newListing.giftcard = curCard
        return newListing})
        return {...state, allListings: newListings}

    default:
      return state
  }

}
