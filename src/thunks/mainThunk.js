import {setCurrentUser} from '../actions/appActions'
import {resetCurrentUser} from '../actions/appActions'
import {populateAllCards, addCardToListing} from '../actions/appActions'
import {populateAllListings} from '../actions/appActions'

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
