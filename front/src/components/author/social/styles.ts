import styled from 'styled-components'
import { MOBILE_WIDTH } from '../styles'
import { OutboundLink } from 'gatsby-plugin-amplitude-analytics'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media(max-width: ${MOBILE_WIDTH}px) {
    width: 100%;
    justify-content: space-around;
  }
`

export const SocialLink = styled(OutboundLink)`
  margin-right: 20px;
  @media(max-width: ${MOBILE_WIDTH}px) {
    margin-right: 0;
  }
`

export const AgeContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`