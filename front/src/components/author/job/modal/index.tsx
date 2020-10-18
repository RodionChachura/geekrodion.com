import React from 'react'

import Modal from '../../../modal'

interface Props {
  onExit: Function
}
const JobModal = ({ onExit }) => {
  return (
    <Modal
      onExit={onExit}
      width={500}
    >
      Job...
    </Modal>
  )
}

export default JobModal