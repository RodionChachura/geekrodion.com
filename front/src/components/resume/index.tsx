import React, { useRef } from "react"

import { Wrapper, Container, Header, Contacts, Content, Side } from "./styles"
import Text from "../text"
import { EMAIL, ResourceUrl, Resource } from "../../constants/links"
import Contact from "./contact"
import Section from "./section"
import Experience from "./experience"
import Skills from "./skills"
import Print from "./print"
import Project from "./project"
import Responsibilities from "./responsibilities"

const Resume = () => {
  const contentRef = useRef()
  return (
    <Wrapper ref={contentRef}>
      <Container>
        <Print contentRef={contentRef} />
        <Header>
          <Text size={24} bold tag="h1">
            RODION CHACHURA
          </Text>
          <Contacts>
            <Contact to={`mailto:${EMAIL}`} text={EMAIL} />
            <Contact to={ResourceUrl.LinkedIn} text={Resource.LinkedIn} />
            <Contact to={ResourceUrl.GitHub} text={Resource.GitHub} />
            <Contact to={ResourceUrl.WebSite} text={Resource.WebSite} />
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
                start={new Date(2019, 6)}
                end={new Date(2020, 9)}
              >
                <Responsibilities
                  responsibilities={[
                    "Technical planning & code reviews",
                    "Adding features to the native app",
                    "Developing new web app",
                    "Improving sign up conversion",
                  ]}
                />
                <Skills
                  primary={[
                    "React Native",
                    "React",
                    "Redux",
                    "Agile",
                    "NodeJS",
                    "Technical Planning",
                  ]}
                  secondary={["PostgreSQL", "Prismic", "Svelte"]}
                />
              </Experience>
              <Experience
                company={"Kreo"}
                position={"Software Developer"}
                website={"https://design.kreo.net/product"}
                start={new Date(2017, 4)}
                end={new Date(2019, 6)}
              >
                <Responsibilities
                  responsibilities={[
                    "Implementing complex interfaces",
                    "Frontend Architecture",
                    "Managing infrastructure",
                    "Developing microservices",
                  ]}
                />
                <Skills
                  primary={[
                    "React",
                    "Redux",
                    "Terraform",
                    "AWS",
                    "NodeJS",
                    "Algorithms",
                  ]}
                  secondary={["ASP.NET", ".NET Orleans", "Python"]}
                />
              </Experience>
            </Section>
          </Side>
          <Side>
            <Section name={"PROJECTS"}>
              <Project name="Increaser" website={ResourceUrl.Increaser}>
                <Responsibilities
                  responsibilities={[
                    "Designing the product",
                    "Developing the web app",
                    "Implementing microservices",
                    "Managing infrastructure",
                  ]}
                />
              </Project>
              <Project name="GeekRodion" website={ResourceUrl.WebSite}>
                <Responsibilities
                  responsibilities={[
                    "Writing and recording content",
                    "Coding educational projects",
                    "Implementing a blogging platform",
                  ]}
                />
              </Project>
              <Project name="BooksConcepts" website={ResourceUrl.BooksConcepts}>
                <Responsibilities
                  responsibilities={[
                    "Highlighting books key takeaways",
                    "Designing and developing a content website",
                  ]}
                />
              </Project>
            </Section>
            <Section name={"EDUCATION"}></Section>
          </Side>
        </Content>
      </Container>
    </Wrapper>
  )
}

export default Resume
