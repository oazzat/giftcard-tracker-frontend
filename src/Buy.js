import React from 'react'
import {getCurrentUser} from "./thunks/mainThunk"
import {connect} from 'react-redux'
import CardListing from './CardListing'
import GridListContainer from './GridList'


class Buy extends React.Component {

  componentDidMount = () =>{

    this.props.getCurrentUser()
  }

  displayCards = () =>{
    let newArr = []
    console.log(this.props.allListings)
    if (this.props.allListings.length > 0 ){
     newArr = this.props.allListings


      newArr = newArr.map(item=>{
      return <li key={item.id}><CardListing buy={"buy"} sold={false}key={item.id} card={item} /></li>
    })

    }
    // console.log(newArr);
    return newArr
  }

  render(){

    return(
      <div>
        <h2>Buy Gift Cards:</h2>

        <GridListContainer listings={this.props.allListings}>{this.displayCards()}</GridListContainer>

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {getCurrentUser: () => dispatch(getCurrentUser())}

}

const mapStateToProps = (state) =>{
  return {allListings: state.allListings}
}

export default connect(mapStateToProps,mapDispatchToProps)(Buy)
