import styled from 'styled-components'
import { MOBILE_WIDTH } from '../styles'
import { OutboundLink } from 'gatsby-plugin-amplitude-analytics'

export const AuthorSocialContainer = styled.div`
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