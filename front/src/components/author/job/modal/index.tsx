import React from 'react'

import Modal, { ExitType } from '../../../modal'
import Text, { TextColor } from '../../../text'
import { Container, TextWrapper } from './styles'
import { EMAIL, ResourceUrl } from '../../../../constants/links'

interface Props {
  onExit: (exitType: ExitType) => void
}
const JobModal = ({ onExit }: Props) => {
  const textSize = 20

  return (
    <Modal
      onExit={onExit}
      width={600}
    >
      <Container>
        <Text size={textSize} color={TextColor.SECONDARY}>
          Hello!
        </Text>
        <TextWrapper>
          <Text size={textSize} color={TextColor.SECONDARY}>
            Does your business need help from a full-stack developer?
          </Text>
          <Text size={textSize} color={TextColor.SECONDARY}>
            I open to a <Text size={textSize} tag="span">full-time remote job</Text> and <Text size={textSize} tag="span">consulting</Text> offers.
          </Text>
        </TextWrapper>
        <Text size={textSize} color={TextColor.SECONDARY}>
          Connect with me on <Text openInNewTab underline size={textSize} to={ResourceUrl.LinkedIn}>LinkedIn</Text> or email me at <Text size={textSize}>{EMAIL}</Text>
        </Text>
      </Container>
    </Modal>
  )
}

export default JobModal