import { createStore, combineReducers, applyMiddleware } from 'redux'
import { reducer as formReducer } from 'redux-form'

import reducers from './reducers'
import middleware from './middleware'

export default createStore(
  combineReducers({
    ...reducers,
    form: formReducer
  }),
  applyMiddleware(...middleware)
)