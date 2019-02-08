import React from 'react'
import {NavLink} from "react-router-dom"
import LoginPage from './LoginPage'
import {connect} from "react-redux"
import {resetCurrentUser} from './actions/appActions'
import {Redirect, withRouter} from 'react-router-dom'
import Buy from './Buy'
import Sell from './Sell'
import Profile from './Profile'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
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

// export default withStyles(styles)(ButtonAppBar);

class NavBar extends React.Component{

state = {
  toggle: false
}

logOut = () =>{
  this.props.resetCurrentUser()
  return this.props.history.push('/home')
}

classes = this.props.classes

toggleLogin = () => this.setState({toggle: !this.state.toggle})

displayLogin = () =><LoginPage toggleLogin={this.toggleLogin}/>

  render(){
    console.log(this.props);
    return(

      <div className={this.props.classes.root}>
        <AppBar position="static" >
          <Toolbar>
            <IconButton className={this.props.classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography align='left' variant="h5" color="inherit" className={this.props.classes.grow}>
              Giftcard Tracker
              <Button color="inherit" align='left' onClick={()=>this.props.history.push('/buy')}>Buy</Button>
              <Button color="inherit" align='left' onClick={()=>this.props.history.push('/sell')}>Sell</Button>
            </Typography>
            {this.props.loggedIn?<Button color='inherit' onClick={()=>this.props.history.push('/profile')}>Profile</Button>:null}
            {!this.props.loggedIn?<Button color="inherit" onClick={() => this.setState({toggle: !this.state.toggle})}>Login</Button>:<Button color='inherit' onClick={this.logOut}>LOG OUT</Button>}
          </Toolbar>
        </AppBar>

        {this.state.toggle?this.displayLogin():null}


      </div>

    )
  }
}

const mapStateToProps = (state) =>{
  // console.log(state.state.showLogin);
  return{
      user: state.user,
      loggedIn: state.loggedIn,
      showLogin: state.showLogin
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    resetCurrentUser: ()=>dispatch(resetCurrentUser())
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(NavBar)))

// {this.props.loggedIn?<button onClick={this.props.resetCurrentUser()}>LOG OUT</button>:<button onClick={this.toggleLogin}>LOG IN</button>}
// {this.state.showLogin? <LoginPage removeLogin={this.removeLogin} toggleLogin={this.toggleLogin}/>: null}
