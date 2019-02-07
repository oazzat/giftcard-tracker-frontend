import {setCurrentUser} from '../actions/appActions'
import {resetCurrentUser, updateGc} from '../actions/appActions'
import {populateAllCards, addCardToListing, addCardtoAllCards} from '../actions/appActions'
import {populateAllListings, addListingToListings} from '../actions/appActions'


export const getCurrentUser = () => dispatch => {

  return fetch("http://localhost:3000/api/v1/profile",
        {method: "GET", headers: {Authorization: `Bearer ${localStorage.token}`}})
    .then(res => res.json())
    .then(user => user.status === 500? dispatch(resetCurrentUser()) : dispatch(setCurrentUser(user)))
}

export const getAllCards = () => dispatch =>{
    return fetch("http://localhost:3000/api/v1/giftcards")
        .then(res => res.json())
        .then(allCards => dispatch(populateAllCards(allCards)))
        .then(getListings => dispatch(getAllListings()))

}

export const getAllListings = () => dispatch =>{
    return fetch("http://localhost:3000/api/v1/listings")
        .then(res => res.json())
        // .then(allListings => combineCardsAndListings(allListings))
        .then(allListings => {
          dispatch(populateAllListings(allListings))
          dispatch(addCardToListing(""))
        })


}

export const createCard = (card) => dispatch =>{
  return fetch(`http://localhost:3000/api/v1/giftcards`,{
    method: "POST",
    headers: {"Content-Type": "application/json", Authorization: `Bearer ${localStorage.token}`},
    body: JSON.stringify(card)
  })
  .then(res=>res.json())
  .then(newCard => dispatch(addCardtoAllCards(newCard)))
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
    return listing
  })
  .then(listing => fetch(`http://localhost:3000/api/v1/giftcards/${listing.giftcard_id}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}`
    },
    body: JSON.stringify({listed: true})
  }))
  .then(res => res.json())
  .then(newGc => dispatch(updateGc(newGc)))
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
