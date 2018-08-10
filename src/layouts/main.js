import React from 'react'

import * as pages from '../pages'

import * as genericActions from '../actions/generic'
import { connectTo } from '../utils/generic'

class MainLayout extends React.Component {
  render() {
    const Page = pages[this.props.page]
    return <Page />
  }

  componentDidMount() {
    const { moveMouse, changePageSize, saveInstallProposalEvent } = this.props
    window.addEventListener('resize', () =>
      changePageSize({ width: window.innerWidth, height: window.innerHeight })
    )
    document.addEventListener('mousemove', ({ clientX, clientY }) =>
      moveMouse({ mouseX: clientX, mouseY: clientY })
    )
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault()
      saveInstallProposalEvent(e)
    })
  }
}

export default connectTo(
  state => ({
    page: state.navigation.page,
  }),
  genericActions,
  MainLayout
)