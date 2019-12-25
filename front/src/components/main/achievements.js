import React from 'react'
import styled from 'styled-components'

import Achievement from './achievement'
import ActiveUsers from './active-users'
import {
  POMODORO_URL,
  MEDIUM_URL,
  SKILLSHARE_URL,
  UDEMY_URL
} from '../../constants'
import { connectTo } from '../../utils/generic'

const AchievementLink = styled.a`
  color: ${props => props.theme.color.mainFont};
  font-style: italic;
  color: ${props => props.theme.color.mainFont};
  cursor: pointer;
`

const Achievements = ({ activeUsers: { pomodoro } }) => {
  return (
    <div>
      <Achievement>
        <p>
          Creator of{' '}
          <AchievementLink target="_blank" href={POMODORO_URL}>
            Increaser
          </AchievementLink>
        </p>
        {pomodoro > 0 && <ActiveUsers number={pomodoro} />}
      </Achievement>
      <Achievement>
        <p>
          <AchievementLink target="_blank" href={MEDIUM_URL}>
            Medium
          </AchievementLink>{' '}
          Writer
        </p>
      </Achievement>
      <Achievement>
        <p>
          <AchievementLink target="_blank" href={UDEMY_URL}>
            Udemy
          </AchievementLink>
          {' and '}
          <AchievementLink target="_blank" href={SKILLSHARE_URL}>
            Skillshare
          </AchievementLink>
          {' Instructor'}
        </p>
      </Achievement>
    </div>
  )
}

export default connectTo(state => state.main, {}, Achievements)
