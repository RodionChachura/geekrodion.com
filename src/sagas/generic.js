import { select, put, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import { to } from '../actions/navigation'
import { finishEnterPage } from '../actions/generic'
import { tick } from '../actions/main';
import { TICK_PERIOD } from '../constants';

const enters = {
}

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
  while(true) {
    yield put(tick())
    console.log('tick')
    yield call(delay, TICK_PERIOD)
  }
}