import React from 'react'
import {getCurrentUser, getUserCards, createListing} from "./thunks/mainThunk"
import {connect} from 'react-redux'
import moment from "moment"
import Card from "./Card"
import {Redirect} from 'react-router-dom'
import CardListing from './CardListing'
import LoginPage from './LoginPage'
import GridListContainer from "./GridList"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment'

class Sell extends React.Component {

  state ={
    open: false,
    price: "",
    card: ""
  }

  componentDidMount = () =>{

    this.props.getCurrentUser()
    if (this.props.loggedIn){
      this.props.getUserCards()
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => (e) =>{
    if(e.target.value <= this.state.card.balance && e.target.value >0){
      this.setState({
        [name]: e.target.value
      })
    }
  }

  createListing = ()=>{
    let listing = {
      price: this.state.price,
      date_posted: moment().format("YYYY-MM-DD"),
      giftcard_id: this.state.card.id,
      user_id: this.state.card.user_id,
      prev_user: null,
      date_sold: null
    }
    this.props.createListing(listing)

    this.setState({open: !this.state.open})
  }

  handleClick = (card) =>{
    console.log(card)
    this.setState({open: true, card: card, price: card.balance*.8})

  }

  render(){

      return (this.props.loggedIn?
      <div>
        <h2>Choose Card to Sell: </h2>
        <GridListContainer toSell={true} handleClick={this.handleClick} cards={this.props.userCards}></GridListContainer>
        {this.state.open?(<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" align="center">Sell</DialogTitle>
          <DialogContent >
            <DialogContentText>
              Confirm you want to put this card for sale and enter the price you want
            </DialogContentText><br></br>

              {this.state.open?<img style={{display: "block", marginLeft: "auto", marginRight: "auto", height: "auto", width: "50%", maxWidth: "80%"}}src={this.state.card.store.img}/>:null}

              <h3>Balance: ${this.state.card.balance}</h3>
              <h5>Store: {this.state.card.store.name}</h5>
              <h5>Expiration Date: {this.state.card.exp_date}</h5>

              <React.Fragment>
              <TextField
                autoFocus
                margin="dense"
                id="price"
                label="Price"
                type="number"
                value={this.state.price}
                onChange={this.handleChange('price')}
                onKeyDown={(e)=>e.key==="e" || e.key==="E"?e.preventDefault():null}
                fullWidth
                InputProps={{
                              startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
              />

                </React.Fragment>

          </DialogContent>
          <DialogActions type="form">
            <Button type="submit" onClick={this.createListing} color="primary">
              Sell Now
            </Button>

          </DialogActions>
        </Dialog>):null}
      </div>
    :<LoginPage/>)

  }
}

const mapDispatchToProps = (dispatch) => {
  return {getCurrentUser: () => dispatch(getCurrentUser()),
          getUserCards: () => dispatch(getUserCards()),
          createListing: (listing)=>dispatch(createListing(listing))}

}

const mapStateToProps = state =>{
  // console.log("MAP STATE",state);
  return {allCards: state.allCards,
          user: state.user,
          loggedIn: state.loggedIn,
          // allListings: state.allListings,
          userCards: state.userCards.length>0?(state.userCards.filter(listing=>listing.listed===false)):[],
          allListings: state.allListings
        }
}

export default connect(mapStateToProps,mapDispatchToProps)(Sell)
