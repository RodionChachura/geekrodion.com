import React from 'react'
import styled from 'styled-components'

import Achievement from './achievement'

const AchievementLink = styled.a`
  color: ${props => props.theme.color.fontColor};
  font-style: italic;
  color: ${props => props.theme.color.fontColor};
  cursor: pointer;
  background-color: ${props => props.theme.color.backgroundColor};
`

export default () => (
  <div>
    <Achievement>
      <p>
        Creator of{' '}
        <AchievementLink target="_blank" href={'https://increaser.org'}>
          increaser.org
        </AchievementLink>
      </p>
    </Achievement>
    <Achievement>
      <p>
        <AchievementLink
          target="_blank"
          href={'https://medium.com/@geekrodion'}
        >
          Medium
        </AchievementLink>{' '}
        writer
      </p>
    </Achievement>
    <Achievement>
      <p>
        Senior Software Engineer at{' '}
        <AchievementLink target="_blank" href={'https://kreo.net'}>
          KREO
        </AchievementLink>
      </p>
    </Achievement>
    <Achievement>
      <p>BSUIR student</p>
    </Achievement>
  </div>
)
