import React, { useCallback } from "react"
import styled from "styled-components"

import Text, { TextColor } from 'src/components/text'
import { HStack, VStack } from "../common/stack"
import { getAnalytics } from "src/utils/analytics"
import { ResourceUrl } from "src/constants/links"
import { useSpring, animated, config } from 'react-spring'

const Container = styled(animated.div)`
  position: fixed;
  z-index: 7;
  left: 110px;
  bottom: 105px;
`

const ContentWr = styled.div`
  position: relative;
  width: 350px;
  min-height: 87px;
`

const Content = styled.div`
  position: relative;
  background: white;
  border-radius: 24px;
  padding: 24px 32px;
  z-index: 2;
  color: rgb(10, 12, 16);
`

const Connector = styled.div`
  top: -10px;
  position: absolute;
  left: 1px;
  transform: translateX(-100%);
  pointer-events: none;
`

const Button = styled.button`
  display: block;
  margin: 0px;
  padding: 0px;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  font: inherit;
  margin-right: 8px;
  padding: 12px 16px;
  background: transparent;
  border-radius: 16px;
  font-size: 16px;
  text-decoration: none;

  :hover {
    background: rgb(239, 241, 245);
  }
`

interface Props {
  onSelect: () => void,
  onNoHover?: () => void,
  onNoLeave?: () => void,
  onYesHover?: () => void,
  onYesLeave?: () => void
}

export const Message = ({ onSelect, onNoHover, onNoLeave, onYesHover, onYesLeave }: Props) => {
  const props = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    }
  })
  const onYes = useCallback(() => {
    getAnalytics().increaserPromotionYes()
    onSelect()
  }, [onSelect])

  const onNo = useCallback(() => {
    getAnalytics().increaserPromotionNo()
    onSelect()
  }, [onSelect])
  return (
    <Container style={props}>
      <ContentWr>
        <Content>
          <Connector>
            <svg
              width="65"
              height="78"
              viewBox="0 0 95 95"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0 0C0 0 24.8936 38.9937 47 58C57.5966 67.1106 73.8292 77.0249 84.1762 83C90.03 86.3804 94 95 94 95L94.5 36C94.5 36 88.5727 43.1045 81 41.4825C70.8874 39.3165 56.9488 35.8549 47 31.5C26.7586 22.6397 0 0 0 0Z"
                fill="white"
              ></path>
            </svg>
          </Connector>
          <VStack alignItems="start" gap={16}>
            <Text size={17} color={TextColor.REVERSED}>
              Hi there! Can I share a cool thing I'm working on with you?
            </Text>
            <HStack justifyContent="start" style={{ marginLeft: -16, marginBottom: - 8 }}>
              <Button
                onMouseEnter={onYesHover}
                onMouseLeave={onYesLeave}
                as="a"
                href={ResourceUrl.Increaser}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onYes}
                style={{ color: 'rgb(230, 0, 103)' }}
              >
                Sure!
              </Button>
              <Button
                onMouseEnter={onNoHover}
                onMouseLeave={onNoLeave}
                onClick={onNo}>
                  Nah, I'm good
              </Button>
            </HStack>
          </VStack>
        </Content>
      </ContentWr>
    </Container>
  )
}
