import React from 'react'
import styled from 'styled-components'

interface Props {
  direction: 'row' | 'column',
  gap?: number
  alignItems?: 'center' | 'start' | 'end'
  justifyContent?: 'start' | 'end' | 'center' | 'space-between' | 'space-around',
  children: React.ReactNode
}

const alignItemsFlexbox = {
  center: 'center',
  start: 'flexbox-start',
  end: 'flexbox-end'
}

const justifyContentFlexbox = {
  center: 'center',
  start: 'flexbox-start',
  end: 'flexbox-end',
  'space-between': 'space-between',
  'space-around': 'space-around'
}

const Stack = styled.div<Props>`
  display: flex;
  flex-direction: ${p => p.direction};
  gap: ${p => p.gap || 0}px;
  align-items: ${p => alignItemsFlexbox[p.alignItems || 'center']};
  justify-content: ${p => justifyContentFlexbox[p.justifyContent || 'center']};
`

export const VStack = (props: Omit<Props, 'direction'>) => (
  <Stack direction="column" {...props} />
)

export const HStack = (props: Omit<Props, 'direction'>) => (
  <Stack direction="row" {...props} />
)
