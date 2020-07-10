import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { RoundButton } from 'increaser-components'

const Text = styled.p`
  color: ${p => p.theme.color.fontColor};
  font-size: 10;
  margin-left: 5px;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export default ({ destination, icon, text }) => (
  <a target="_blank" rel="noopener noreferrer" href={destination}>
    <RoundButton size="l" type="primary">
      <Container>
        <FontAwesomeIcon size={text ? '1x' : 'lg'} icon={icon} />
        {text && <Text>{text}</Text>}
      </Container>
    </RoundButton>
  </a>
)
