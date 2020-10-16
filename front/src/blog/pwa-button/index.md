---
path: "/pwa-button"
date: "2019-06-10"
title: "Install Button in PWA React+Redux"
description: "Make a React app installable on desktop and mobile phone"
category: "programming"
keywords: [React, Redux, PWA, Web Development]
featuredImage: main.png
headline: "Install Button in PWA React+Redux"
resources: [
  Demo https://increaser.org
]
---

![](/main.png)

In this post, we will look at how to make a React+Redux app installable on both desktop and mobile phone.

![Installing Increaser](/example.gif)

Before we start adding React/Redux specific logic, we need to be sure that the app we are working on is have everything listed in this [checklist](https://web.dev/pwa-checklist/). At the moment of writing, they are valid manifest and service worker and that your app served over HTTPS. You can check if your app installable by using audits in developer tools.

![Checking if your app is installable](/audit.gif)

## Action and Reducer

We need two actions — one to save the proposal event and second to remove it from the state. To create actions and reducers, we could use the [redux-act](https://github.com/pauldijou/redux-act) library.

```js
// actions/generic.js
import { createAction } from 'redux-act'

export const saveInstallProposalEvent = createAction()
export const promptToAddToHomeScreen = createAction()

// reducers/generic.js
import { createReducer } from 'redux-act'
import * as a from '../actions/generic'

const getDefaultState = () => ({
  proposalEvent: undefined
})

export default () =>
  createReducer(
    {
      [a.saveInstallProposalEvent]:
        (state, proposalEvent) => ({ ...state, proposalEvent }),
      [a.promptToAddToHomeScreen]:
        (state) => ({ ...state, proposalEvent: undefined })
    },
    getDefaultState()
  )
```

## Root Component

In the root component, we attach event listener to the `window` at `componentDidMount`, when `beforeinstallprompt` event fires, we call `saveInstallProposalEvent` action to save the event in the state.

```js
// components/layout.js

class Layout extends React.Component {
  componentDidMount() {
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault()
      saveInstallProposalEvent(e)
    })
  }
}
```

## Install Button

The last thing we need to make is to place somewhere button that will be rendered only if `proposalEvent` in the state.

```js
// components/install.js
import React from 'react'
import styled from 'styled-components'

import { connectTo, takeFromState } from '../utils/generic'
import { promptToAddToHomeScreen } from '../actions/generic'
import Button from './button-with-icon'

const Container = styled.div`
  margin: 10px;
`

const Component = ({ proposalEvent, promptToAddToHomeScreen }) => {
  if (!proposalEvent) return null
  const onClick = () => {
    promptToAddToHomeScreen()
    proposalEvent.prompt()
  }

  return (
    <Container>
      <Button
        onClick={onClick}
        centeredText
        text='Install Pomodoro'
        icon={'download'}
      />
    </Container>
  )
}

export default connectTo(
  state => takeFromState(state, 'generic', ['proposalEvent']),
  { promptToAddToHomeScreen },
  Component
)
```

Redux utility functions that were used in the example above you can find in the snippet below.

```js
// utils/generic.js
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export const connectTo = (mapStateToProps, actions, Container) => {
  const mapDispatchToProps = dispatch =>
    bindActionCreators(actions, dispatch)
  return connect(mapStateToProps, mapDispatchToProps)(Container)
}

export const takeFromState = (state, stateObjectName, fields) =>
  Object.entries(state[stateObjectName])
    .reduce(
      (acc, [key, value]) =>
        fields.includes(key) ? { ...acc, [key]: value } : acc,
      {}
    )
```