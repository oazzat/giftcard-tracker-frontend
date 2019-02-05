import React from 'react'
import {NavLink} from "react-router-dom"
import LoginPage from './LoginPage'
import {connect} from "react-redux"
import {resetCurrentUser} from './actions/appActions'
import {Redirect} from 'react-router-dom'
import Buy from './Buy'
import Sell from './Sell'
import Profile from './Profile'

class NavBar extends React.Component{

logOut = () =>{
  this.props.resetCurrentUser()
  return <Redirect to='/home' />
}

  render(){
    return(
      <div>

        {!this.props.loggedIn?<NavLink to="/login" >LOGIN</NavLink>:<button onClick={this.logOut}>LOG OUT</button>}
        {<NavLink to='/buy' >Buy</NavLink>}
        {<NavLink to='/sell' >Sell</NavLink>}
        {this.props.loggedIn?<NavLink to='/profile' >Profile</NavLink>:null}
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  // console.log(state.state.showLogin);
  return{
      user: state.state.user,
      loggedIn: state.state.loggedIn,
      showLogin: state.state.showLogin
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    resetCurrentUser: ()=>dispatch(resetCurrentUser())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(NavBar)

// {this.props.loggedIn?<button onClick={this.props.resetCurrentUser()}>LOG OUT</button>:<button onClick={this.toggleLogin}>LOG IN</button>}
// {this.state.showLogin? <LoginPage removeLogin={this.removeLogin} toggleLogin={this.toggleLogin}/>: null}
