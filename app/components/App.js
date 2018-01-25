import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Link, Redirect, Route } from 'react-router-dom'

import MainContainer from '../components/containers/MainContainer'
import AuthenticationContainer from '../components/containers/AuthenticationContainer/AuthenticationContainer'
import NotesContainer from '../components/containers/Notes/NotesContainer'

import { store } from '../'
import { checkIfAuthed } from '../helpers/utils'

// TODO - 404 Page

export const FourOhFour = () => {
  return (
    <h1>404</h1>
  )
}

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    checkIfAuthed(store) === true
      ? <Component {...props} />
      : <Redirect to='/auth' />
  )} />
)

export default function AppRoutes ({isAuthed}) {
  return (
    <Router>
      <div>
        {isAuthed === true
          ? <ul>
            <li><Link to='/notes'>Notes n</Link></li>
            <li><Link to='/logout'>Logout</Link></li>
          </ul>
          : <ul>
            <li><Link to='/'>Main</Link></li>
            <li><Link to='/auth'>Auth</Link></li>
          </ul>}
        <Route exact path='/' component={MainContainer} />
        <ProtectedRoute path='/notes' component={NotesContainer} />
        <Route path='/logout'/>
        <Route path='/auth' component={AuthenticationContainer}/>
        <Route component={FourOhFour}/>
      </div>
    </Router>
  )
}

AppRoutes.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
}

// default props
AppRoutes.defaultProps = {
  isAuthed: false,
}
