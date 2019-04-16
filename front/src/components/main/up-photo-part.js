import React from 'react'
import styled from 'styled-components'
import { DateTime } from 'luxon'

import { DOB, TIME_WAITS_FOR_NO_ONE_URL } from '../../constants'

const UpPhotoPart = styled.div`
  position: absolute;
  top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5vmax;
`

const Quote = styled.a`
  border-radius: 10px;
  padding: 10px;
  background: ${props => props.theme.color.primary};
  color: ${props => props.theme.color.mainFont};
  font-style: italic;
  cursor: pointer;
  text-decoration: none;
  :hover {
    transition: ${props => props.theme.transition.default};
    background: ${props => props.theme.colorHover.primary};
  }
`

const Age = styled.h5`
  border-radius: 4px;
  padding: 4px;
  margin-top: 10px;
  background: ${props => props.theme.color.pageBackground};
  color: ${props => props.theme.color.mainFont};
`

export default () => {
  const { years, months, days } = DateTime.fromMillis(Date.now()).diff(DOB, [
    'year',
    'months',
    'days'
  ])
  const age = `${Math.round(years)} years${
    Math.round(months) > 0 ? ` ${Math.round(months)} months` : ''
  }${Math.round(days) > 0 ? ` ${Math.round(days)} days` : ''}`
  return (
    <UpPhotoPart>
      <Quote target="_blank" href={TIME_WAITS_FOR_NO_ONE_URL}>
        Time waits for no one, and it won’t wait for me
      </Quote>
      <Age>{age}</Age>
    </UpPhotoPart>
  )
}
