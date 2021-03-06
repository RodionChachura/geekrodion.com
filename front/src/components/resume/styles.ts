import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px 0;
  background: var(--background-light-color);
  @media print {
    padding: 0;
  }
`

const WIDTH = 900
// const A4_RATIO = 1.41
// const HEIGHT = WIDTH * A4_RATIO

export const Container = styled.div`
  position: relative;
  border-radius: 20px;
  width: ${WIDTH}px;
  background: var(--background-color);
  box-shadow: var(--default-shadow);
  padding: 20px;
  display: flex;
  flex-direction: column;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media print {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`

export const Content = styled.div`
  display: flex;
  gap: 20px;
  flex: 1;
`

export const Side = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const InlineText = styled.div`
  display: flex;
  gap: 10px;
`

export const SectionPartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`
