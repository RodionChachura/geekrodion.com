import React, { useState } from 'react'

import { Container } from './styles'
import Text, { TextColor } from '../../text'
import Modal from './modal'

const Job = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Container onClick={() => setIsModalOpen(true)}>
        <Text bold color={TextColor.REVERSED}>
          Hire Me
        </Text>
      </Container>
      {isModalOpen && <Modal onExit={() => setIsModalOpen(false)}/>}
    </>
  )
}

export default Job