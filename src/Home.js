import React from 'react'
import {getCurrentUser} from "./thunks/mainThunk"
import {getBestSellers} from './thunks/mainThunk'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'

class Home extends React.Component {

  componentDidMount = () =>{

    this.props.getCurrentUser()
    this.props.getBestSellers()

  }

  topSellingCards = () =>{

      return this.props.topSelling.map(obj=><li>{Object.keys(obj)[0]} = {Object.values(obj)[0]}</li>)
    }


  render(){
    return(
      <div>
        <h2>Home Page</h2>

        BEST SELLING CARDS:

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
