import React from 'react'

import { Container, Content, GlobalStyle } from './styles'
import Navbar from '../navbar'

interface Props {
  children: any,
  customBackground?: string
}

const Layout = ({ children, customBackground }: Props) => {
  return (
    <>
      <GlobalStyle customBackground={customBackground}/>
      <Container id={'author'} customBackground={customBackground}>
        <Content>
          <Navbar customBackground={customBackground}/>
          {children}
        </Content>
      </Container>
    </>
  )
}

export default Layout