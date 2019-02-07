import React from 'react'
import moment from "moment"
import {createListing} from "./thunks/mainThunk"
import {connect} from 'react-redux'

class CardListing extends React.Component{

state={
  clicked: false,
  toggleForm: false,
  price: this.props.card.balance*.8
}

toggleForm = () =>{
  this.setState({toggleForm: !this.state.toggleForm})
}

componentDidMount = () =>{
  console.log(this.props);
}

changeHandler = (e) =>{
  if (e.target.value <= this.props.card.balance && e.target.value >0){
  this.setState({
    [e.target.name]: e.target.value
  })
  }
}

showDetails = () =>{
  return (
    <div>
      <p>Balance: ${this.props.listing.giftcard.balance}</p>
      <p>Exp Date: {this.props.listing.giftcard['exp_date']}</p>
      {!this.props.sell?<p>Date Posted: {this.props.listing['date_posted']}</p>:null}
      {this.props.sell?<button onClick={this.toggleForm} >Sell</button>:null}
      {this.state.toggleForm?(
        <form onChange={this.changeHandler} onSubmit={this.handleSubmit}>
          Price: <input name="price" type="number" onChange={this.changeHandler} value={this.state.price}/>
          <button>submit</button>
        </form>
      ):null}<br></br>
    </div>
  )
}

handleClick = () =>{
  this.setState({clicked: !this.state.clicked})
}

handleSubmit = (e) =>{
  e.preventDefault()
  let newListing = {
    price: this.state.price,
    giftcard_id: this.props.card.id,
    user_id: this.props.card.user_id,
    date_sold: this.props.listing.date_sold,
    date_posted: moment().format("YYYY-MM-DD"),
    prev_user: this.props.listing.prev_user
  }
  this.props.createListing(newListing)
}

  render(){
    return(
      <div>
      <img src={this.props.listing.giftcard.img} onClick={this.handleClick}/>
      {!this.props.sell?<h3>Price: ${this.props.listing.price}</h3>:null}
      {this.state.clicked?this.showDetails():null}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {createListing: (listing)=>dispatch(createListing(listing))}
}


export default connect(null,mapDispatchToProps)(CardListing)
