import React from 'react'

import { Wrapper, Container, Header, Contacts, Content, Side } from './styles'
import Text from '../text'
import { EMAIL, ResourceUrl, Resource } from '../../constants/links'
import Contact from './contact'
import Section from './section'
import Experience from './experience'

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
        <Content>
          <Side>
            <Section name={"WORK EXPERIENCE"}>
              <Experience
                company={"Kontist"}
                position={"Senior Software Developer"}
                website={"https://kontist.com/"}
                remote
              />
              <Experience
                company={"Kreo"}
                position={"Software Developer"}
                website={"https://design.kreo.net/product"}
              />
            </Section>
          </Side>
          <Side>
            <Section name={"PROJECTS"}>

            </Section>
            <Section name={"EDUCATION"}>

            </Section>
          </Side>
        </Content>
      </Container>
    </Wrapper>
  )
}

export default Resume