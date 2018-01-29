import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import MainContainer from '../components/containers/MainContainer'
import AuthenticationContainer from '../components/containers/AuthenticationContainer/AuthenticationContainer'
import NotesContainer from '../components/containers/Notes/NotesContainer'
import { fetchUserFromLocalStorage } from '../helpers/utils'

export const CustomRoute = ({ component: Component, props: Props, ...rest }) =>
  <Route {...rest} render={props => <Component {...props} {...Props} />} />

export const FourOhFour = () => {
  return (
    <h1>404</h1>
  )
}

const ProtectedRoute = ({ component: Component, ...rest }) => {
  // check local storage here.
  const localUserData = fetchUserFromLocalStorage()
  return (
    <Route {...rest} render={(props) => (
      (localUserData && (Object.keys(localUserData)))
        ? <Component {...props} />
        : <Redirect to='/auth' />
    )} />
  )
}

const Routes = () => (
  <Switch>
    <CustomRoute exact={true} path='/' component={MainContainer} />
    <ProtectedRoute path='/notes' component={NotesContainer} />
    <CustomRoute path='/auth' component={AuthenticationContainer} />
    <Route component={FourOhFour} />
  </Switch>
)

export default Routes
