
let images = {
  "Amazon": "https://production-gameflipusercontent.fingershock.com/us-east-1:47d82dc3-4acd-4d96-8053-9ae2fae26d3a/eba5e616-057e-4196-8f36-16381aa82529/1550faa5-c3b1-4bf9-8dd3-1bb8311bd5ce",
  "Best-Buy": "https://us4products.nimblecommerce.com/api/v1/images/17015/skin",
  "Itunes": "https://www.giftnix.com/giftnix/img/gift-cards/itunes-gift-card-email-delivery.png",
  "Walmart": "https://www.mountaineerins.com/wp-content/uploads/2017/01/Walmart-Gift-Card.png",
  "Target": "https://i2.wp.com/dannydealguru.com/wp-content/uploads/2016/02/target-gift-card.png?ssl=1"
}


export function mainReducer (state = {user: {}, loggedIn:false, allCards: [], allListings: [], allStores:[], topSelling: [], userCards: [], userSold:[], userPurchased:[], userForSale:[], images}, action ){
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {...state, user: action.payload, loggedIn: true}
    case "RESET_CURRENT_USER":
      return {...state, user: {}, loggedIn: false}
    case "GET_ALL_LISTINGS":
      return {...state, allListings: action.payload}
    case "ALL_STORES":
      return {...state, allStores: action.payload}
    // case "ADD_CARD_TO_LISTINGS":
    //
    //   // return {...state, allListings: action.payload}
    //   let newListings = state.allListings.map(listing=>{
    //     let curCard = state.allCards.find(card=>{
    //       return card.id === listing.giftcard_id
    //     })
    //     let newListing = {...listing,giftcard: curCard}
    //     // newListing.giftcard = curCard
    //     return newListing})
    //     return {...state, allListings: newListings}
      case "ADD_CARD_TO_USER_CARDS":
        let newList = [...state.userCards, action.payload]
        return{...state, userCards: newList}
      case "ADD_LISTING_TO_LISTINGS":
        let updatedListings = [...state.allListings,action.payload]
        return {...state, allListings: updatedListings}
      case "UPDATE_GIFTCARD":
        let newCardss = state.allCards.filter(gcard => gcard.user_id !== action.payload.user_id)
        newCardss.push(action.payload)
        return {...state, allCards: newCardss}
      case "TOP_SELLING":
        return {...state, topSelling: action.payload}
      case "USER_CARDS":
        return {...state, userCards: action.payload}
      case "USER_SOLD_LISTINGS":
        return {...state, userSold: action.payload}
      case "USER_PURCHASED_LISTINGS":
        return {...state, userPurchased: action.payload}
      case "USER_FOR_SALE":
        return {...state, userForSale: action.payload}
      case "TRANSACTION_RESULT":
        console.log("REDUCER", action.payload);
        let updatedTransactionListings = [...state.allListings.filter(list=>list.listings[0].id !== action.payload.listings[0].id), action.payload]
        console.log("after update",updatedTransactionListings)
        return{...state, allListings: updatedTransactionListings}
    default:
      return state
  }

}
