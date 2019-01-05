import React from 'react'
import styled from 'styled-components'

import Achievement from './achievement'
import ActiveUsers from './active-users'
import {
  JOB_URL,
  INCREASER_URL,
  POMODORO_URL,
  MEDIUM_URL
} from '../../constants'
import { connectTo } from '../../utils/generic'

const AchievementLink = styled.a`
  color: ${props => props.theme.color.fontColor};
  font-style: italic;
  color: ${props => props.theme.color.fontColor};
  cursor: pointer;
  background-color: ${props => props.theme.color.backgroundColor};
`

const Achievements = ({ activeUsers: { pomodoro } }) => {
  console.log(pomodoro)
  return (
    <div>
      <Achievement>
        <p>
          Creator of{' '}
          <AchievementLink target="_blank" href={INCREASER_URL}>
            Increaser
          </AchievementLink>
        </p>
      </Achievement>
      <Achievement>
        <p>
          Creator of{' '}
          <AchievementLink target="_blank" href={POMODORO_URL}>
            Pomodoro by Increaser
          </AchievementLink>
        </p>
        {pomodoro > 0 && <ActiveUsers number={pomodoro} />}
      </Achievement>
      <Achievement>
        <p>
          <AchievementLink target="_blank" href={MEDIUM_URL}>
            Medium
          </AchievementLink>{' '}
          writer
        </p>
      </Achievement>
      <Achievement>
        <p>
          Senior Software Engineer at{' '}
          <AchievementLink target="_blank" href={JOB_URL}>
            KREO
          </AchievementLink>
        </p>
      </Achievement>
    </div>
  )
}

export default connectTo(state => state.main, {}, Achievements)
