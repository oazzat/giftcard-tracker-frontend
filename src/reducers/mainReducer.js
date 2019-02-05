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
    default:
      return state
  }

}
