import React from 'react'
import PropTypes from 'prop-types'

import RaisedButton from 'material-ui/RaisedButton'

const { bool, func, string } = PropTypes

const FacebookLogin = ({isFetching, onAuthenticate}) => {
  return (
    <div>
      {/* <FlatButton label="Primary" primary={true} /> */}
      <RaisedButton onClick={onAuthenticate} primary={true} label={isFetching ? 'Fetching' : 'Authenticate'} />
    </div>
  )
}

FacebookLogin.propTypes = {
  isFetching: bool.isRequired,
  onAuthenticate: func.isRequired,
}

const Authenticate = ({isFetching, error, onAuthenticate}) => {
  return (
    <div>
      <h1>Auth Page</h1>
      {isFetching ? <p>Fetching</p>
        : (<FacebookLogin
          isFetching={isFetching}
          onAuthenticate={onAuthenticate}
        />)
      }
      {!error ? null : <p>{error}</p>}
    </div>
  )
}

Authenticate.propTypes = {
  isFetching: bool.isRequired,
  error: string.isRequired,
  onAuthenticate: func.isRequired,
}

export default Authenticate
