import styled from 'styled-components'

export const NavbarPlaceholder = styled.div`
  flex-shrink: 0;
  height: 80px;
  width: inherit;
  background: ${p => p.theme.color.background};
`

export const NavbarContainer = styled(NavbarPlaceholder)`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
`

export const NavbarLogo = styled.div``

export const NavbarNavigation = styled.div`
  display: flex;
  align-items: center;
`