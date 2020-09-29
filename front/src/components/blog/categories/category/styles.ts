import styled from 'styled-components'
import { Link } from 'gatsby'

export const Container = styled(Link)`
  border-radius: 50%;
  height: 50px;
  width: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${p => p.selected? p.theme.color.primary: p.theme.color.secondaryBackground};
  margin-right: 20px;
`