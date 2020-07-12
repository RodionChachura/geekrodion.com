import styled from 'styled-components'

export const Placeholder = styled.div`
  flex-shrink: 0;
  height: 80px;
  width: inherit;
  background: ${p => p.theme.color.background};
`

export const Container = styled(Placeholder)`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Logo = styled.div``

export const Navigation = styled.div`
  display: flex;
  align-items: center;
`