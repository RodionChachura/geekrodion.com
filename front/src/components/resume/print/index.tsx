import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPrint } from "@fortawesome/free-solid-svg-icons"
import ReactToPrint from "react-to-print"

import { Container } from "./styles"
import Text, { TextColor } from "../../text"

interface Props {
  contentRef: any
}

const Print = ({ contentRef }: Props) => {
  return (
    <Container>
      <ReactToPrint
        trigger={() => (
          <Text color={TextColor.SECONDARY}>
            <FontAwesomeIcon icon={faPrint} />
          </Text>
        )}
        content={() => contentRef.current}
      />
    </Container>
  )
}

export default Print
