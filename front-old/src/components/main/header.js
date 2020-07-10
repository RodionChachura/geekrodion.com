import React from 'react'
import styled from 'styled-components'

const Header = styled.div`
  margin: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Name = styled.h1`
  color: ${props => props.theme.color.mainFont};
`

const StageName = styled.h2`
  color: ${props => props.theme.color.mainFont};
  padding-top: 10px;
`

export default () => (
  <Header>
    <Name>Rodion Chachura</Name>
    <StageName>@geekrodion</StageName>
  </Header>
)
