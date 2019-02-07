import React from 'react'
import {getCurrentUser} from "./thunks/mainThunk"
import {connect} from 'react-redux'
import Card from "./Card"
import {Redirect} from 'react-router-dom'
import CardListing from './CardListing'

class Sell extends React.Component {

  componentDidMount = () =>{

    this.props.getCurrentUser()
  }


  getTracked = () =>{
      if (this.props.allCards.length > 0){
        return this.props.allCards.filter(card=>{
          return (card.user_id === this.props.user.id && card.listed === false)
        }).reverse().map(card=>{
            return <Card key={card.id} card={card} sell={true}/>
          })
      }
  }

  getPurchased = () =>{
      if (this.props.allListings.length > 0 && this.props.allListings[0].giftcard){
        return this.props.allListings.filter(listing=>{
          return (listing.user_id === this.props.user.id && listing['date_sold']!==null )
        }).reverse().map(listing=>{
            return <CardListing key={listing.id} card={listing.giftcard}listing={listing} sell={true}/>
          })
      }
  }

  render(){

      return localStorage.length>0?(
      <div>
        <h2>Choose Card to Sell: </h2>
        {this.getTracked()}
        {this.getPurchased()}
      </div>
    ):<Redirect to="/login" />

  }
}

const mapDispatchToProps = (dispatch) => {
  return {getCurrentUser: () => dispatch(getCurrentUser())}

}

const mapStateToProps = state =>{
  return {allCards: state.allCards,
          user: state.user,
          loggedIn: state.loggedIn,
          allListings: state.allListings
        }
}

export default connect(mapStateToProps,mapDispatchToProps)(Sell)
