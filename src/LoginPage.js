import React from 'react'
import {NavLink, Redirect} from "react-router-dom"
import {connect} from 'react-redux'
import {removeLogin, setCurrentUser} from './actions/appActions'

class LoginPage extends React.Component {

  state = {
    show: false,
    user: ""
  }

  componentDidMount = () =>{
    if (localStorage.token){
      this.setUser()
    }
  }

  componentWillMount = () =>{

  }


  loginUser = (e) =>{
    e.preventDefault()
    fetch("http://localhost:3000/api/v1/login/",{
      method: "POST",
      headers: {"Content-Type": "application/json", Accept: "application/json"},
      body: JSON.stringify({
        username: e.target[0].value,
        password: e.target[1].value
      })
    })
    .then(res=>res.json())
    .then(data=>(this.setState({user: data.user},localStorage.setItem("token", data.token))))
    .then(check => this.setState({show: !this.state.show}))
  }

  checkShowOrNot = () =>{
    if (localStorage.token == null || localStorage.token == "undefined"){
      return true
    }
    else {
      // console.log("false");
      return false
    }
  }

  render(){
    return (this.checkShowOrNot()?(
      <div className="login-popup" >
        <div className="popup_inner" >
        LOGIN
        <form onSubmit={this.loginUser}>
          <input name="username" type="text" placeholder="username"/>
          <br></br>
          <input name="password" type="text" placeholder="password"/>
          <br></br>
          <button type="submit">SUBMIT</button>
        </form>
      </div>
      </div>
    ):

    this.setUser())
  }

  setUser = () =>{
    this.props.setCurrentUser(this.state.user)
    return <Redirect to="/home"/>
  }
}

const mapStateToProps = (state) =>{
  return {loggedIn: state.loggedIn, showLogin: state.showLogin}
}

const mapDispatchToProps = dispatch =>{
  return {removeLogin: ()=>dispatch(removeLogin()),
          setCurrentUser: (user)=>dispatch(setCurrentUser(user))
          }
}

export default connect (mapStateToProps, mapDispatchToProps) (LoginPage)
