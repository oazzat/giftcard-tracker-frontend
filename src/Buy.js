import React from 'react'
import {getCurrentUser} from "./thunks/mainThunk"
import {connect} from 'react-redux'
import CardListing from './CardListing'

class Buy extends React.Component {

  componentDidMount = () =>{

    this.props.getCurrentUser()
  }

  displayCards = () =>{
    let newArr = []
    // console.log(this.props.allListings.length)
    if (this.props.allListings.length > 0 && this.props.allListings[0].giftcard){

     newArr = this.props.allListings.filter(listing => {
      return listing['date_sold'] === null
    })


      newArr = newArr.map(item=>{
      return <li key={item.id}><CardListing key={item.id} listing={item} /></li>
    })

    }
    // console.log(newArr);
    return newArr
  }

  render(){
    return(
      <div>
        <h2>Buy Gift Cards:</h2>
        <ul>
        {this.displayCards()}
        </ul>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {getCurrentUser: () => dispatch(getCurrentUser())}

}

const mapStateToProps = (state) =>{
  return {allListings: state.state.allListings}
}

export default connect(mapStateToProps,mapDispatchToProps)(Buy)
