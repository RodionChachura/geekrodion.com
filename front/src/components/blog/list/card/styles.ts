import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: ${p => p.theme.shadow.default};
  overflow: hidden;
  width: 100%;
  justify-content: space-between;
  background: ${p => p.theme.color.secondaryBackground};
`

export const Content = styled.div`
  margin: 10px;
`

export const KeywordsContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`

export const Keyword = styled.div`
  height: 32px;
  padding: 0 6px;
  border-radius: 16px;
  box-shadow: ${p => p.theme.shadow.default};
  background: ${p => p.theme.color.secondaryBackground};
  margin: 0 5px 5px 0;
`