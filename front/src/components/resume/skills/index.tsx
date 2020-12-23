import React from 'react'

import { Container } from './styles'
import Skill, { Significance} from './skill'

interface Props {
  primary?: string[],
  secondary?: string[]
}

const Skills = ({ primary = [], secondary = [] }: Props) => {
  return (
    <Container>
      {primary.map(skill => <Skill key={skill} significance={Significance.Primary} text={skill} />)}
      {secondary.map(skill => <Skill key={skill} significance={Significance.Secondary} text={skill} />)}
    </Container>
  )
}

export default Skills