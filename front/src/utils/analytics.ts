const trackEvent = (name: string, props?: any) => {
  console.log(process.env.NODE_ENV, name)
  if (process.env.NODE_ENV !== 'production') {
    return
  }

  try {
    (window as any)?.amplitude.getInstance().logEvent(name, props)
  } catch (err) {
    console.log('Fail to track event with Amplitude', { name }, err)
  }

}

class Analytics {
  increaserPromotionShow() {
    trackEvent('Increaser Promotion Show')
  }
  
  increaserPromotionYes() {
    trackEvent('Increaser Promotion Yes')
  }

  increaserPromotionNo() {
    trackEvent('Increaser Promotion No')
  }
}

let analytics

export const getAnalytics = (): Analytics => {
  if (!analytics) {
    analytics = new Analytics()
  }
  return analytics
}
