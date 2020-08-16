import styled from 'styled-components'

import { OutboundLink } from 'gatsby-plugin-amplitude-analytics'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 2px 14px 20px #0C111467;
  overflow: hidden;
  width: 100%;
  justify-content: space-between;
`

export const Content = styled.div`
  margin: 10px;
`

export const SourcesContainer = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
`

export const Source = styled(OutboundLink)`
  margin-right: 20px;
  text-decoration: none;
`

export const IconWrapper = styled.span`
  margin-right: 5px;
`