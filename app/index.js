import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

// local imports
import users from './redux/reducers/users.js'
import getRoutes from './components/App'

const rootReducer = combineReducers({users})

const store = createStore(rootReducer, compose(
  applyMiddleware(thunk),
  window.devToolsExtension() ? window.devToolsExtension() : (f) => f
))

ReactDOM.render(
  <Provider store={store}>
    {getRoutes()}
  </Provider>,
  document.getElementById('root')
)
