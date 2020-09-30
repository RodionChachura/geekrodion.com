import React from 'react'

import { Container, Content, GlobalStyle } from './styles'
import Navbar from '../navbar'

const Layout = ({ children, location }) => {
  return (
    <>
      <GlobalStyle/>
      <Container id={'author'}>
        <Content>
          <Navbar location={location}/>
          {children}
        </Content>
      </Container>
    </>
  )
}

export default Layout