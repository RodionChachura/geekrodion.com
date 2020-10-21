---
path: "/redux-techniques"
date: "2019-10-26"
title: "Redux State Management Techniques"
description: "Simplify the management of the redux state by using techniques from Increaser"
category: "programming"
keywords: [Redux, React, JavaScript]
featuredImage: main.png
headline: "Redux State Management Techniques"
---

![](/main.png)

## Tools from Increaser

In this story, I want to show you techniques that are used in [Increaser](https://increaser.org) to simplify the management of the redux state, and that can be useful tools for your React+Redux app development.

This story will be focused entirely on Redux-React interaction techniques. If you interested in making a newly created react app suitable to work with redux and redux-saga, you can check [this post](/blog/redux-saga-cra).

## Redux Act

I’ve found a [redux-act](https://github.com/pauldijou/redux-act) library almost three years ago and used it extensively both on my daytime job and side projects. Even so, it’s not very popular, it makes redux-related code more clear and concise, without harming readability by providing nice utils for reducers and actions creation. It can save a project from hundreds of switch-case blocks and capital-case constants. Also, you don’t need to make any extra hustle to plug it into an existing project.

## Reducers

In the file that exports root reducer, we first import all smaller reducers creators. Then make a function that creates a brand new root reducer by combining smaller ones. In the end, we export function that wraps root reducer and handles sign out.

```js
import { combineReducers, createStore } from 'redux'
import { connectRouter } from 'connected-react-router'

import history from '../history'
import { unauthorizeUser } from '../actions/auth'

import auth from './auth'
import generic from './generic'
import timer from './timer'
import time from './time'
import timeline from './timeline'
import settings from './settings'
import features from './features'
import theme from './theme'
import previousRouter from './previous-router'
import legal from './legal'
import membership from './membership'
import statistics from './statistics'

const getReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    ...Object.entries({
      previousRouter,
      auth,
      generic,
      timer,
      time,
      timeline,
      settings,
      features,
      theme,
      membership,
      legal,
      statistics
    }).reduce(
      (acc, [key, createReducer]) => ({ ...acc, [key]: createReducer() }),
      {}
    )
  })


const reducer = getReducer(history)

export default (state, action) => {
  if (action.type === unauthorizeUser.getType()) {
    const newState = createStore(getReducer(history)).getState()
    return reducer(newState)
  }

  return reducer(state, action)
}
```

Every file in reducers directory besides index.js exports function that creates a reducer so that when a user signs out from the app, we can get an initial state by creating a new root reducer, then using it to create a new store, then taking stores state and passing it to the old reducer.

```js
import { createReducer } from 'redux-act'

import * as a from '../actions/settings'
import { takeIfExists } from '../utils/localStorage';
import { toggle, setValue } from '../utils/generic';

const getDefaultState = () => {
  const settings = takeIfExists('settings', Object) || {}
  const state = {
    sound: true,
    tickingSound: false,
    tickingSoundLoaded: false,
    ...settings
  }
  return state
}

export default () => createReducer({
  [a.toggleSound]: toggle('sound'),
  [a.toggleTickingSound]: toggle('tickingSound'),
  [a.finishLoadTickingSound]: setValue('tickingSoundLoaded', true)
}, getDefaultState())
```

In the case when the default state borrows some values from browser storage, it is better to have a function generating default state.

## Toggle

Sometimes we have actions that toggle some value in the state, for example, modal or some switcher. To escape the writing of the same code, we can create a helper function.

```js
export const toggle = key => state => ({
  ...state,
  [key]: !state[key]
})
```

## Set Value

If the `toggle` function used only five times in [Increaser](https://increaser.org/), `setValue` used 18 times at the moment of writing this story. We can use it in situations when we need to update a single value in the state.

```js
export const setValue =
  (key, immidiateValue = undefined) =>
    (state, value) => ({
      ...state,
      [key]: immidiateValue === undefined ? value : immidiateValue
    })
```

We are passing the second parameter when we don’t expect anything in the payload.

```js
[a.requestStatistics]: setValue('requested', true)
```

We only pass the name of the field if we want to update it with the value from the payload.

```js
[a.changeNewProjectColor]: setValue('newProjectColor')
```

## Connect To The State

To connect a component to the state in [Increaser](https://increaser.org/) used a small function that reduces the amount of extra code. It was imported 47 times and saved some mental energy and time.

```js
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export const connectTo = (mapStateToProps, actions, Container) => {
  const mapDispatchToProps = dispatch =>
    bindActionCreators(actions, dispatch)
  return connect(mapStateToProps, mapDispatchToProps)(Container)
}
```

Below we can see an example of how this function can be used to pass actions dispatchers and data from state to the Timer component.

```js
import { changeDuration, start } from '../../actions/timer'
import { finishLoadTickingSound } from '../../actions/settings'
import { connectTo, takeFromState } from '../../utils/generic'

const Timer = ({
  duration,
  sets,
  tickingSound,
  start,
  changeDuration,
  finishLoadTickingSound
}) => {
  return (...)
}

export default connectTo(
  takeFromState({
    timer: ['duration'],
    timeline: ['sets'],
    settings: ['tickingSound']
  }),
  { start, changeDuration, finishLoadTickingSound },
  Timer
)
```

## Take From State

This function used all the time in [Increaser](https://increaser.org/). But the caveat is that it only will be of use for projects where the state is not a very deep object.

```js
// flat state
const { id } = state.user
// deep state(an object inside of an object inside of an object...)
const { id } = state.user.data.infoAnd 
```

And no collisions with field names are there.

```js
takeFromState({
  timer: ['duration'],
  timeline: ['sets'],
  settings: ['tickingSound'],
  // collision!
  sound: ['duration']
})
```

But I believe both of the cases can be handled by adding some modifications to the function.

```js
export const takeFromState = data => state => Object.entries(data)
  .reduce((acc, [key, fields]) => {
    const smallState = state[key]
    if (!smallState) throw new Error(`state don't have ${key}`)
    const object = fields.reduce((smallAcc, field) => ({
      ...smallAcc,
      [field]: smallState[field]
    }), {})

    return {
      ...acc,
      ...object
    }
  }, {})
```