import React from 'react'
import {getCurrentUser} from "./thunks/mainThunk"
import {getBestSellers} from './thunks/mainThunk'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'

class Home extends React.Component {

  componentDidMount = () =>{

    if (localStorage.token){
      this.props.getCurrentUser()
    }
    this.props.getBestSellers()

  }

  topSellingCards = () =>{
    // console.log(this.props.topSelling)
      return this.props.topSelling.map(obj=><li key={obj.img}><img style={{width: 300, height: 200}} src={obj.img} />{Object.keys(obj)[0]} = {Object.values(obj)[0]}</li>)
    }


  render(){
    return(
      <div style={{position: "sticky", marginTop: "65px" ,marginBottom:"0",backgroundColor: "burlywood"}}>
        <br></br>
        <h2 style={{color: "ivory"}}>Best Selling Giftcards:</h2>
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
          getBestSellers: () => dispatch(getBestSellers())}

}

const mapStateToProps = state =>{
  return {allCards: state.allCards, allListings: state.allListings, topSelling: state.topSelling}
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)
