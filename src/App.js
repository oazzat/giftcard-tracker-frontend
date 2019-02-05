import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TestComp from './TestComp'
import {BrowserRouter, Switch, Route, NavLink, Redirect} from 'react-router-dom'
import NavBar from './NavBar'
import LoginPage from './LoginPage'
import Home from './Home'
import Buy from './Buy'
import Sell from './Sell'
import Profile from './Profile'
import {getAllCards} from './thunks/mainThunk'
import {getAllListings} from './thunks/mainThunk'
import {addCardToListing} from "./actions/appActions"
import {connect} from 'react-redux'

class App extends Component {

  componentDidMount = () =>{

    this.props.getAllCards()
    this.props.getAllListings()

  }


  combineCardsAndListings = () =>{
    let newListings = this.props.allListings.map(listing=>{
      let curCard = this.props.allCards.find(card=>{
        return card.id === listing.giftcard_id
      })

      listing.giftcard = curCard
      return listing
    })

    this.props.addCardToListing(newListings)
  }

  render() {
    this.combineCardsAndListings()

    return (
      <div className="App">
          <BrowserRouter>
            <React.Fragment>
            <NavBar/>

              <Route exact path='/' component={Home} />
              <Route path='/home' component={Home} />
              <Route path='/login' component={LoginPage} />
              <Route path='/buy' component={Buy} />
              <Route path='/sell' component={Sell} />
              <Route path='/profile' component={Profile} />
            </React.Fragment>
          </BrowserRouter>

      </div>
    );
  }
}

// <Route path="/" component={localStorage.token?LoggedInPage:LoginPage} />

const mapDispatchToProps = (dispatch) =>{
  return {getAllCards: ()=>{dispatch(getAllCards())},
          getAllListings: ()=>{dispatch(getAllListings())},
          addCardToListing: (allListings)=>dispatch(addCardToListing(allListings))}
}

const mapStateToProps = (state) =>{
  return {allCards: state.state.allCards, allListings: state.state.allListings}
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
