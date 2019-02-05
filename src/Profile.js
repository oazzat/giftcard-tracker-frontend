import React from 'react'
import {getCurrentUser} from "./thunks/mainThunk"
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import CardListing from './CardListing'
import Card from './Card'

class Profile extends React.Component {

  componentDidMount = () =>{

    this.props.getCurrentUser()
  }

  getListings = () =>{
    if (this.props.allListings.length > 0 && this.props.allListings[0].giftcard){
    return this.props.allListings.filter(listing=>{
      return (listing.user_id === this.props.user.id && listing['date_sold']===null)
    }).map(listing=>{
        return <CardListing key={listing.id} listing={listing}/>
      })
    }
  }

  getPurchased = () =>{
      if (this.props.allListings.length > 0 && this.props.allListings[0].giftcard){
        return this.props.allListings.filter(listing=>{
          return (listing.user_id === this.props.user.id && listing['date_sold']!==null)
        }).map(listing=>{
            return <CardListing key={listing.id} listing={listing}/>
          })
      }
  }

  getSold = () =>{
      if (this.props.allListings.length > 0 && this.props.allListings[0].giftcard){
        return this.props.allListings.filter(listing=>{
          return (listing.user_id === this.props.user.id && listing['prev_user']!==this.props.user.id)
        }).map(listing=>{
            return <CardListing key={listing.id} listing={listing}/>
          })
      }
  }

  getTracked = () =>{
      if (this.props.allCards.length > 0){
        return this.props.allCards.filter(card=>{
          return (card.user_id === this.props.user.id && card.listed === false)
        }).map(card=>{
            return <Card key={card.bacrcode} card={card}/>
          })
      }
  }

  render(){

    if (localStorage.token!=undefined || !localStorage.length === 0){
      return (
        <div>
        <h2>Profile Page</h2>

        <div>
        My Tracked Cards:
        {this.getTracked()}
        </div>

        <div>
        My Sold Cards:
        {this.getSold()}
        </div>

        <div>
        My Purchased Cards:
        {this.getPurchased()}
        </div>

        <div>
        My Listings:
        {this.getListings()}
        </div>

        </div>
      )
    }
    else{
    return <Redirect to='/login'/>
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {getCurrentUser: () => dispatch(getCurrentUser())}

}

const mapStateToProps = (state =>{
  return {loggedIn: state.state.loggedIn,
          allListings: state.state.allListings,
          user: state.state.user,
          allCards: state.state.allCards}
})

export default connect(mapStateToProps,mapDispatchToProps)(Profile)
