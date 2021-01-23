import styled from 'styled-components'

export const Container = styled.div`
  background: ${p => p.primary ? p.theme.color.text: p.theme.color.secondaryText};
  padding: 1px 4px;
  border-radius: 4px;
`