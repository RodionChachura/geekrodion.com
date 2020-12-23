import styled from 'styled-components'

export const Container = styled.div`
  background: ${p => p.primary ? p.theme.color.mainText: p.theme.color.secondaryText};
  padding: 5px;
  border-radius: 100px;
`