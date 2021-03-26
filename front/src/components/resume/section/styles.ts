import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 12px;
  position: relative;
  overflow: hidden;
`

export const Background = styled.div`
  left: 0;
  top: 0;
  position: absolute;
  opacity: 0.1;
  width: 100%;
  height: 100%;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  gap: 20px;
`
