import styled from 'styled-components'
import { Link } from 'gatsby'

export const Container = styled(Link)`
  border-radius: 20px;
  height: 40px;
  width: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${p => p.selected? p.theme.color.primary: p.theme.color.secondaryBackground};
  margin-right: 20px;
  text-decoration: none;
`