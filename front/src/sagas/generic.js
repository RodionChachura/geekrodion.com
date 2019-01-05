import { select, put, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import { to } from '../actions/navigation'
import { finishEnterPage } from '../actions/generic'
import { tick, updateActiveUsersNumber } from '../actions/main'
import { TICK_PERIOD, POMODORO_ACTIVE_USERS_URL } from '../constants'
import { get } from '../utils/api'

const enters = {}

export function* enterPage() {
  const state = yield select()
  const pageName = state.navigation.page
  const entersFunc = enters[pageName]
  if (entersFunc) yield entersFunc(state)
  const newState = yield select()
  if (newState.navigation.page === 'noInternet') {
    yield put(to(pageName))
  }
  yield put(finishEnterPage())
}

const exits = {}

export function* exitPage({ payload }) {
  const state = yield select()

  const exitsFunc = exits[payload]
  if (exitsFunc) yield exitsFunc(state)
}

export function* startApp() {
  while (true) {
    yield put(tick())
    yield call(delay, TICK_PERIOD)

    try {
      const { activeUsersNumber } = yield call(get, POMODORO_ACTIVE_USERS_URL)
      const number = Number(activeUsersNumber)
      yield put(updateActiveUsersNumber({ app: 'pomodoro', number }))
    } catch (err) {}
  }
}
