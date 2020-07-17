import styled, { css } from 'styled-components'

const commonStyle = css`
  flex-shrink: 0;
  height: 80px;
  width: inherit;
  background: ${p => p.theme.color.background};
  @media(max-width: 600px) {
    display: none;
  }
`

export const Placeholder = styled.div`
 ${commonStyle};
`

export const Container = styled(Placeholder)`
  ${commonStyle};
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
`

export const Logo = styled.div``

export const Navigation = styled.div`
  display: flex;
  align-items: center;
`