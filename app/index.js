import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'

import configureStore from './store/store'
import AppRoutes from './components/App'
import { checkIfAuthed } from './helpers/utils'

export const store = configureStore()

const renderApp = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component isAuthed={store.getState().users.isAuthenticated} />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

// render App first
renderApp(AppRoutes)

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./components/App', () => {
    const HotApp = require('./components/App').default
    // render App on change
    renderApp(HotApp)
  })
}
