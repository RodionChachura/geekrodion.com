import React from 'react'

import { Container, Content, GlobalStyle } from './styles'
import Navbar from '../navbar'

interface Props {
  children: any,
  withoutNavbar?: boolean
}

const Layout = ({ children, withoutNavbar = false }: Props) => {
  return (
    <>
      <GlobalStyle />
      <Container id={'author'} >
        <Content>
          {!withoutNavbar && <Navbar />}
          {children}
        </Content>
      </Container>
    </>
  )
}

export default Layout
