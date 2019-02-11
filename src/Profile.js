import React from 'react'
import {getCurrentUser, createCard, getUserCards, getUserSold, getUserPurchased, getUserForSale, getStores} from "./thunks/mainThunk"

import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import CardListing from './CardListing'
import Card from './Card'
import moment from 'moment'
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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import GridListContainer from './GridList'


class Profile extends React.Component {

  state = {
    card_type: "Amazon",
    exp_date: moment().format("YYYY-MM-DD"),
    barcode: "",
    passcode: "",
    balance: "",
    img: "",
    user_id: this.props.user.id,
    listed: false,
    date_verified: null,
    open: false,
    showPassword: false,
    store: {id: 1, name: "Best-Buy", img: "https://us4products.nimblecommerce.com/api/v1/images/17015/skin"}
  }

  componentDidMount = () =>{
    this.props.getStores()
    this.props.getCurrentUser()
    this.props.getUserCards()
    this.props.getUserSold()
    this.props.getUserPurchased()
    this.props.getUserForSale()



  }




  getListings = () =>{
    if (this.props.userForSale.length > 0 ){
      return this.props.userForSale.map(listing=>{
          return <CardListing profile={"profile"} key={listing.id} canList={false} listing={listing}/>
        })
    }
  }

  getPurchased = () =>{
    if (this.props.userPurchased.length > 0 ){
      return this.props.userPurchased.map(listing=>{
          return <CardListing profile={"profile"} key={listing.id} canList={true} listing={listing}/>
        })
    }
  }

  getSold = () =>{
      if (this.props.userSold.length > 0 ){
        return this.props.userSold.map(listing=>{
            return <CardListing profile={"profile"} key={listing.id} canList={false} sold={true} listing={listing}/>
          })
      }
  }

  getUserCards = () =>{
      if (this.props.userCards.length > 0){
        return this.props.userCards.map(card=>{
            return <Card key={card.id}  canList={true}card={card}/>
          })
      }
  }

  handleSubmit = (e) =>{
    e.preventDefault()
    this.setState({img: this.props.images[this.state.card_type],user_id: this.props.user.id},()=>{
      this.props.createCard(this.state)
    })

  }

  changeHandler = (e) =>{

    if ([e.target.name] === "store"){
      let newStore = {...e.target.value}
      this.setState({[e.target.name]: newStore})
    }
    else{
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  }

  addCard = () =>{

    this.props.createCard({
      exp_date: this.state.exp_date,
      store_id: this.state.store.id,
      balance: this.state.balance,
      listed: false,
      barcode: this.state.barcode,
      passcode: this.state.passcode,
      user_id: this.props.user.id

    })
    this.setState({open: !this.state.open})
  }


  render(){
    console.log("STATE",this.state);

    if (localStorage.token!=undefined || !localStorage.length === 0){
      return (
        <div>
        <h2>Profile Page</h2>

          <Button onClick={()=>this.setState({open: !this.state.open})} color='inherit'>Add Card to Profile:</Button>

        <Dialog
          open={this.state.open}
          onClose={()=> this.setState({open: !this.state.open})}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" align="center">Add a Giftcard!</DialogTitle>



          <DialogContent >
            <DialogContentText>
              Please enter all of your giftcard information below and submit to have the card added to your profile
            </DialogContentText>


            <br></br><InputLabel htmlFor="filled-age-simple">Store</InputLabel><br></br>
          <Select
            value={this.state.store}
            onChange={this.changeHandler}
            input={<FilledInput name="store" id="filled-age-simple" />}
          >

          {this.props.allStores.map(store => <MenuItem key={store.id} value={store} >{store.name}</MenuItem>)}

          </Select><br></br><br></br>

            <TextField
               autoFocus
               margin="dense"
               id="exp_date"
               name= "exp_date"
               label="Exp Date"
               type="date"
               value={this.state.exp_date}
               onChange={this.changeHandler}
               fullWidth
             />

              <TextField
                autoFocus
                margin="dense"
                id="barcode"
                label="Barcode"
                name="barcode"
                type="text"
                value={this.state.barcode}
                onChange={this.changeHandler}
                fullWidth
              />
               <TextField
                  autoFocus
                  margin="dense"
                  id="passcode"
                  name= "passcode"
                  label="Passcode"
                  type="text"
                  value={this.state.passcode}
                  onChange={this.changeHandler}
                  fullWidth
                />

            <TextField
              autoFocus
              margin="dense"
              id="balance"
              label="Balance"
              type="number"
              name="balance"
              value={this.state.balance}
              onChange={this.changeHandler}
              onKeyDown={(e)=>e.key==="e" || e.key==="E"?e.preventDefault():null}
              fullWidth
              InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          }}
            />

          </DialogContent>

          <DialogActions type="form">
          <Button style={{align: "left"}} type="submit" onClick={this.addCard} color="primary">
          Add Card!
          </Button>

          </DialogActions>

          </Dialog>







        <div>
        All My Current Cards:
        <GridListContainer cards={this.props.userCards}></GridListContainer>
        </div>

        <div>
        My Sold Cards:
        {this.getSold()}
        </div>

        <div>
        My Purchased Cards:
        {this.getPurchased()}
        </div>

        <div>
        My Listings:
        {this.getListings()}
        </div>

        </div>
      )
    }
    else{
    return <Redirect to='/home'/>
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {getCurrentUser: () => dispatch(getCurrentUser()),
          createCard: (newCard) => dispatch(createCard(newCard)),
          getUserCards: ()=>dispatch(getUserCards()),
          getUserSold: ()=>dispatch(getUserSold()),
          getUserPurchased: ()=>dispatch(getUserPurchased()),
          getUserForSale: ()=>dispatch(getUserForSale()),
          getStores: ()=>dispatch(getStores())
          }

}

const mapStateToProps = (state =>{
  return {loggedIn: state.loggedIn,
          allListings: state.allListings,
          allStores: state.allStores,
          user: state.user,
          allCards: state.allCards,
          images: state.images,
          userCards: state.userCards,
          userSold: state.userSold,
          userPurchased: state.userPurchased,
          userForSale: state.userForSale
        }
})

export default connect(mapStateToProps,mapDispatchToProps)(Profile)
