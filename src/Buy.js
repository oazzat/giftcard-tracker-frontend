import React from 'react'
import {getCurrentUser} from "./thunks/mainThunk"
import {connect} from 'react-redux'

class Buy extends React.Component {

  componentDidMount = () =>{

    this.props.getCurrentUser()
  }

  displayCards = () =>{

  }

  render(){
    return(
      <div>
        Buy Gift Cards
        {this.displayCards()}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {getCurrentUser: () => dispatch(getCurrentUser())}

}

const mapStateToProps = (state) =>{
  return {allCards: state.state.getCards}
}

export default connect(null,mapDispatchToProps)(Buy)
