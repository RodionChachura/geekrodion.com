import React from 'react'

import { LayoutContainer, LayoutContent, GlobalStyle } from './styles'
import Navbar from '../navbar'

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle/>
      <LayoutContainer>
        <LayoutContent>
          <Navbar/>
          {children}
        </LayoutContent>
      </LayoutContainer>
    </>
  )
}

export default Layout