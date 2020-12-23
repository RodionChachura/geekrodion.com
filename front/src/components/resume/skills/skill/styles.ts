import styled from 'styled-components'

export const Container = styled.div`
  background: ${p => p.primary ? p.theme.color.text: p.theme.color.secondaryText};
  padding: 2px 5px;
  border-radius: 100px;
`