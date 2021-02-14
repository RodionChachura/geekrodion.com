import styled, { css, keyframes } from 'styled-components'


export const PADDING = 20

const modalAnimation = keyframes`
  0% {
    transform: scale(.8) translateZ(0);
    opacity: 0;
  }
`

const modalStyle = css`
  ${p =>
    !p.withoutModalAnimation &&
    css`
      animation: ${modalAnimation} 0.25s ease-in-out;
    `};
  opacity: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  background: var(--background-light-color);
  ${p =>
    p.withPadding &&
    css`
      padding: ${PADDING}px;
      padding-top: ${p => (p.closable ? 40 : 20)}px;
    `}
  ${p =>
    p.mobile
      ? css`
          width: 100%;
          min-height: 100%;
          padding-bottom: 0;
          padding-top: 0;
        `
      : css`
          box-shadow: var(--default-shadow);
          border-radius: 10px;
        `}
  ${p =>
    p.width &&
    css`
      width: ${p.width}px;
    `}
`

export const Form = styled.form`
  ${modalStyle}
`
export const Modal = styled.div`
  ${modalStyle}
`

const BLUR = '4px'

export const Container = styled.div`
  z-index: 4;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  max-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${p =>
    p.solid
      ? css`
          background: var(--background-color);
        `
      : css`
          background: rgba(0, 0, 0, 0.5);
          @supports (backdrop-filter: blur(${BLUR})) or
            (--webkit-backdrop-filter: blur(${BLUR})) {
            background: transparent;
            backdrop-filter: blur(${BLUR});
            --webkit-backdrop-filter: blur(${BLUR});
          }
        `}
`

export const CloseWrapper = styled.div`
  z-index: 5;
  position: absolute;
  top: 8px;
  right: 8px;
`
