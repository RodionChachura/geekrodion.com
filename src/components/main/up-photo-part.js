import React from 'react'
import styled from 'styled-components'
import { DateTime } from 'luxon'

import { DOB } from '../../constants';


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
  background-color: ${props => props.theme.color.backgroundColor};
  color: ${props => props.theme.color.fontColor};
  font-style: italic;
  cursor: pointer;
  text-decoration: none;
  :hover {
    transition: all 0.4s cubic-bezier(0.42, 0, 0.58, 1);
    background-color: ${props => props.theme.color.fontColor};
    color: ${props => props.theme.color.backgroundColor};
  }
`

const Age = styled.h5`
  border-radius: 4px;
  padding: 4px;
  margin-top: 10px;
  background-color:${props => props.theme.color.backgroundColor};
  color: ${props => props.theme.color.fontColor}
`

export default () => {
  const { years, months, days } = DateTime.fromMillis(Date.now()).diff(DOB,[ 'year', 'months', 'days'])
  return (
    <UpPhotoPart>
      <Quote target="_blank" href="https://medium.com/@geekrodion/increaser-mindset-dc828a2bcd4d">Time waits for no one, and it won’t wait for me</Quote>
      <Age>{Math.round(years)} years {Math.round(months)} months {Math.round(days)} days</Age>
    </UpPhotoPart>
  )
}