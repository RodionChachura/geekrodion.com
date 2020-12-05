import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

export const Container = styled.div`
  width: 100%;
  border-radius: 20px;
  width: 1000px;
  height: 700px;
  background: ${p => p.theme.blog.color.background};
  box-shadow: ${p => p.theme.shadow.default};
  padding: 20px;
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