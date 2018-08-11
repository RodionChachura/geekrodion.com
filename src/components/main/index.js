import React from 'react'
import styled from 'styled-components'

import Page from '../page'
import { connectTo } from '../../utils/generic';
import Achievements from './achievements'
import Header from './header'
import WriteMe from './write-me'
import UpPhotoPart from './up-photo-part'
import BottomPhotoPart from './bottom-photo-part'


const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  background: ${props => props.theme.color.backgroundColor};
`

const InfoPart = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  width: ${props => props.width}px
`

const PhotoPart = styled.div`
  position: relative;
  width: ${props => props.size};
  height: ${props => props.size};
  display: flex;
  justify-content: center;
  align-items: center;
`

const Photo = styled.img`
  height: 100%;
  width: 100%;
`

const AchievementsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
`

const MobileContainer = styled.div`
  background: ${props => props.theme.color.backgroundColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
  overflow-x: hidden;
`

export default connectTo(
  state => ({
    ...state.main,
    ...state.generic
  }),
  {},
  ({ photo, pageWidth, pageHeight }) => {
    console.log(pageHeight / Math.abs(pageWidth - pageHeight))
    const mobile = pageHeight > pageWidth * 1.5 || pageHeight / Math.abs(pageWidth - pageHeight) > 1.8
    return mobile ? (
      <Page>
        <MobileContainer>
          <Header/>
          <PhotoPart size={'100vw'}>
            <Photo src={photo} />
            <UpPhotoPart/>
            <BottomPhotoPart/>
          </PhotoPart>
          <Achievements/>
          <WriteMe/>
        </MobileContainer>
      </Page>
    ) : (
      <Page style={{height: '100%'}}>
        <Container>
          <InfoPart width={pageWidth - pageHeight}>
            <Header/>
            <AchievementsContainer>
              <Achievements/>
            </AchievementsContainer>
            <WriteMe/>
          </InfoPart>
          <PhotoPart size={'100vh'}>
            <Photo src={photo} />
            <UpPhotoPart/>
            <BottomPhotoPart/>
          </PhotoPart>
        </Container>
      </Page>
    )
  }
)