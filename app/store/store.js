import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import rootReducers from './modules'

let composeEnhancers = compose
if (process.env.NODE_ENV !== 'production') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

const configureStore = (initialState) => {
  const enhancer = composeEnhancers(applyMiddleware(thunk))
  const store = createStore(rootReducers, initialState, enhancer)

  if (module.hot) {
    // Webpack hot module replacement for reducers
    module.hot.accept('./modules', () => {
      const nextReducer = require('./modules').default
      store.replaceReducer(nextReducer)
    })
  }
  return store
}

export default configureStore
