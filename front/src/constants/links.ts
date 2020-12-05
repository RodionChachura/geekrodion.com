const getUrl = (domain: string) => `https://${domain}`
const getEmbeddedLanding = (url: string) => `${url}/embedded-landing`

export enum Resource {
  Increaser = 'increaser.org',
  BooksConcepts = 'booksconcepts.com',
  WebSite = 'geekrodion.com',

  Instagram = 'instagram.com/geekrodion',
  LinkedIn = 'linkedin.com/in/geekrodion',
  YouTube = 'youtube.com/channel/UC15iv69GgcJWa8GoohNQzpw',
  Medium = 'geekrodion.medium.com',
  GitHub = 'github.com/RodionChachura',
  Twitter = 'twitter.com/geekrodion',
}

export const ResourceUrl: Partial<Record<keyof typeof Resource, string>> = Object.fromEntries(
  Object.entries(Resource).map(([key, value]) => [key, getUrl(value)])
)

export const EMAIL = 'geekrodion@gmail.com'

export const EMBEDDED_INCREASER = getEmbeddedLanding(ResourceUrl.Increaser)
export const EMBEDDED_BOOKSCONCEPTS = getEmbeddedLanding(ResourceUrl.BooksConcepts)