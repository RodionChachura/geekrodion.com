import styled from 'styled-components'

const HEIGHT = 34
const WIDTH = 90

export const Container = styled.div`
  position: absolute;
  border-radius: 5px;
  box-shadow: 2px 14px 20px #0C111467;
  background: ${p => p.theme.color.primary};
  cursor: pointer;
  right: -${WIDTH + 5}px;
  top: -${HEIGHT}px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${HEIGHT}px;
  width: ${WIDTH}px;
`