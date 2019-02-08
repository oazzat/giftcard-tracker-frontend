import React from 'react'
import {NavLink, Redirect, withRouter} from "react-router-dom"
import {connect} from 'react-redux'
import {removeLogin, setCurrentUser} from './actions/appActions'
import PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class LoginPage extends React.Component {

  state = {
    user: "",
    open: true,
    password: "",
    username: ""
  }


  componentDidMount = () =>{
    if (localStorage.token){
      this.setUser()
    }
  }

  handleClickOpen = () => {
      this.setState({ open: true });
    };

    handleClose = () => {
      this.setState({ open: false });
    };


    handleChange = name => (e) =>{
      this.setState({
        [name]: e.target.value
      },console.log(this.state))
    }

  loginUser = (e) =>{
    e.preventDefault()

    fetch("http://localhost:3000/api/v1/login/",{
      method: "POST",
      headers: {"Content-Type": "application/json", Accept: "application/json"},
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then(res=>res.json())
    .then(data=> data.token? (this.setState({user: data.user},localStorage.setItem("token", data.token))):null)
    .then(r =>r===null?null:this.props.setCurrentUser(this.state.user))
    .then(r => r===null?alert("Wrong Password"):this.props.toggleLogin())

  }

  // checkShowOrNot = () =>{
  //   if (localStorage.token == null || localStorage.token == "undefined"){
  //     return true
  //   }
  //   else {
  //     // console.log("false");
  //     return false
  //   }
  // }

  render(){



      return (<div>
      {!this.state.open?this.props.toggleLogin():null}

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" align="center">Log in</DialogTitle>
          <DialogContent >
            <DialogContentText>
              Please login here or click sign up to create a new account
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Username"
              type="email"
              value={this.state.username}
              onChange={this.handleChange('username')}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="pass"
              ref="password"
              label="Password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange('password')}
              fullWidth
            />
          </DialogContent>
          <DialogActions type="form">
            <Button type="submit" onClick={this.loginUser} color="primary">
              Submit
            </Button>
            <Button onClick={this.loginUser} color="primary">
              Sign up
            </Button>
          </DialogActions>
        </Dialog>
      </div>)


  }}

const mapStateToProps = (state) =>{
  return {loggedIn: state.loggedIn, showLogin: state.showLogin}
}

const mapDispatchToProps = dispatch =>{
  return {removeLogin: ()=>dispatch(removeLogin()),
          setCurrentUser: (user)=>dispatch(setCurrentUser(user))
          }
        }

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  }

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(LoginPage))
