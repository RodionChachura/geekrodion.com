import styled from 'styled-components'

export const Container = styled.div`
  background: ${p => p.primary ? 'var(--text-color)': 'var(--text-light-color)'};
  padding: 1px 4px;
  border-radius: 4px;
`
