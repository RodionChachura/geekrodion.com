import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { Wrapper } from './styles'
import { noPropagation } from '../../utils/generic'
import Waves from '../../waves'

const Close = ({ onExit, size = 40, withoutCircle = false }) => (
  <Wrapper
    withoutCircle={withoutCircle}
    size={size}
    onClick={noPropagation(() => onExit())}
    onMouseDown={noPropagation()}
  >
    <FontAwesomeIcon size={'lg'} icon={faTimes} />
    <Waves />
  </Wrapper>
)

export default Close
