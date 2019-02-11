import React from 'react'
import {getCurrentUser} from "./thunks/mainThunk"
import {connect} from 'react-redux'
import CardListing from './CardListing'
import GridListContainer from './GridList'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class Buy extends React.Component {

  state = {
    sortedList: [],
    sortBy: "Sort By",
    open: false,
    card: ""
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

  handleSort = () =>{
    let newArr = [...this.props.allListings]
    switch (this.state.sortBy) {
      case "ph":
        return newArr = newArr.sort((a,b)=>a.listings[0].price > b.listings[0].price?-1:1)
      case "pl":
        return newArr = newArr.sort((a,b)=>a.listings[0].price > b.listings[0].price?1:-1)
        case "bh":
          return newArr.sort((a,b)=>a.balance > b.balance?-1:1)
        case "bl":
          return newArr.sort((a,b)=>a.balance > b.balance?1:-1)
        case "eh":
          return newArr.sort((a,b)=>a.exp_date > b.exp_date?1:-1)
        case "el":
          return newArr.sort((a,b)=>a.exp_date > b.exp_date?-1:1)
        break;
      default:
        return this.props.allListings
    }
  }

  handleSelect = (e) =>{
    this.setState({sortBy: e.target.value})
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClick = (card) =>{
    console.log(card)
    this.setState({open: true, card: card})

  }

  purchaseListing = () => {
    //check if logged in and has enough money
  }

  render(){
    // console.log("PROPS",this.props);
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
        </Select><br></br>

        <GridListContainer handleClick={this.handleClick} listings={this.handleSort()}></GridListContainer>

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
            <Button type="submit" onClick={this.purchaseListing} color="primary">
              Buy Now
            </Button>

          </DialogActions>
        </Dialog>):null}

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {getCurrentUser: () => dispatch(getCurrentUser())}

}

const mapStateToProps = (state) =>{
  return {allListings: state.allListings, loggedIn: state.loggedIn}
}

export default connect(mapStateToProps,mapDispatchToProps)(Buy)
