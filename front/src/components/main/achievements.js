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
          Writer
        </p>
      </Achievement>
      <Achievement>
        <p>
          <AchievementLink
            target="_blank"
            href={'https://www.udemy.com/user/rodion-chachura/'}
          >
            Udemy
          </AchievementLink>{' '}
          Instructor
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
