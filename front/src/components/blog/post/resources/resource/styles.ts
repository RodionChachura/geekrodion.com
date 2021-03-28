import styled from 'styled-components'

import { OutboundLink } from 'gatsby-plugin-amplitude-analytics'

export const Container = styled(OutboundLink)`
  border-radius: 18px;
  height: 36px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  background: ${p => p.color};
  text-decoration: none;
`
