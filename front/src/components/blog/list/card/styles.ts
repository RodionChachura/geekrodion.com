import styled from 'styled-components'
import { Link } from 'gatsby'

export const Container = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: ${p => p.theme.shadow.default};
  overflow: hidden;
  width: 100%;
  justify-content: space-between;
  background: ${p => p.theme.color.secondaryBackground};
  cursor: pointer;
  transition: ${p => p.theme.transition.default};
  border: 2px solid transparent;
  :hover {
    border-color: ${p => p.theme.color.primary};
  }
`

export const Content = styled.div`
  margin: 10px;
`

export const KeywordsContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export const Keyword = styled.div`
  height: 30px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  box-shadow: ${p => p.theme.shadow.small};
  background: ${p => p.theme.color.secondaryBackground};
  margin: 0 5px 5px 0;
`

export const PartsBadgeContainer = styled.div`
  width: 100%;
  height: 40px;
  background: ${p => p.theme.color.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`