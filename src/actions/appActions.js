

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

export const populateAllCards = (allCards) => {
  return {type: "GET_ALL_CARDS", payload: allCards }
}

export const populateAllListings = (allListings) => {
  return {type: "GET_ALL_LISTINGS", payload: allListings }
}

export const addCardToListing = (allListings) => {
  return {type: "ADD_CARD_TO_LISTINGS", payload: allListings }
}

export const addCardtoAllCards = (newCard) =>{
  return {type: "ADD_CARD_TO_ALL_CARDS", payload: newCard}
}

export const addListingToListings = (newListing) => {
  return {type: "ADD_LISTING_TO_LISTINGS",payload: newListing}
}

export const updateGc = updatedGiftcard =>{
  return {type: "UPDATE_GIFTCARD", payload: updatedGiftcard}
}
