import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${p => p.theme.color.halfTransparent};
  cursor: pointer;
  transition: ${p => p.theme.transition.default};
  position: relative;
  :hover {
    color: ${p => p.theme.color.text};
    ${p =>
      !p.withoutCircle &&
      css`
        background: ${p => p.theme.color.almostTransparent};
      `}
  }
`