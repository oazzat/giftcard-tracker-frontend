import React from 'react'
import moment from 'moment'
import {getCurrentUser, performTransaction, getAllListings, getUserForSale} from "./thunks/mainThunk"
import {filteredForSale} from "./actions/appActions"
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
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import BottomNavigation from '@material-ui/core/BottomNavigation'

class Buy extends React.Component {

  state = {
    sortBy: "Sort By",
    searchBy: "",
    open: false,
    card: "",
    showLogin: false,
    page: 0,
    loading: true
  }

  componentDidMount = () =>{

    if (this.props.loggedIn){
    this.props.getCurrentUser()
    // this.setState({searchBy: this.props.searchBy})
    // this.props.getAllListings()
    this.props.getUserForSale()
  }
  }

  componentWillUnmount = () =>{
    this.props.filteredForSale(this.props.allListings,"")
  }

  filterTheList = ()=>{
    let newFilter = this.props.allListings.filter(listing=>!listing.hasExpired)
    newFilter = newFilter.filter(listing=>{
      return this.props.loggedIn?(listing.store.name.toLowerCase().includes(this.state.searchBy.toLowerCase()) && listing.user_id != this.props.user.id)
      :
      (listing.store.name.toLowerCase().includes(this.state.searchBy.toLowerCase()))
    })

    this.props.filteredForSale(newFilter)
  }

  displayCards = () =>{
    let newArr = []
    // console.log(this.props.allListings)
    if (this.props.filteredList.length > 0 ){
     newArr = this.handleSort()


      newArr = newArr.map(item=>{
      return <li key={item.id}><CardListing buy={"buy"} sold={false}key={item.id} card={item} /></li>
    })

    }
    // console.log(newArr);
    return newArr
  }

  handleSort = (page) =>{
    let newArr = [...this.props.filteredList]
    switch (this.state.sortBy) {
      case "ph":
          newArr = newArr.sort((a,b)=>a.listings[a.listings.length-1].price > b.listings[b.listings.length-1].price?-1:1)
          break
        case "pl":
          newArr = newArr.sort((a,b)=>a.listings[a.listings.length-1].price > b.listings[b.listings.length-1].price?1:-1)
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

    // console.log(newArr);
    return newArr.slice(page,page+20)
  }

  handleSearch = (e) =>{
    this.setState({searchBy: e.target.value},this.filterTheList)
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

    if (this.props.user.balance >= this.state.card.listings[this.state.card.listings.length-1].price){
      // this.props.performTransaction(listing)
      // console.log(this.state.card);
      let updatedListing = {
        id: this.state.card.listings[this.state.card.listings.length-1].id,
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

  bottomNavBar = () =>{
    if (this.state.page-20 >= 0 || this.state.page+20 <= this.props.filteredList.length){
    return <BottomNavigation style={{backgroundColor: "#3F51B5"}}>

    {this.state.page-20 >= 0 ?<Button style={{color: "burlywood"}} onClick={()=>this.setState({page: this.state.page-20},window.scrollTo(0,0))} color='inherit'>
      Previous
    </Button>:null}
    {this.state.page+20 <= this.props.filteredList.length?<Button style={{color: "burlywood"}} onClick={()=>this.setState({page: this.state.page+20},window.scrollTo(0,0))} color="inherit">
      Next
    </Button>:null}

    </BottomNavigation>}
    else{return null}
  }

  render(){

    // console.log("PROPS",this.props);
    // console.log("STATE in buy",this.state);
    return(
      <div style={{position: "sticky",  marginTop: "65px" ,marginBottom:"0",backgroundColor: "burlywood"}}>
        <br></br>
        <h2 style={{color: "#3F51B5"}}>Buy Gift Cards:</h2>
        <Select style={{color: "#3F51B5"}} value={this.state.sortBy} onChange={this.handleSelect}>
        <MenuItem value={"Sort By"}>Sort By</MenuItem>
        <MenuItem value={"ph"}>Price High to Low</MenuItem>
        <MenuItem value={"pl"}>Price Low to High</MenuItem>
        <MenuItem value={"bh"}>Balance High to Low</MenuItem>
        <MenuItem value={"bl"}>Balance Low to High</MenuItem>
        <MenuItem value={"eh"}>Expiration Date Earliest to Latest</MenuItem>
        <MenuItem value={"el"}>Expiration Date Latest to Earliest</MenuItem>
        </Select>

        <br></br><br></br>

        <TextField
        style ={{color: '#3F51B5'}}
        placeholder={"     Search by store..."}
        value={this.props.searchBy}
        onChange={this.handleSearch}
        />

        <br></br><br></br>

        {this.props.filteredList.length<1?<div style={{display: "block", marginLeft: "auto", marginRight: "auto",marginTop: "5%", width: "16%",align:'middle'}}>
        <Spinner size={180} spinnerColor={"#3F51B5"} spinnerWidth={5} visible={this.props.allListings.length>0?false:true} />
        </div>:null}

        <GridListContainer handleClick={this.handleClick} listings={this.handleSort(this.state.page)}></GridListContainer>
        <br></br><br></br>


        {this.state.open?(<Dialog
          style={{backgroundColor: "rgb(63,81,181,.2)"}}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"

          color="#3F51B5"
        >

          <DialogTitle id="form-dialog-title" style={{backgroundColor: "rgb(63,81,181,.2)"}} align="center"><span  style={{fontWeight: "bold"}}>Buy</span></DialogTitle>
          <DialogContent style={{ backgroundColor: "rgb(63,81,181,.2)"}}>
            <DialogContentText align="center">
              Are you sure you want to purchase this giftcard?
            </DialogContentText><br></br>

              {this.state.open?<img style={{display: "block", marginLeft: "auto", marginRight: "auto", height: "auto", width: "50%", maxWidth: "80%"}}src={this.state.card.store.img}/>:null}

              <h3 style={{textAlign: "center"}}>Price: ${this.state.card.listings[this.state.card.listings.length-1].price}</h3>
              <h4>Balance: ${this.state.card.balance}</h4>
              <h5>Store: {this.state.card.store.name}</h5>
              <h5>Expiration Date: {moment(this.state.card.exp_date).format("MM-DD-YYYY")}</h5>

          </DialogContent>
          <div style={{ backgroundColor: "rgb(63,81,181,.2)"}}>
          <DialogActions  type="form">
            <Button  style={{ backgroundColor: "rgb(222,183,135,.5)"}} type="submit" onClick={this.handleShowLogin} color="black">
              Buy Now
            </Button>
          </DialogActions>
          </div>
        </Dialog>):null}

        {this.state.showLogin && !this.props.loggedIn?<LoginPage show={this.handleShowLogin} card={this.state.card} buy={true} hideBuy={this.hideBuy}/>:null}

        {this.bottomNavBar()}
        <br></br>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {getCurrentUser: () => dispatch(getCurrentUser()),
          performTransaction: (listing) =>dispatch(performTransaction(listing)),
          filteredForSale: (list)=>dispatch(filteredForSale(list)),
          getAllListings: ()=>dispatch(getAllListings()),
        getUserForSale: ()=>dispatch(getUserForSale())}

}

const mapStateToProps = (state) =>{
  return {filteredList: state.filteredList.filter(listing=>!listing.hasExpired),searchBy: state.searchBy, allListings: state.loggedIn?state.allListings.filter(listing=>listing.user_id !== state.user.id):state.allListings, loggedIn: state.loggedIn, user: state.user, userCards: state.userCards}
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Buy))
