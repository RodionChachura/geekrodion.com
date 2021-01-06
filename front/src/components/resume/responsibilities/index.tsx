import React from "react"

import Text, { TextColor } from '../../text'

interface Props {
  responsibilities: string[]
}

const Responsibilities = ({ responsibilities }: Props) => {
  return (
    <div>
      {responsibilities.map(text => (
        <Text key={text} color={TextColor.SECONDARY}>
          - {text}
        </Text>
      ))}
    </div>
  )
}

export default Responsibilities
