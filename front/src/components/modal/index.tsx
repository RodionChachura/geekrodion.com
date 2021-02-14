import { useMediaQuery } from 'beautiful-react-hooks'
import React, { useEffect } from 'react'

import {
  registerListener,
  noPropagation,
  withPreventDefaultNoPropagation
} from '../utils/generic'
import Close from './close'
import { Container, CloseWrapper, Modal, Form } from './styles'

export enum ExitType {
  Close,
  ClickOutside,
  Escape,
  Back
}

interface Props {
  onExit: (exitType: ExitType) => any,
  children: any,
  onSubmit?: Function,
  width: number,
  noWrap?: boolean,
  withoutCross?: boolean,
  rightCross?: boolean,
  withoutModalAnimation?: boolean,
  submitOnEnter?: boolean
}

const ModalComponent = ({
  onExit,
  children,
  onSubmit,
  width,
  noWrap = false,
  withoutCross = false,
  rightCross = false,
  withoutModalAnimation = false,
  submitOnEnter = false,
  ...rest
}: Props) => {
  const isMobile = useMediaQuery(`(max-width: ${width + 200}px)`)

  useEffect(() => {
    if (onExit) {
      return registerListener(
        'keyup',
        ({ code }: KeyboardEvent) => code === 'Escape' && onExit(ExitType.Escape)
      )
    }
  }, [])

  useEffect(() => {
    return registerListener('keyup', ({ code }: KeyboardEvent) => {
      if (submitOnEnter && code === 'Enter') {
        onSubmit()
      }
    })
  }, [])

  useEffect(() => {
    window.history.pushState(null, 'modal')
    window.onpopstate = () =>
      onExit ? onExit(ExitType.Back) : window.history.pushState(null, 'modal')
    return () => {
      window.onpopstate = undefined
    }
  })

  const Content = onSubmit ? Form : Modal
  const props = onSubmit
    ? {
        ...rest,
        onSubmit: withPreventDefaultNoPropagation(() => onSubmit())
      }
    : rest

  const renderClose = () => {
    const closeStyle = rightCross
      ? {
          top: 0,
          right: -50
        }
      : {}
    return (
      <CloseWrapper style={closeStyle}>
        <Close onExit={() => onExit(ExitType.Close)} />
      </CloseWrapper>
    )
  }

  const renderContent = () => {
    if (noWrap) return children
    return (
      <Content
        withoutModalAnimation={withoutModalAnimation}
        onClick={noPropagation()}
        width={!isMobile ? width : null}
        mobile={isMobile}
        closable={!!onExit}
        withPadding={!rightCross}
        {...props}
      >
        {!isMobile && !withoutCross && onExit && renderClose()}
        {children}
      </Content>
    )
  }

  return (
    <Container
      mobile={isMobile}
      solid={isMobile}
      onMouseDown={noPropagation()}
      onClick={noPropagation(
        () => onExit(ExitType.ClickOutside) || (() => {})
      )}
    >
      {isMobile && onExit && renderClose()}
      {renderContent()}
    </Container>
  )
}

export default ModalComponent
