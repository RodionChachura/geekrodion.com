import React from 'react'
import { YMInitializer } from 'react-yandex-metrika'
import { Provider } from 'react-redux'

import './utils/array-extensions'

import store from './store'
import saga from './sagas/'
import Main from './layouts/main'
import { sagaMiddleware } from './middleware'
import { MOCK_STATE } from './mocks/state'
import { startApp } from './actions/generic'

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Main />
      </Provider>
      {process.env.NODE_ENV === 'production' && (
        <YMInitializer
          accounts={[50995253]}
          version="2"
          options={{
            id: 50995253,
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true
          }}
        />
      )}
    </div>
  )
}

export default App

sagaMiddleware.run(saga)

store.dispatch(startApp())

if (process.env.REACT_APP_MOCK) {
  const state = store.getState()
  Object.entries(state).forEach(
    ([key, value]) => (state[key] = { ...value, ...MOCK_STATE[key] })
  )
}

window.history.pushState({}, '', '')
