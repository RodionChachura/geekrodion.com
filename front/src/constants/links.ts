const getUrl = (domain: string) => `https://${domain}`
const getEmbeddedLanding = (url: string) => `${url}/embedded-landing`

export const INCREASER = getUrl('increaser.org')
export const BOOKSCONCEPTS = getUrl('booksconcepts.com')

export const EMBEDDED_INCREASER = getEmbeddedLanding(INCREASER)
export const EMBEDDED_BOOKSCONCEPTS = getEmbeddedLanding(BOOKSCONCEPTS)