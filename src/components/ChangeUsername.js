import React, { Component } from 'react'

class RegistrationForm extends Component {
  state = {
    user:{username: ''},
    error: ''
  }

  /*post '/users', to: 'users#create'
  post '/login', to: 'auth#create'
  get '/profile', to: 'users#show'
  get '/home', to: 'application#welcome'
*/
  handleChange = event => {
    console.log(this.props.updateCurrentUser)
    this.setState({
      user: {...this.state.user,[event.target.name]: event.target.value}
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user:this.state.user})
    })
      .then(resp =>{
        if(resp.ok){return resp.json()}
        else{ throw resp}
      })
      .then(json => {
        if(json.error){
          this.setState({error: json.error})
        }
        else{
          this.props.updateCurrentUser(json)
          window.location.href='./home'
        }
      })
  }

  render() {
    return (
      <div>
      <h1>Change UserName</h1>
      <div className="registration">
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
          type="submit" value="Register" />
        </form>
      </div>
      </div>
    )
  }
}

export default RegistrationForm
