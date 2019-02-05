import React, {Component} from 'react'

export default class TestComp extends Component{

componentDidMount = () =>{
  if (localStorage.token){
    this.getCurrentUser()
  }
  else{
    console.log("NO ONE IS LOGGED IN");
  }
}


createUser = (e) =>{
  // debugger
  e.preventDefault()
  fetch("http://localhost:3000/api/v1/users/", {
    method: "POST",
    headers: {"Content-Type": "application/json", Accept: "application/json"},
    body: JSON.stringify({user: {username: e.target[0].value, email: e.target[2].value, password: e.target[1].value}})
  })
  .then(res => res.json())
  .then(data => localStorage.setItem("token",data.token))
  .catch(console.error)
}

getUsers = () =>{
  // newArr = []
  fetch("http://localhost:3000/api/v1/users/")
    .then(res => res.json())
    .then(data => console.log(data))
}


loginUser = (e) =>{
  e.preventDefault()
  fetch("http://localhost:3000/api/v1/login/",{
    method: "POST",
    headers: {"Content-Type": "application/json", Accept: "application/json"},
    body: JSON.stringify({
      username: e.target[0].value,
      password: e.target[1].value
    })
  })
  .then(res=>res.json())
  .then(data=>localStorage.setItem("token", data.token))
}

getCurrentUser = () =>{
  fetch("http://localhost:3000/api/v1/profile",
      {method: "GET", headers: {Authorization: `Bearer ${localStorage.token}`}})
  .then(res => res.json())
  .then(user => console.log(user))

}

  render(){
    return(
      <div>
      CREATE
      <form onSubmit={this.createUser}>
        <input name="username" type="text" placeholder="username"/>
        <br></br>
        <input name="password" type="text" placeholder="password"/>
        <br></br>
        <input name="email" type="text" placeholder="email"/>
        <br></br>
        <button type="submit">SUBMIT</button>
      </form>
      <h1>{this.getUsers()}</h1>
      LOGIN
      <form onSubmit={this.loginUser}>
        <input name="username" type="text" placeholder="username"/>
        <br></br>
        <input name="password" type="text" placeholder="password"/>
        <br></br>
        <button type="submit">SUBMIT</button>
      </form>
      </div>
    )
  }
}
