import React, { Component } from 'react'

class LoginForm extends Component {
  state = {
    user:{username: '',
    password: ''
  },
  error: null
  }

  handleChange = event => {
    this.setState({
      user: {...this.state.user,[event.target.name]: event.target.value}
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    // console.log(this.state)

    fetch(`http://localhost:3000/api/v1/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
        //token: localStorage.getItem('token')
      },
      body: JSON.stringify({user:this.state.user})
    })
    .then(resp =>{
      resp.json().then(
        json => {
          if(resp.ok){
            this.props.updateCurrentUser(json)
            this.props.fetchMyStuff(json.id)
          }
          else{
            console.log(json)
            if(json.message){
              this.setState({error: json.message})}
            else {this.setState({error: resp.statusText})}
          }
        }
      )
    }
  )
  }



  render() {
    console.log('login rendereddd')
    return (
      <div className="login">
      <h2> Login Form</h2>
      {this.state.error ? <div>{this.state.error}</div> :null}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
          className="ui input"
            type="text"
            name="username"
            placeholder="Username"
            onChange={this.handleChange}
            value={this.state.username}
          />
          <label htmlFor="password">Password</label>
          <input
          className="ui input"
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
            value={this.state.password}
          />
          <input
          className="ui input"
 type="submit" value="Login" />
        </form>
      </div>
    )
  }
}

export default LoginForm
