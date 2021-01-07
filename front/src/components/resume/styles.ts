import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px 0;
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
  background: ${p => p.theme.blog.color.background};
  box-shadow: ${p => p.theme.shadow.default};
  padding: 20px;
  display: flex;
  flex-direction: column;
  @media print {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export const Contacts = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`

export const Content = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 40px;
  flex: 1;
`

export const Side = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`