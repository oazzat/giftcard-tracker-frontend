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
    //this gets cards, which dispatches the get listings which dispatches the adding gc to listings

  }


  render() {

    return (
      <div className="App">
          <BrowserRouter>
            <React.Fragment>
            <NavBar/>
            <Switch>

              <Route path='/home' component={Home} />
              <Route path='/login' component={LoginPage} />
              <Route path='/buy' component={Buy} />
              <Route path='/sell' component={Sell} />
              <Route path='/profile' component={Profile} />
              <Route path='/' component={Home} />
            </Switch>
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
  return {allCards: state.allCards, allListings: state.allListings}
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
