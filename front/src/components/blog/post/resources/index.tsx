import React from 'react'
import { withTheme } from 'styled-components'
import { faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faPlayCircle, faGamepad } from '@fortawesome/free-solid-svg-icons'

import Resource from './resource'
import { Container } from './styles'

interface Props {
  resources: string[],
  theme: any
}

enum Type {
  GitHub = "GitHub",
  Udemy = "Udemy",
  Demo = "Demo",
  YouTube = "YouTube"
}

const TEXT_FOR_TYPE = {
  [Type.GitHub]: "Source Code",
  [Type.Udemy]: "On Udemy",
  [Type.Demo]: "Try It",
  [Type.YouTube]: "On YouTube"
}

const COLOR_FOR_TYPE = {
  [Type.GitHub]: 'headline',
  [Type.Udemy]: 'link',
  [Type.Demo]: 'secondary',
  [Type.YouTube]: 'link',
}

const ICON_FOR_TYPE = {
  [Type.GitHub]: faGithub,
  [Type.Udemy]: faPlayCircle,
  [Type.Demo]: faGamepad,
  [Type.YouTube]: faYoutube
}

const Resources = ({ resources, theme }: Props) => {
  if (!resources) {
    return null
  }
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