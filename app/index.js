import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

// local imports
import * as reducers from './redux/reducers/users'

const rootReducer = combineReducers(reducers)

const store = createStore(rootReducer)

class TestComponent extends Component {
  render () {
    return (
      <div>
        Testing
      </div>
    )
  }
}

ReactDOM.render(
  <Provider store={store}>
    <TestComponent />
  </Provider>,
  document.getElementById('root')
)
