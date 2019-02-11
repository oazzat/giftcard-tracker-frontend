import React from 'react'
import moment from "moment"
import {createListing} from "./thunks/mainThunk"
import {connect} from 'react-redux'

class CardListing extends React.Component{

state={
  clicked: false,
  toggleForm: false,
  // price: this.props.card.balance*.8
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

  return this.props.profile?(
    <div>
      <p>Balance: ${this.props.listing.giftcard.balance}</p>
      <p>Exp Date: {this.props.listing.giftcard.exp_date}</p>
      <p>Date Posted: {this.props.listing['date_posted']}</p>
      <br></br>
    </div>

  ):this.props.buy?(
    <div>
      <p>Balance: ${this.props.card.balance}</p>
      <p>Exp Date: {this.props.card.exp_date}</p>
      {/*!this.props.sell?<p>Date Posted: {this.props.listing['date_posted']}</p>:null*/}
      {/*this.props.sell?<button onClick={this.toggleForm} >Sell</button>:null*/}
      {this.state.toggleForm?(
        <form onChange={this.changeHandler} onSubmit={this.handleSubmit}>
          Price: <input name="price" type="number" onChange={this.changeHandler} value={this.state.price}/>
          <button>submit</button>
        </form>
      ):null}<br></br>
    </div>
  ):null

}

handleClick = () =>{
  this.setState({clicked: !this.state.clicked})
}

                                          // handleSubmit = (e) =>{
                                          //   e.preventDefault()
                                          //   let newListing = {
                                          //     price: this.state.price,
                                          //     giftcard_id: this.props.card.id,
                                          //     user_id: this.props.card.user_id,
                                          //     date_sold: this.props.listing.date_sold,
                                          //     date_posted: moment().format("YYYY-MM-DD"),
                                          //     prev_user: this.props.listing.prev_user
                                          //   }
                                          //   this.props.createListing(newListing)
                                          // }

  render(){
    console.log(this.props.listing)

    return(

      <div>
      {this.props.profile?<img style={{width: 300, height: 200}}src={this.props.listing.giftcard.store.img} onClick={this.handleClick}/>
      :<img style={{width: 300, height: 200}}src={this.props.card.store.img} onClick={this.handleClick}/>}
      {/*!this.props.sell?<h3>Price: ${this.props.card.price}</h3>:null*/}
      {this.state.clicked?this.showDetails():null}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {createListing: (listing)=>dispatch(createListing(listing))}
}


export default connect(null,mapDispatchToProps)(CardListing)

// <button onClick={this.toggleForm} >Sell</button>
// {this.state.toggleForm?(
//   <form onChange={this.changeHandler} onSubmit={this.handleSubmit}>
//     {/*Price: <input name="price" type="number" onChange={this.changeHandler} value={this.state.price}/>*/}
//     <button>submit</button>
//   </form>
// ):null}<br></br>
