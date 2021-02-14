import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--half-transparent-color);
  cursor: pointer;
  transition: var(--default-transition);
  position: relative;
  :hover {
    color: var(--text-color);
    ${p =>
      !p.withoutCircle &&
      css`
        background: var(--almost-transparent-color);
      `}
  }
`
