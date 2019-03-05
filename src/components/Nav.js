import React from 'react'
import { NavLink } from 'react-router-dom'

class Nav extends React.Component {
  render() {
    return (
      <div className="ui secondary menu fixed">
        <NavLink activeClassName="active" className="item" to="/login">
          Login
        </NavLink>
        <NavLink activeClassName="active" className="item" to="/profile">
          Profile
        </NavLink>
        <NavLink activeClassName="active" className="item" to="/signup">
          Register
        </NavLink>
        {this.props.logged_in ?
          <div className="item right">
          Logged in as {this.props.user.username}
          <NavLink to="/edit_user" className="item right">
            Edit Username
          </NavLink>
          <NavLink to="/logout" className="item right">
          Logout
          </NavLink>
          </div>
        : null}

      </div>
    )
  }
}

export default Nav
