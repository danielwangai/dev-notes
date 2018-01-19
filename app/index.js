import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux'

import thunk from 'redux-thunk'
import { AppContainer } from 'react-hot-loader';

// local imports
import users from './redux/reducers/users.js'
import getRoutes from './components/App'
import MainContainer from './components/containers/MainContainer'

const rootReducer = combineReducers({users})

const store = createStore(rootReducer, compose(
  applyMiddleware(thunk),
  window.devToolsExtension() ? window.devToolsExtension() : (f) => f
))

const renderApp = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      {Component}
    </Provider>,
    document.getElementById('root')
  )
}

renderApp(getRoutes())

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./components/App.js', () => {
    const HotApp = require('./components/App.js').default
    // render App on change
    renderApp(HotApp)
  })
}
