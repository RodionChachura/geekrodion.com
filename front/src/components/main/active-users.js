import React from 'react'
import styled from 'styled-components'

const ActiveUsersNumber = styled.p`
  color: ${p => p.theme.color.fontColor};
  font-size: 12px;
`

const UsersNumber = styled.span`
  color: ${p => p.theme.color.fontColor};
  font-size: 14px;
  font-weight: bold;
`

export default ({ number }) => (
  <ActiveUsersNumber>
    Active Users right now: <UsersNumber>{number}</UsersNumber>
  </ActiveUsersNumber>
)
