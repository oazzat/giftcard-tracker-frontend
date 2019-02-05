import React from 'react'
import {getCurrentUser} from "./thunks/mainThunk"
import {connect} from 'react-redux'

class Sell extends React.Component {

  componentDidMount = () =>{

    this.props.getCurrentUser()
  }

  render(){
    return(
      <div>
        Sell Page
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {getCurrentUser: () => dispatch(getCurrentUser())}

}

export default connect(null,mapDispatchToProps)(Sell)
