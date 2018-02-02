import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import { BrowserRouter as Router, HashRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import configureStore from './store/store'
import AppRoutes from './components/App'

export const store = configureStore()

const renderApp = (Component) => {
  console.log('user store after\n\n', store.getState())
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <MuiThemeProvider>
          <HashRouter history={browserHistory}>
            <Component />
          </HashRouter>
        </MuiThemeProvider>
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
