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
import {getAllListings, getStores} from './thunks/mainThunk'
import {addCardToListing} from "./actions/appActions"
import {connect} from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import img from "./images/bgImage.jpg"

class App extends Component {

  componentDidMount = () =>{

    this.props.getAllListings()
    this.props.getStores()


  }



  styles = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  };
  render() {

    return (
      <div className="App" style={{backgroundColor: "burlywood"}}>
          <BrowserRouter>
            <React.Fragment>

            <NavBar />

            <Switch>

              <Route path='/home' component={Home} />
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
  return {
          getAllListings: ()=>{dispatch(getAllListings())},
          addCardToListing: (allListings)=>dispatch(addCardToListing(allListings)),
          getStores: ()=>dispatch(getStores())}
}

const mapStateToProps = (state) =>{
  return {allCards: state.allCards, allListings: state.allListings}
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
