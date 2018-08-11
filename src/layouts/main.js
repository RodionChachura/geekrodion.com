import React from 'react'
import { ThemeProvider } from 'styled-components'

import * as pages from '../pages'
import * as genericActions from '../actions/generic'
import { connectTo } from '../utils/generic'
import { THEME } from '../constants'

class MainLayout extends React.Component {
  render() {
    const Page = pages[this.props.page]
    return (
      <ThemeProvider theme={THEME}>
        <Page />
      </ThemeProvider>
    )
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