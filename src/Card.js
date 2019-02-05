import React from 'react'

class Card extends React.Component{

state={
  clicked: false
}

showDetails = () =>{
  return (
    <div>
      <p>Balance: ${this.props.card.balance}</p>
      <p>Exp Date: {this.props.card['exp_date']}</p>
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

export default Card
