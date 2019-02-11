

export const setCurrentUser = (user) =>{

  return {type: 'SET_CURRENT_USER',payload: user}
}

export const resetCurrentUser = () =>{
  localStorage.clear()
  return {type: 'RESET_CURRENT_USER'}
}

export const removeLogin = () =>{
  return{type: 'REMOVE_LOGIN', payload: false}
}

export const populateAllListings = (allListings) => {
  return {type: "GET_ALL_LISTINGS", payload: allListings }
}

export const addCardToListing = (allListings) => {
  return {type: "ADD_CARD_TO_LISTINGS", payload: allListings }
}

export const addCardtoUserCards = (newCard) =>{
  return {type: "ADD_CARD_TO_USER_CARDS", payload: newCard}
}

export const addListingToListings = (newListing) => {
  return {type: "ADD_LISTING_TO_LISTINGS",payload: newListing}
}

export const updateGc = updatedGiftcard =>{
  return {type: "UPDATE_GIFTCARD", payload: updatedGiftcard}
}

export const topSelling = list =>{
  return {type: "TOP_SELLING", payload: list}
}

export const userCards = cards =>{
  return {type: "USER_CARDS", payload: cards}
}

export const userSold = soldListings =>{
  return {type: "USER_SOLD_LISTINGS", payload: soldListings}
}

export const userPurchased = purchasedListings =>{
  return {type: "USER_PURCHASED_LISTINGS", payload: purchasedListings}
}

export const userForSale = listingsForSale =>{
  return {type: "USER_FOR_SALE", payload: listingsForSale}
}

export const allStores = stores =>{
  return {type: "ALL_STORES", payload: stores}
}
