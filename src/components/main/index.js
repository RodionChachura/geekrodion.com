import React from 'react'
import styled from 'styled-components'
import { DateTime } from 'luxon'


import Page from '../page'
import { connectTo } from '../../utils/generic';
import { DOB } from '../../constants';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`

const InfoPart = styled.div`
  width: 50%;
  height: 100%;
  background: lightblue;
`

const PhotoPart = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: lightcoral;
`

const PhotoContainer = styled.div`
  position: relative;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: lightcyan
`

const Photo = styled.img`
  height: 100%;
  width: 100%;
`

const UpPhotoPart = styled.div`
  position: absolute;
  top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Quote = styled.a`
  background-color: #001f3f;
  padding: 2px;
  color: ${props => props.theme.color.fontColor};
  font-style: italic;
  font-size: 24px;
  cursor: pointer;
  :hover {
    transition: all 0.4s cubic-bezier(0.42, 0, 0.58, 1);
    background-color: ${props => props.theme.color.fontColor};
    color: #001f3f;
  }
`

const Age = styled.h5`
  margin-top: 10px;
  background-color: #001f3f;
  font-size: 24px;

  color: ${props => props.theme.color.fontColor}
`


export default connectTo(
  state => ({
    ...state.main,
    ...state.generic
  }),
  {},
  ({ photo, pageWidth, pageHeight }) => {
    console.log(pageWidth, pageHeight)
    const { years, months, days } = DateTime.fromMillis(Date.now()).diff(DOB,[ 'year', 'months', 'days'])
    return (
      <Page style={{height: '100%'}}>
        <Container>
          <InfoPart/>
          <PhotoPart>
           <PhotoContainer size={Math.min(pageWidth / 2, pageHeight) * 0.9}>
            <Photo src={photo} />
            <UpPhotoPart>
              <Quote target="_blank" href="https://medium.com/@geekrodion/increaser-mindset-dc828a2bcd4d">Time waits for no one, and it won’t wait for me</Quote>
              <Age>{Math.round(years)} years {Math.round(months)} months {Math.round(days)} days</Age>
            </UpPhotoPart>
           </PhotoContainer>
          </PhotoPart>
        </Container>
      </Page>
    )
  }
)