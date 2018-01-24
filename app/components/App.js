import React, { Component } from 'react'
// import { hashHistory, IndexRoute, Route } from 'react-router'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

import MainContainer from '../components/containers/MainContainer.js'
import AuthenticationContainer from '../components/containers/AuthenticationContainer/AuthenticationContainer.js'
import Home from '../components/pages/Home/Home.js'

// TODO - 404 Page

class FourOhFour extends Component {
  render () {
    return (
      <h1>404</h1>
    )
  }
}

export default function getRoutes () {
  return (
    <Router>
      <div>
        <ul>
          <li><Link to='/'>Main</Link></li>
          <li><Link to='/landing'>Home</Link></li>
          <li><Link to='/auth'>Auth</Link></li>
        </ul>
        <Switch>
          <Route exact path='/' component={MainContainer}/>
          <Route path='/landing' component={Home}/>
          <Route path='/auth' component={AuthenticationContainer}/>
          <Route component={FourOhFour}/>
        </Switch>
      </div>
    </Router>
  )
}
