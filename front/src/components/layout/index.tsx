import React from 'react'

import { Container, Content, GlobalStyle } from './styles'
import Navbar from '../navbar'

interface Props {
  children: any,
  customBackground?: string,
  withoutNavbar?: boolean
}

const Layout = ({ children, customBackground, withoutNavbar = false }: Props) => {
  return (
    <>
      <GlobalStyle customBackground={customBackground}/>
      <Container id={'author'} customBackground={customBackground}>
        <Content>
          {!withoutNavbar && <Navbar customBackground={customBackground}/>}
          {children}
        </Content>
      </Container>
    </>
  )
}

export default Layout