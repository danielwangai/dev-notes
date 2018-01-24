import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'

import { configureStore } from './store'
import getRoutes from './components/App'

const store = configureStore()

const renderApp = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

// render App first
renderApp(getRoutes)

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./components/App.js', () => {
    const HotApp = require('./components/App').default
    // render App on change
    renderApp(HotApp)
  })
}
