import React from 'react'
import moment from 'moment'
import {createListing} from "./thunks/mainThunk"
import {connect} from "react-redux"

class Card extends React.Component{

state={
  clicked: false,
  toggleForm: false,
  price: this.props.card.balance*.8

}

componentDidMount = () =>{
  if (this.props.listing){
    console.log(this.props);
  }
}

toggleForm = () =>{
  this.setState({toggleForm: !this.state.toggleForm})
}

changeHandler = (e) =>{
  if (e.target.value <= this.props.card.balance && e.target.value >0){
  this.setState({
    [e.target.name]: e.target.value
  })
  }
}

handleSubmit = (e) =>{
  e.preventDefault()
  let newListing = {
    price: this.state.price,
    giftcard_id: this.props.card.id,
    user_id: this.props.card.user_id,
    date_sold: null,
    date_posted: moment().format("YYYY-MM-DD"),
    prev_user: null
  }
  this.props.createListing(newListing)
}

showDetails = () =>{
  return (
    <div>
      <p>Balance: ${this.props.card.balance}</p>
      <p>Exp Date: {this.props.card['exp_date']}</p>
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

  render(){

    return(
      <div>
      <img src={this.props.card.img} onClick={this.handleClick}/>
      {this.state.clicked?this.showDetails():null}
      </div>
    )
  }
}

const mapStateToProps = state =>{
  return {allCards: state.allCards}
}

const mapDispatchToProps = (dispatch) =>{
  return {createListing: (listing)=>dispatch(createListing(listing))}
}

export default connect(mapStateToProps,mapDispatchToProps)(Card)
