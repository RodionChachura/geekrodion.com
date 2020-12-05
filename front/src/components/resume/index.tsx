import React from 'react'

import { Wrapper, Container, Header, Contacts } from './styles'

import Text from '../text'
import { EMAIL, ResourceUrl, Resource } from '../../constants/links'
import Contact from './contact'

const Resume = () => {
  return (
    <Wrapper>
      <Container>
        <Header>
          <Text size={24} bold tag="h1">RODION CHACHURA</Text>
          <Contacts>
            <Contact to={`mailto:${EMAIL}`} text={EMAIL} />
            <Contact to={ResourceUrl.LinkedIn} text={Resource.LinkedIn}/>
            <Contact to={ResourceUrl.GitHub} text={Resource.GitHub}/>
            <Contact to={ResourceUrl.WebSite} text={Resource.WebSite}/>
          </Contacts>
        </Header>
      </Container>
    </Wrapper>
  )
}

export default Resume