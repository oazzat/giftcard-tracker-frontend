import React from 'react'
import {getCurrentUser} from "./thunks/mainThunk"
import {getBestSellers} from './thunks/mainThunk'
import {filteredForSale} from "./actions/appActions"
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import {withRouter} from 'react-router-dom'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography';

class Home extends React.Component {

  componentDidMount = () =>{

    if (localStorage.token){
      this.props.getCurrentUser()
    }
    this.props.getBestSellers()

  }

  handleClick = (e) =>{
    let filtered = this.props.allListings.filter(listing=>{
      return listing.store.name === e.target.name
    })
    // console.log("HOME", filtered)
    this.props.filteredForSale(filtered, e.target.name)
    this.props.history.push('/buy')


  }

  topSellingCards = () =>{
    // console.log(this.props.topSelling)
      return this.props.topSelling.map(obj=><div key={obj.img}><img name={Object.keys(obj)[0]} onClick={this.handleClick} style={{width: 300, height: 200}} src={obj.img} />{/*Object.keys(obj)[0]} = {Object.values(obj)[0]*/}<br></br><br></br></div>)
    }


  render(){
    return(
      <div style={{position: "sticky", marginTop: "65px" ,marginBottom:"0",backgroundColor: "burlywood"}}>
        <br></br>

        <h1 style={{color: "#3F51B5"}}>Welcome to Giftcard Wallet!</h1>
        <br></br>
        {/*<h4 style={{textAlign: 'left', marginLeft: '20px',color: "#3F51B5"}}>You can BUY giftcards for cheaper!</h4>
        <h4 style={{textAlign: 'left',marginLeft: '20px',color: "#3F51B5"}}>You can SELL your unwanted giftcards!</h4>
        <h4 style={{textAlign: 'left',marginLeft: '20px',color: "#3F51B5"}}>Keep track of all your giftcards and never let them expire or go unused!</h4>*/}

        <Typography variant="h6" style={{textAlign: 'left', marginLeft: '20px',color: "#3F51B5"}}>
              You can BUY giftcards for cheaper!<br></br><br></br>You can SELL your unwanted giftcards!<br></br><br></br>Keep track of all your giftcards and never let them expire or go unused!
          </Typography>

        <div>
        {/*<h2 style={{textAlign:'left',marginLeft: '20px',color: "#3F51B5"}}>Best selling giftcards:</h2>*/}
        <br></br><h1 style={{color: "#3F51B5"}}>Best Selling Giftcards:</h1>
        {this.topSellingCards()}
        </div>
        <br></br>
        {this.props.topSelling.length>0?<BottomNavigation style={{backgroundColor: "#3F51B5"}}></BottomNavigation>:null}
        <br></br>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {getCurrentUser: () => dispatch(getCurrentUser()),
          getBestSellers: () => dispatch(getBestSellers()),
          filteredForSale: (filteredList) => dispatch(filteredForSale(filteredList))}

}

const mapStateToProps = state =>{
  return {allCards: state.allCards, allListings: state.allListings, topSelling: state.topSelling, filteredList: state.filteredList}
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Home))
