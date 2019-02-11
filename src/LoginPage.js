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
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

class LoginPage extends React.Component {

  state = {
    user: "",
    open: true,
    password: "",
    username: "",
    signUp: false,
    name: "",
    email: "",
    showPassword: false
  }


  componentDidMount = () =>{
    // if (localStorage.token){
    //   this.setUser()
    // }
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
      })
    }

    signUpUser = (e) =>{
      e.preventDefault()
      fetch("http://localhost:3000/api/v1/users/",{
        method: "POST",
        headers: {"Content-Type": "application/json", Accept: "application/json"},
        body: JSON.stringify({user:{
          username: this.state.username,
          password: this.state.password,
          name: this.state.name,
          email: this.state.email
        }})
      })
      .then(res => res.json())
      .then(data=> data.token? (this.setState({user: data.user},localStorage.setItem("token", data.token))):null)
      .then(r =>r===null?null:this.props.setCurrentUser(this.state.user))
      .then(reset => this.setState({open: false}))

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
    .then(r => r===null?alert("Wrong Password"): (this.props.toggleLogin?this.props.toggleLogin():null))

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
      {!this.state.open && this.props.toggleLogin?(this.props.toggleLogin() ):null}
      {!this.state.open?this.props.history.push("/home"):null}


        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
        <DialogActions>
        <Button style={{align: "right"}} onClick={()=>this.setState({signUp: !this.state.signUp})} color="primary">
          {!this.state.signUp?"Sign up":"Log in"}
        </Button>
        </DialogActions>
          <DialogTitle id="form-dialog-title" align="center">{!this.state.signUp?"Log in":"Sign Up"}</DialogTitle>
          <DialogContent >
            <DialogContentText>
              {!this.state.signUp?"Please login here or click sign up to create a new account":"Please sign up here or click login if you already have an account"}
            </DialogContentText>

            {this.state.signUp?(
              <React.Fragment>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="name"
                value={this.state.name}
                onChange={this.handleChange('name')}
                fullWidth
              />
               <TextField
                  autoFocus
                  margin="dense"
                  id="email"
                  label="Email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                  fullWidth
                />
                </React.Fragment>
            ):null}



            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Username"
              type="username"
              value={this.state.username}
              onChange={this.handleChange('username')}
              fullWidth
            />
            <TextField

              margin="dense"
              id="pass"
              ref="password"
              label="Password"
              type={this.state.showPassword?"text":"password"}
              value={this.state.password}
              onChange={this.handleChange('password')}
              fullWidth
              InputProps={{
                endAdornment: <IconButton
                aria-label="Toggle password visibility"
                onClick={()=>this.setState({showPassword: !this.state.showPassword})}
                >
                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              }}
            />
          </DialogContent>
          <DialogActions type="form">
            <Button type="submit" onClick={this.state.signUp?this.signUpUser:this.loginUser} color="primary">
              Submit
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

// LoginPage.propTypes = {
//   classes: PropTypes.object.isRequired,
//   }

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(LoginPage))
