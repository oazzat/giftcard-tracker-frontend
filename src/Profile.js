import React from 'react'
import {getCurrentUser} from "./thunks/mainThunk"
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class Profile extends React.Component {

  componentDidMount = () =>{

    this.props.getCurrentUser()
  }

  render(){
    if (this.props.loggedIn){

      return (<div>
        Profile Page
      </div>
      )
    }
    else{
    return <Redirect to='/login'/>
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {getCurrentUser: () => dispatch(getCurrentUser())}

}

const mapStateToProps = (state =>{
  return {loggedIn: state.state.loggedIn}
})

export default connect(mapStateToProps,mapDispatchToProps)(Profile)
