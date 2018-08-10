import React from 'react'
import styled from 'styled-components'

import Page from '../page'
import { connectTo } from '../../utils/generic';

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
  background: lightcoral;
`

export default connectTo(
  state => ({
    ...state.main
  }),
  {},
  ({ photo }) => {
    
    return (
      <Page style={{height: '100%'}}>
        <Container>
          <InfoPart/>
          <PhotoPart/>
          {/* <img src={photo} alt={''} /> */}
        </Container>
      </Page>
    )
  }
)