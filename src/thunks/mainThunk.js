import {setCurrentUser} from '../actions/appActions'
import {resetCurrentUser, updateGc} from '../actions/appActions'
import {addCardtoUserCards, userCards, allStores, userSold, userPurchased, userForSale, transactionResult} from '../actions/appActions'
import {populateAllListings, addListingToListings, topSelling, updatedUser, removeCard, unlistCard, deleteListing} from '../actions/appActions'

const HEROKU_ENDPOINTS = 'https://giftcard-wallet-backend.herokuapp.com/api/v1/'

export const getCurrentUser = () => dispatch => {

  return fetch(`${HEROKU_ENDPOINTS}profile`,
        {method: "GET", headers: {Authorization: `Bearer ${localStorage.token}`}})
        .then(res => {
          if (res.ok){
          return res.json()}
          else{
            throw new Error('Not Logged In')
          }
        })
    .then(user => user.status === 500? dispatch(resetCurrentUser()) : dispatch(setCurrentUser(user)))
    .then(disp => disp.type === "SET_CURRENT_USER"? dispatch(getUserCards()):null)
}

export const getAllListings = () => dispatch =>{
    return fetch(`${HEROKU_ENDPOINTS}giftcards/for_sale`)
        .then(res => res.json())
        // .then(allListings => combineCardsAndListings(allListings))
        .then(allListings => {
          dispatch(populateAllListings(allListings))
          // dispatch(addCardToListing(""))
        })


}

export const getStores = () => dispatch => {
  return fetch(`${HEROKU_ENDPOINTS}stores`)
    .then(res => res.json())
    .then(stores => dispatch(allStores(stores)))
}

export const createCard = (card) => dispatch =>{
  return fetch(`${HEROKU_ENDPOINTS}giftcards`,{
    method: "POST",
    headers: {"Content-Type": "application/json", Authorization: `Bearer ${localStorage.token}`},
    body: JSON.stringify(card)
  })
  .then(res=>res.json())
  .then(newCard => dispatch(addCardtoUserCards(newCard)))
}

export const createListing = (listing) => dispatch =>{
  return fetch(`${HEROKU_ENDPOINTS}listings`,{
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
  // .then(listing => fetch(`${HEROKU_ENDPOINTS}giftcards/${listing.giftcard_id}`,{
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
  return fetch(`${HEROKU_ENDPOINTS}stores/best_selling_stores`)
    .then(res => res.json())
    .then(list => dispatch(topSelling(list)))
}

export const getUserCards = () => dispatch =>{
  return fetch(`${HEROKU_ENDPOINTS}giftcards/all_user_cards`,{
    headers: {Authorization: `Bearer ${localStorage.token}`}
  })
    .then(res => res.json())
    .then(cards => dispatch(userCards(cards)))
}

export const getUserSold = () =>dispatch=>{
  return fetch(`${HEROKU_ENDPOINTS}listings/user_sold`,{
    headers: {Authorization: `Bearer ${localStorage.token}`}
  })
  .then(res => res.json())
  .then(listings => dispatch(userSold(listings)))
}

export const getUserPurchased = () => dispatch => {
  return fetch(`${HEROKU_ENDPOINTS}listings/user_purchased`,{
    headers: {Authorization: `Bearer ${localStorage.token}`}
  })
  .then(res => res.json())
  .then(listings => dispatch(userPurchased(listings)))
}

export const getUserForSale = () => dispatch => {
  return fetch(`${HEROKU_ENDPOINTS}listings/user_for_sale`,{
    headers: {Authorization: `Bearer ${localStorage.token}`}
  })
  .then(res => {
    if (res.ok){
    return res.json()}
    else{
      throw new Error("Don't Need User For Sale")
    }
  })
  .then(listings => dispatch(userForSale(listings)))
}

export const performTransaction = (card) => dispatch =>{
  // console.log("THE ACRD", card);
  return fetch(`${HEROKU_ENDPOINTS}listings/${card.id}`,{
    method: "PATCH",
    headers: {"Content-Type": "application/json", Authorization: `Bearer ${localStorage.token}`},
    body: JSON.stringify(card)
  })
  .then(res => res.json())
  .then(listing => dispatch(transactionResult(listing)))
  .then(disp => dispatch(getCurrentUser()))
  .then(disp => dispatch(getUserForSale()))
  .then(disp => dispatch(getUserCards()))

}

export const updateUserAmount = (amount,id) => (dispatch) =>{
  return fetch(`${HEROKU_ENDPOINTS}users/${id}`,{
    method: "PATCH",
    headers: {"Content-Type": "application/json", Authorization: `Bearer ${localStorage.token}`},
    body: JSON.stringify({balance: amount})
  })
  .then(res => res.json())
  .then(user => dispatch(updatedUser(user)))
}

export const deleteCard = (id) => dispatch => {
  return fetch(`${HEROKU_ENDPOINTS}giftcards/${id}`,{method: "DELETE",headers: {Authorization: `Bearer ${localStorage.token}`}})
    .then(res => res.json())
    .then(data => dispatch(removeCard(data.id)))
}

export const patchListed = (id, listId) => dispatch => {
  return fetch (`${HEROKU_ENDPOINTS}giftcards/${id}`,{method: "PATCH",
        headers: {Authorization: `Bearer ${localStorage.token}`},
        body: JSON.stringify({listed: false})})
    .then(res => res.json())
    .then(data => dispatch(unlistCard(data.id)))
    .then(fet => fetch (`${HEROKU_ENDPOINTS}listings/${listId}`,{method: "DELETE",
          headers: {Authorization: `Bearer ${localStorage.token}`},
        }))
      .then(res=>res.json())
      .then(data=>dispatch(deleteListing(data.id)))
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
