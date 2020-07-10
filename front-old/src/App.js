import * as Sentry from '@sentry/browser'
import React from 'react'
import ReactGA from 'react-ga'
import { Provider } from 'react-redux'
import { THEME } from 'increaser-components'
import { ThemeProvider } from 'styled-components'

import './utils/array-extensions'

import store from './store'
import saga from './sagas/'
import Main from './layouts/main'
import { sagaMiddleware } from './middleware'
import { MOCK_STATE } from './mocks/state'
import { startApp } from './actions/generic'

const App = () => {
  return (
    <ThemeProvider theme={THEME}>
      <Provider store={store}>
        <Main />
      </Provider>
    </ThemeProvider>
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
if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://aff70b4589af4cf4a33468d927d30d70@sentry.io/1365408'
  })
  ReactGA.initialize('UA-131566304-2')
  ReactGA.pageview(window.location.pathname + window.location.search)
}
