import React from 'react'

import { Container, GlobalStyle } from './styles'

const Layout = ({ children }) => {
  return (
    <Container>
      <GlobalStyle/>
      {children}
    </Container>
  )
}

export default Layout