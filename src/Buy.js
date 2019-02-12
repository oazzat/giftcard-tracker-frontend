import React from 'react'
import moment from 'moment'
import {getCurrentUser, performTransaction} from "./thunks/mainThunk"
import {connect} from 'react-redux'
import {withRouter} from "react-router-dom"
import CardListing from './CardListing'
import GridListContainer from './GridList'
import LoginPage from "./LoginPage"
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Spinner from 'react-spinner-material'

class Buy extends React.Component {

  state = {
    sortedList: [],
    sortBy: "Sort By",
    open: false,
    card: "",
    showLogin: false,
    page: 0,
    loading: true
  }

  componentDidMount = () =>{

    this.props.getCurrentUser()

  }



  // componentDidUpdate = () =>{
  //   this.setState({sortedList: this.props.allListings})
  // }

  displayCards = () =>{
    let newArr = []
    // console.log(this.props.allListings)
    if (this.props.allListings.length > 0 ){
     newArr = this.handleSort()


      newArr = newArr.map(item=>{
      return <li key={item.id}><CardListing buy={"buy"} sold={false}key={item.id} card={item} /></li>
    })

    }
    // console.log(newArr);
    return newArr
  }

  handleSort = (page) =>{
    let newArr = [...this.props.allListings]
    switch (this.state.sortBy) {
      case "ph":
          newArr = newArr.sort((a,b)=>a.listings[0].price > b.listings[0].price?-1:1)
          break
        case "pl":
          newArr = newArr.sort((a,b)=>a.listings[0].price > b.listings[0].price?1:-1)
          break
        case "bh":
          newArr = newArr.sort((a,b)=>a.balance > b.balance?-1:1)
          break
        case "bl":
          newArr = newArr.sort((a,b)=>a.balance > b.balance?1:-1)
          break
        case "eh":
          newArr = newArr.sort((a,b)=>a.exp_date > b.exp_date?1:-1)
          break
        case "el":
          newArr = newArr.sort((a,b)=>a.exp_date > b.exp_date?-1:1)
          break
        // default:
        //   return newArr.slice(page,page+20)
    }

    console.log(newArr);
    return newArr.slice(page,page+20)
  }

  handleSelect = (e) =>{
    this.setState({sortBy: e.target.value, page: 0})
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClick = (card) =>{
    // console.log(card)
    this.setState({open: true, card: card})

  }

  handleShowLogin = () =>{
    if (!this.props.loggedIn){
      this.setState({showLogin: !this.state.showLogin})
    }
    else{
      this.purchaseListing()
    }
  }

  purchaseListing = () => {

    if (this.props.user.balance >= this.state.card.listings[0].price){
      // this.props.performTransaction(listing)
      // console.log(this.state.card);
      let updatedListing = {
        id: this.state.card.listings[0].id,
        date_sold: moment().format("YYYY-MM-DD"),
        prev_user: this.state.card.user_id,
        user_id: this.props.user.id
      }
      this.props.performTransaction(updatedListing)
      this.setState({open: !this.state.open})
    }
    else{
      alert("YOU DON'T HAVE ENOUGH TO PURCHASE THIS GIFTCARD!");
    }
  }

  hideBuy = (id) =>{
    // this.setState({showLogin: false})
    if (id === this.props.user.id){
    this.setState({open: false})
  }
  }

  render(){
    // console.log("PROPS",this.props);
    // console.log("STATE in buy",this.state);
    return(
      <div>
        <h2 >Buy Gift Cards:</h2>
        <Select value={this.state.sortBy} onChange={this.handleSelect}>
        <MenuItem value={"Sort By"}>Sort By</MenuItem>
        <MenuItem value={"ph"}>Price High to Low</MenuItem>
        <MenuItem value={"pl"}>Price Low to High</MenuItem>
        <MenuItem value={"bh"}>Balance High to Low</MenuItem>
        <MenuItem value={"bl"}>Balance Low to High</MenuItem>
        <MenuItem value={"eh"}>Expiration Date Earliest to Latest</MenuItem>
        <MenuItem value={"el"}>Expiration Date Latest to Earliest</MenuItem>
        </Select><br></br><br></br>

        {this.props.allListings.length<1?<div style={{display: "block", marginLeft: "auto", marginRight: "auto",marginTop: "5%", width: "16%",align:'middle'}}>
        <Spinner size={180} spinnerColor={"blue"} spinnerWidth={5} visible={this.props.allListings.length>0?false:true} />
        </div>:null}

        <GridListContainer handleClick={this.handleClick} listings={this.handleSort(this.state.page)}></GridListContainer>
        {this.state.page-20 >= 0 ?<Button onClick={()=>this.setState({page: this.state.page-20},window.scrollTo(0,0))} color="inherit">
          Previous Page
        </Button>:null}
        {this.state.page+20 <= this.props.allListings.length?<Button onClick={()=>this.setState({page: this.state.page+20},window.scrollTo(0,0))} color="inherit">
          Next Page
        </Button>:null}

        {this.state.open?(<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" align="center">Buy</DialogTitle>
          <DialogContent >
            <DialogContentText>
              Are you sure you want to purchase this giftcard?
            </DialogContentText><br></br>

              {this.state.open?<img style={{display: "block", marginLeft: "auto", marginRight: "auto", height: "auto", width: "50%", maxWidth: "80%"}}src={this.state.card.store.img}/>:null}

              <h3>Balance: ${this.state.card.balance}</h3>
              <h5>Store: {this.state.card.store.name}</h5>
              <h5>Expiration Date: {this.state.card.exp_date}</h5>

          </DialogContent>
          <DialogActions type="form">
            <Button type="submit" onClick={this.handleShowLogin} color="primary">
              Buy Now
            </Button>

          </DialogActions>
        </Dialog>):null}

        {this.state.showLogin && !this.props.loggedIn?<LoginPage show={this.handleShowLogin} card={this.state.card} buy={true} hideBuy={this.hideBuy}/>:null}

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {getCurrentUser: () => dispatch(getCurrentUser()),
          performTransaction: (listing) =>dispatch(performTransaction(listing))}

}

const mapStateToProps = (state) =>{
  return {allListings: state.loggedIn?state.allListings.filter(listing=>listing.user_id !== state.user.id):state.allListings, loggedIn: state.loggedIn, user: state.user, userCards: state.userCards}
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Buy))
