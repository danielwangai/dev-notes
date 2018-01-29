import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { store } from '../'
import { fetchUserFromLocalStorage } from '../helpers/utils'
import Routes from './Routes'
import { signOut, getUserfromStorage } from '../store/modules/users/users'

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
    this.props.signOut(store.getState().users.authenticatedUserId)
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
}

// default props
AppRoutes.defaultProps = {
  isAuthenticated: false,
}

const mapStateToProps = ({users}) => (
  {
    isAuthenticated: users.isAuthenticated,
  }
)

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({getUserfromStorage, signOut}, dispatch)
)

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppRoutes)
)
