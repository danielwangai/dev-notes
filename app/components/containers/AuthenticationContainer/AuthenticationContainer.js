import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// components
import Authentication from '../../pages/Authentication/Authentication'

import * as userActionCreators from '../../../store/modules/users/users'

class AuthenticationContainer extends Component {
  constructor (props) {
    super(props)
    this.handleAuth = this.handleAuth.bind(this)
  }
  handleAuth (event) {
    event.preventDefault()
    this.props.fetchAndAuthenticateUser()
      .then(() => this.context.router.history.replace('landing'))// redirect to feed route
  }

  render () {
    return (
      <div>
        <Authentication
          isFetching={this.props.isFetching}
          error={this.props.error}
          onAuthenticate={this.handleAuth}
        />
      </div>
    )
  }
}

const { bool, string, func, object } = PropTypes

AuthenticationContainer.propTypes = {
  isFetching: bool.isRequired,
  error: string.isRequired,
  fetchAndAuthenticateUser: func.isRequired,
}

AuthenticationContainer.contextTypes = {
  router: object.isRequired,
}

function mapStateToProps ({users}) {
  console.log('user state', users)
  return {
    isFetching: users.isFetching,
    error: users.error,
  }
}

function mapDispatchToProps (dispatch) {
  console.log('userActionCreators\n\n', userActionCreators)
  return bindActionCreators(userActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationContainer)
