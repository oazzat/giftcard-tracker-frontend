import React from 'react'

class CardListing extends React.Component{

state={
  clicked: false
}

showDetails = () =>{
  return (
    <div>
      <p>Balance: ${this.props.listing.giftcard.balance}</p>
      <p>Exp Date: {this.props.listing.giftcard['exp_date']}</p>
      <p>Date Posted: {this.props.listing['date_posted']}</p>
    </div>
  )
}

handleClick = () =>{
  this.setState({clicked: !this.state.clicked})
}

  render(){
    return(
      <div>
      <img src={this.props.listing.giftcard.img} onClick={this.handleClick}/>
      <h3>Price: ${this.props.listing.price}</h3>
      {this.state.clicked?this.showDetails():null}
      </div>
    )
  }
}

export default CardListing
