import React from 'react'
import { withTheme } from 'styled-components'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'

import Resource from './resource'
import { Container } from './styles'

interface Props {
  resources: string[],
  theme: any
}

enum Type {
  GitHub = "GitHub",
  Udemy = "Udemy"
}

const TEXT_FOR_TYPE = {
  [Type.GitHub]: "Source Code",
  [Type.Udemy]: "On Udemy"
}

const COLOR_FOR_TYPE = {
  [Type.GitHub]: 'headline',
  [Type.Udemy]: 'link'
}

const ICON_FOR_TYPE = {
  [Type.GitHub]: faGithub,
  [Type.Udemy]: faPlayCircle
}

const Resources = ({ resources, theme }: Props) => {
  return (
    <Container>
      {resources.map(resource => {
        const [type, to] = resource.split(' ')
        return (
          <Resource
            key={to}
            to={to}
            text={TEXT_FOR_TYPE[type]}

            color={theme.blog.color[COLOR_FOR_TYPE[type]]}
            icon={ICON_FOR_TYPE[type]}
          />
        )
      })}
    </Container>
  )
}

export default withTheme(Resources)