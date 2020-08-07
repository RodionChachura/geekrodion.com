import React from 'react'

import { Container, Content, GlobalStyle } from './styles'
import Navbar from '../navbar'

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle/>
      <Container id={'author'}>
        <Content>
          <Navbar/>
          {children}
        </Content>
      </Container>
    </>
  )
}

export default Layout