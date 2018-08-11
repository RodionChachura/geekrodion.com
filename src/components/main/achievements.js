import React from 'react'
import styled from 'styled-components'

import Achievement from './achievement'

const AchievementLink = styled.a`
  color: ${props => props.theme.color.fontColor};
  font-style: italic;
  color: ${props => props.theme.color.fontColor};
  cursor: pointer;
  background-color: ${props => props.theme.color.backgroundColor};
  padding: 10px
`

export default () => (
  <div>
    <Achievement>
      Creator of <AchievementLink target="_blank" href={'https://increaser.org'}>increaser.org</AchievementLink>
    </Achievement>
    <Achievement>
      <AchievementLink target="_blank" href={'https://medium.com/@geekrodion'}>Medium</AchievementLink> writer
    </Achievement>
    <Achievement>
      Senior Software Engineer at <AchievementLink target="_blank" href={'https://kreo.net'}>KREO</AchievementLink>
    </Achievement>
    <Achievement>
      BSUIR student
    </Achievement>
  </div>
)