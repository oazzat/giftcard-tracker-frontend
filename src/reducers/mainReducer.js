
let images = {
  "Amazon": "https://production-gameflipusercontent.fingershock.com/us-east-1:47d82dc3-4acd-4d96-8053-9ae2fae26d3a/eba5e616-057e-4196-8f36-16381aa82529/1550faa5-c3b1-4bf9-8dd3-1bb8311bd5ce",
  "Best-Buy": "https://us4products.nimblecommerce.com/api/v1/images/17015/skin",
  "Itunes": "https://www.giftnix.com/giftnix/img/gift-cards/itunes-gift-card-email-delivery.png",
  "Walmart": "https://www.mountaineerins.com/wp-content/uploads/2017/01/Walmart-Gift-Card.png",
  "Target": "https://i2.wp.com/dannydealguru.com/wp-content/uploads/2016/02/target-gift-card.png?ssl=1"
}


export function mainReducer (state = {user: {}, loggedIn:false, allCards: [], allListings: [],filteredList:[],searchBy:"", allStores:[], topSelling: [], userCards: [], userSold:[], userPurchased:[], userForSale:[], images}, action ){
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {...state, user: action.payload, loggedIn: true}
    case "RESET_CURRENT_USER":
      return {...state, user: {}, loggedIn: false}
    case "GET_ALL_LISTINGS":
      return {...state, allListings: action.payload, filteredList: action.payload}
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
        console.log(state.userCards);
        let newList = []
        if (state.userCards.length<1){newList = [action.payload]}
        else{newList = [ action.payload,...state.userCards]}
        return{...state, userCards: newList}
      case "ADD_LISTING_TO_LISTINGS":
        console.log("HIT IT")
        let updatedListings = []
        if (state.allListings.length < 2) {updatedListings = [action.payload]}
        else {updatedListings = [...state.allListings,action.payload]}
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
        // console.log("REDUCER", action.payload);
        let updatedTransactionListings = [...state.allListings.filter(list=>list.listings[0].id !== action.payload.listings[0].id), action.payload]
        // console.log("after update",updatedTransactionListings)
        return{...state, allListings: updatedTransactionListings}
      case "FILTERED_FOR_SALE":
        return {...state, filteredList: action.payload.filteredList, searchBy: action.payload.searchBy}
      case "UPDATED_USER":
        return{...state, user: action.payload }
      case "REMOVE_CARD":
        let newUserCards = state.userCards.filter(card=>card.id != action.payload)
        return{...state, userCards: newUserCards}
      case "UNLIST_CARD":
        let unlistedCard = {...state.userForSale.find(item=>item.giftcard.id == action.payload)}
        unlistedCard.giftcard.listed = false

        let unlistedCard2 = {...state.userForSale.find(item=>item.giftcard.id == action.payload)}
        unlistedCard2.giftcard.listed = false

        let unlistedListing = {...state.allListings.find(item=>item.id==action.payload)}
        unlistedListing.listed = false

        let unlistedListing4 = {...state.allListings.find(item=>item.id==action.payload)}
        unlistedListing4.listed = false

        // let newUserCardArr = state.userCards.map(card=>card.id == action.payload?)

        // let newSold = state.userSold.map(listing=>listing.giftcard.id==action.payload?listing.giftcard.listed = false:listing)
        let newPurch = state.userPurchased.map(listing=>listing.giftcard.id==action.payload?unlistedCard:listing)
        let newForSale = state.userForSale.map(listing=>listing.giftcard.id==action.payload?unlistedCard2:listing)
        let newAll = state.allListings.map(listing=>listing.id==action.payload?unlistedListing:listing)
        let newFilt = state.filteredList.map(listing=>listing.id==action.payload?unlistedListing4:listing)
        return {...state, allListings: newAll, filteredList: newFilt, userForSale: newForSale}
      case "DELETE_LISTING":
      console.log("THIS", action.payload)
        let filtArr = state.userForSale.filter(listing=>listing.id!=action.payload)
        return {...state, userForSale: filtArr}
    default:
      return state
  }

}
