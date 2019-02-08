import React from 'react'
import {getCurrentUser, createCard} from "./thunks/mainThunk"

import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import CardListing from './CardListing'
import Card from './Card'
import moment from 'moment'

class Profile extends React.Component {

  state = {
    card_type: "Amazon",
    exp_date: moment().format("YYYY-MM-DD"),
    barcode: "",
    passcode: "",
    balance: "",
    img: "",
    user_id: this.props.user.id,
    listed: false,
    date_verified: null
  }

  componentDidMount = () =>{

    this.props.getCurrentUser()

  }




  getListings = () =>{
    if (this.props.allListings.length > 0 && this.props.allListings[0].giftcard){
    return this.props.allListings.filter(listing=>{
      return (listing.user_id === this.props.user.id && listing.giftcard.listed === true)
    }).reverse().map(listing=>{
        return <CardListing key={listing.id} card={listing.giftcard} listing={listing}/>
      })
    }
  }

  getPurchased = () =>{
      if (this.props.allListings.length > 0 && this.props.allListings[0].giftcard){
        return this.props.allListings.filter(listing=>{
          return (listing.user_id === this.props.user.id && listing['date_sold']!==null && listing.prev_user !== null )
        }).reverse().map(listing=>{
            return <CardListing key={listing.id} card={listing.giftcard} listing={listing}/>
          })
      }
  }

  getSold = () =>{
      if (this.props.allListings.length > 0 && this.props.allListings[0].giftcard){
        return this.props.allListings.filter(listing=>{
          return (listing['prev_user']===this.props.user.id)
        }).reverse().map(listing=>{
            return <CardListing key={listing.id} card={listing.giftcard} listing={listing}/>
          })
      }
  }

  getTracked = () =>{
      if (this.props.allCards.length > 0){
        return this.props.allCards.filter(card=>{
          return (card.user_id === this.props.user.id && card.listed === false)
        }).reverse().map(card=>{
            return <Card key={card.id}  card={card}/>
          })
      }
  }

  handleSubmit = (e) =>{
    e.preventDefault()
    this.setState({img: this.props.images[this.state.card_type],user_id: this.props.user.id},()=>{
      this.props.createCard(this.state)
    })

  }

  changeHandler = (e) =>{

    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render(){

    if (localStorage.token!=undefined || !localStorage.length === 0){
      return (
        <div>
        <h2>Profile Page</h2>

        <form  onSubmit={this.handleSubmit}>
          <h5>Add Card to Profile:</h5>
          Store: <select value={this.state.value} onChange={this.changeHandler} name="card_type">
            {/*<option selected disabled hidden>Choose store</option>*/}
            <option value="Amazon">Amazon</option>
            <option  value="Best-Buy">Best Buy</option>
            <option value="Walmart">Walmart</option>
            <option value="Target">Target</option>
            <option  value="Itunes">iTunes</option>
          </select><br></br>
          Exp. Date: <input onChange={this.changeHandler} name="exp_date" type="date" value={this.state.exp_date}/><br></br>
          Barcode: <input onChange={this.changeHandler} name="barcode" type="text" value={this.state.barcode}/><br></br>
          Passcode: <input onChange={this.changeHandler} name="passcode" type="text" /><br></br>
          Balance: $<input onChange={this.changeHandler} name="balance" type="number" /><br></br>
          <button>Submit</button><br></br><br></br>
        </form>


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
    return <Redirect to='/home'/>
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {getCurrentUser: () => dispatch(getCurrentUser()),
          createCard: (newCard) => dispatch(createCard(newCard))
          }

}

const mapStateToProps = (state =>{
  return {loggedIn: state.loggedIn,
          allListings: state.allListings,
          user: state.user,
          allCards: state.allCards,
          images: state.images
        }
})

export default connect(mapStateToProps,mapDispatchToProps)(Profile)
