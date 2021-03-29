import React, { useEffect, useState } from 'react'
import { getAnalytics } from 'src/utils/analytics'

import { Author } from './author'
import { Message } from './message'

interface Props {
  
}

const key = 'gr-increaser-promotion-28-3-2021'

const storage = {
  get: () => Boolean(typeof window !== `undefined` && window?.localStorage?.getItem('key')),
  set: () => typeof window !== `undefined` && window?.localStorage?.setItem(key, Date.now().toString())
}

export const Promotion = ({}: Props) => {
  const [isShown, setIsShown] = useState(() => storage.get())
  const [isAuthorAnimationFinished, setIsAuthorAnimationFinished] = useState(false)

  useEffect(() => {
    if (!isShown) {
      getAnalytics().increaserPromotionShow()
    }
  }, [])

  useEffect(() => {
    if (isShown && !storage.get()) {
      storage.set()
    } 
  }, [isShown])

  if (isShown) {
    return null
  }

  return (
    <>
      <Author onAnimationFinish={() => setIsAuthorAnimationFinished(true)} />
      {isAuthorAnimationFinished && (
        <Message onSelect={() => setIsShown(true)}/>
      )}
    </>
  )
}
