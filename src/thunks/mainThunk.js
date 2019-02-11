import {setCurrentUser} from '../actions/appActions'
import {resetCurrentUser, updateGc} from '../actions/appActions'
import {addCardtoUserCards, userCards, allStores, userSold, userPurchased, userForSale} from '../actions/appActions'
import {populateAllListings, addListingToListings, topSelling} from '../actions/appActions'


export const getCurrentUser = () => dispatch => {

  return fetch("http://localhost:3000/api/v1/profile",
        {method: "GET", headers: {Authorization: `Bearer ${localStorage.token}`}})
    .then(res => res.json())
    .then(user => user.status === 500? dispatch(resetCurrentUser()) : dispatch(setCurrentUser(user)))
}

export const getAllListings = () => dispatch =>{
    return fetch("http://localhost:3000/api/v1/giftcards/for_sale")
        .then(res => res.json())
        // .then(allListings => combineCardsAndListings(allListings))
        .then(allListings => {
          dispatch(populateAllListings(allListings))
          // dispatch(addCardToListing(""))
        })


}

export const getStores = () => dispatch => {
  return fetch("http://localhost:3000/api/v1/stores")
    .then(res => res.json())
    .then(stores => dispatch(allStores(stores)))
}

export const createCard = (card) => dispatch =>{
  return fetch(`http://localhost:3000/api/v1/giftcards`,{
    method: "POST",
    headers: {"Content-Type": "application/json", Authorization: `Bearer ${localStorage.token}`},
    body: JSON.stringify(card)
  })
  .then(res=>res.json())
  .then(newCard => dispatch(addCardtoUserCards(newCard)))
}

export const createListing = (listing) => dispatch =>{
  return fetch("http://localhost:3000/api/v1/listings",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}`
    },
    body: JSON.stringify(listing)
  })
  .then(res => res.json())
  .then(listing => {
    dispatch(addListingToListings(listing))
    dispatch(getUserCards())
    // return listing
  })
  // .then(getCards => {getUserCards();getAllListings()})
  // .then(listing => fetch(`http://localhost:3000/api/v1/giftcards/${listing.giftcard_id}`,{
  //   method: "PATCH",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${localStorage.token}`
  //   },
  //   body: JSON.stringify({listed: true})
  // }))
  // .then(res => res.json())
  // .then(newGc => dispatch(updateGc(newGc)))
}

export const getBestSellers = () => dispatch => {
  return fetch("http://localhost:3000/api/v1/stores/best_selling_stores")
    .then(res => res.json())
    .then(list => dispatch(topSelling(list)))
}

export const getUserCards = () => dispatch =>{
  return fetch("http://localhost:3000/api/v1/giftcards/all_user_cards",{
    headers: {Authorization: `Bearer ${localStorage.token}`}
  })
    .then(res => res.json())
    .then(cards => dispatch(userCards(cards)))
}

export const getUserSold = () =>dispatch=>{
  return fetch("http://localhost:3000/api/v1/listings/user_sold",{
    headers: {Authorization: `Bearer ${localStorage.token}`}
  })
  .then(res => res.json())
  .then(listings => dispatch(userSold(listings)))
}

export const getUserPurchased = () => dispatch => {
  return fetch("http://localhost:3000/api/v1/listings/user_purchased",{
    headers: {Authorization: `Bearer ${localStorage.token}`}
  })
  .then(res => res.json())
  .then(listings => dispatch(userPurchased(listings)))
}

export const getUserForSale = () => dispatch => {
  return fetch("http://localhost:3000/api/v1/listings/user_for_sale",{
    headers: {Authorization: `Bearer ${localStorage.token}`}
  })
  .then(res => res.json())
  .then(listings => dispatch(userForSale(listings)))
}

// const combineCardsAndListings = (allListings) =>{
//   let newListings = allListings.map(listing=>{
//     let curCard = this.props.allCards.find(card=>{
//       return card.id === listing.giftcard_id
//     })
//
//     listing.giftcard = curCard
//     console.log("HERE")
//     return listing
//   })
//
//   return newListings
// }
