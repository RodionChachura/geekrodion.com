import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { RoundButton } from 'increaser-components'

export default ({ destination, icon }) => (
  <a target="_blank" rel="noopener noreferrer" href={destination}>
    <RoundButton size="l" type="primary">
      <FontAwesomeIcon size={'lg'} icon={icon} />
    </RoundButton>
  </a>
)
