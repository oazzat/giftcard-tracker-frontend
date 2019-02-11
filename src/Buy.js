import React from 'react'
import {getCurrentUser} from "./thunks/mainThunk"
import {connect} from 'react-redux'
import CardListing from './CardListing'
import GridListContainer from './GridList'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

class Buy extends React.Component {

  state = {
    sortedList: [],
    sortBy: "Sort By"
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

        <GridListContainer listings={this.handleSort()}></GridListContainer>

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
