import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'

import settingsReducer from './reducers/settingsReducer'
import toastifyReducer from './reducers/toastifyReducer'
import authReducer from './reducers/authReducer'

const allReducer = combineReducers({
  settings: settingsReducer,
  toastify: toastifyReducer,
  auth: authReducer,
})

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose
const middleware = applyMiddleware(thunk)
const store = createStore(allReducer, composeEnhancers(middleware))

export default store
