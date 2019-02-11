import React from 'react'
import {getCurrentUser, getUserCards} from "./thunks/mainThunk"
import {connect} from 'react-redux'
import Card from "./Card"
import {Redirect} from 'react-router-dom'
import CardListing from './CardListing'
import LoginPage from './LoginPage'
import GridListContainer from "./GridList"

class Sell extends React.Component {

  componentDidMount = () =>{

    this.props.getCurrentUser()
    this.props.getUserCards()
  }


  getTracked = () =>{
    console.log(this.props.userCards);
      if (this.props.userCards > 0){
        return this.props.userCards.map(card=>{
            return <Card key={card.id} card={card} calList={true}/>
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

      return (this.props.loggedIn?
      <div>
        <h2>Choose Card to Sell: </h2>
        <GridListContainer cards={this.props.userCards}></GridListContainer>
        {this.getTracked()}
        {this.getPurchased()}
      </div>
    :<LoginPage/>)

  }
}

const mapDispatchToProps = (dispatch) => {
  return {getCurrentUser: () => dispatch(getCurrentUser()),
          getUserCards: () => dispatch(getUserCards())}

}

const mapStateToProps = state =>{
  return {allCards: state.allCards,
          user: state.user,
          loggedIn: state.loggedIn,
          allListings: state.allListings,
          userCards: state.userCards.filter(listing=>listing.listed===false)
        }
}

export default connect(mapStateToProps,mapDispatchToProps)(Sell)
