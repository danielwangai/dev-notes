import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchUserFromLocalStorage } from '../helpers/utils'
import Routes from './Routes'
import { signOut, getUserfromStorage } from '../store/modules/users/users'

import './App'

// TODO - 404 Page

export const FourOhFour = () => {
  return (
    <h1>404</h1>
  )
}

class AppRoutes extends Component {
  componentDidMount () {
    if (fetchUserFromLocalStorage()) {
      this.props.getUserfromStorage()
    }
  }

  handleLogout = (event) => {
    this.props.signOut(this.props.authenticatedUserId)
    this.props.history.push('/auth')
  }
  render () {
    return (
      <div>
        {this.props.isAuthenticated === true
          ? <ul>
            <li><Link to='/notes'>Notes </Link></li>
            <li onClick={this.handleLogout}>Logout</li>
          </ul>
          : <ul>
            <li><Link to='/'>Main</Link></li>
            <li><Link to='/auth'>Auth</Link></li>
          </ul>}
        <Routes />
      </div>
    )
  }
}

AppRoutes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  getUserfromStorage: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  authenticatedUserId: PropTypes.string,
}

// default props
AppRoutes.defaultProps = {
  isAuthenticated: false,
  authenticatedUserId: '',
}

const mapStateToProps = ({users}) => (
  {
    isAuthenticated: users.isAuthenticated,
    authenticatedUserId: users.authenticatedUserId,
  }
)

export default withRouter(
  connect(mapStateToProps, {getUserfromStorage, signOut})(AppRoutes)
)
