import React from 'react'
import {getCurrentUser} from "./thunks/mainThunk"
import {getBestSellers} from './thunks/mainThunk'
import {filteredForSale} from "./actions/appActions"
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import {withRouter} from 'react-router-dom'

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
    console.log("HOME", filtered)
    this.props.filteredForSale(filtered, e.target.name)
    this.props.history.push('/buy')


  }

  topSellingCards = () =>{
    // console.log(this.props.topSelling)
      return this.props.topSelling.map(obj=><li key={obj.img}><img name={Object.keys(obj)[0]} onClick={this.handleClick} style={{width: 300, height: 200}} src={obj.img} />{Object.keys(obj)[0]} = {Object.values(obj)[0]}</li>)
    }


  render(){
    return(
      <div style={{position: "sticky", marginTop: "65px" ,marginBottom:"0",backgroundColor: "burlywood"}}>
        <br></br>
        <h2 style={{color: "#3F51B5"}}>Best Selling Giftcards:</h2>
        <br></br>


        <div>
        {this.topSellingCards()}
        </div>
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
