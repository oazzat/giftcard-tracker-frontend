import React from 'react'
import {NavLink} from "react-router-dom"
import LoginPage from './LoginPage'
import {connect} from "react-redux"
import {resetCurrentUser} from './actions/appActions'
import {updateUserAmount, getAllListings} from './thunks/mainThunk'
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
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';


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
  toggle: false,
  open: false,
  amount: 0
}

logOut = () =>{
  this.props.resetCurrentUser()
  // this.props.getAllListings()
  return this.props.history.push('/home')
}

classes = this.props.classes

toggleLogin = () => this.setState({toggle: !this.state.toggle})

displayLogin = () =><LoginPage toggleLogin={this.toggleLogin}/>

handleChange = (e) => {
  if (e.target.value <= 1000){
  this.setState({amount: e.target.value})
  }
}

handleSubmit = () =>{

  this.props.updateUserAmount(this.props.user.balance + parseFloat(this.state.amount),this.props.user.id)
  this.setState({open: false})
}

displayMoneyReload = () =>{

}

  render(){
    // console.log(this.props);
    return(

      <div className={this.props.classes.root} style={{backgroundColor: "burlywood"}}>
        <AppBar position="fixed"  >
          <Toolbar>
            {/*<IconButton className={this.props.classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>*/}
            <Typography style={{color: "burlywood"}}align='left' variant="h5" color="inherit" className={this.props.classes.grow}>
              Giftcard Wallet
              <Button style={{marginLeft: "10px"}}color="inherit" align='left' onClick={()=>this.props.history.push('/home')}>Home</Button>
              <Button color="inherit" align='left' onClick={()=>this.props.history.push('/buy')}>Buy</Button>
              <Button color="inherit" align='left' onClick={()=>this.props.history.push('/sell')}>Sell</Button>
            </Typography>
            {this.props.loggedIn?<Button onClick={()=>this.setState({open: !this.state.open})}style={{color: "burlywood"}} color='inherit' ><span style={{marginRight: '30px'}}>Current Balance: ${this.props.user.balance}</span></Button>:null}
            {this.props.loggedIn?<Button style={{color: "burlywood"}} color='inherit' onClick={()=>this.props.history.push('/profile')}>Profile</Button>:null}
            {!this.props.loggedIn?<Button style={{color: "burlywood"}} color="inherit" onClick={() => this.setState({toggle: !this.state.toggle})}>Login</Button>:<Button style={{color: "burlywood"}} color='inherit' onClick={this.logOut}>LOG OUT</Button>}
          </Toolbar>
        </AppBar>

        {this.state.toggle?this.displayLogin():null}

        {<Dialog
          open={this.state.open}
          onClose={()=> this.setState({open: !this.state.open})}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" align="center">Add Funds!</DialogTitle>



          <DialogContent >
            <DialogContentText>
              Please enter the amount of money you would like to add to your account up to $1,000
            </DialogContentText>

            <TextField
              autoFocus
              margin="dense"
              id="amount"
              label="Amount"
              type="number"
              name="amount"
              value={this.state.amount}
              onChange={this.handleChange}
              onKeyDown={(e)=>e.key==="e" || e.key==="E"?e.preventDefault():null}
              fullWidth
              InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          }}
            />

          </DialogContent>

          <DialogActions type="form">
          <Button style={{align: "left"}} type="submit" onClick={this.handleSubmit} color="primary">
            Submit
          </Button>

          </DialogActions>

          </Dialog>}


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
    resetCurrentUser: ()=>dispatch(resetCurrentUser()),
    updateUserAmount: (amount, id) =>dispatch(updateUserAmount(amount, id)),
    getAllListings: ()=>dispatch(getAllListings())
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(NavBar)))

// {this.props.loggedIn?<button onClick={this.props.resetCurrentUser()}>LOG OUT</button>:<button onClick={this.toggleLogin}>LOG IN</button>}
// {this.state.showLogin? <LoginPage removeLogin={this.removeLogin} toggleLogin={this.toggleLogin}/>: null}
