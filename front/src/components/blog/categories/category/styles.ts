import styled from 'styled-components'
import { Link } from 'gatsby'

export const Container = styled(Link)`
  border-radius: 18px;
  height: 36px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${p => p.selected? 'var(--primary-color)': 'var(--background-light-color)'};
  margin-right: 20px;
  text-decoration: none;
`
