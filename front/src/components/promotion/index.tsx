import React, { useEffect, useState } from 'react'
import { getAnalytics } from 'src/utils/analytics'

import { Author } from './author'
import { Message } from './message'

interface Props {
  
}

const key = 'gr-increaser-promotion-28-3-2021'

const storage = {
  get: () => Boolean(window?.localStorage?.getItem('key')),
  set: () => window?.localStorage?.setItem(key, Date.now().toString())
}

const getIsShownFromStorage = () => {
  return Boolean(window?.localStorage?.getItem('key'))
}

export const Promotion = ({}: Props) => {
  const [isShown, setIsShown] = useState(() => storage.get())

  useEffect(() => {
    if (!isShown) {
      getAnalytics().increaserPromotionShow()
    }
  }, [])

  useEffect(() => {
    if (isShown && !getIsShownFromStorage()) {
      storage.set()
    } 
  }, [isShown])

  if (isShown) {
    return null
  }

  return (
    <>
      <Author/>
      <Message onSelect={() => setIsShown(true)}/>
    </>
  )
}
