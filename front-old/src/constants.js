import { DateTime } from 'luxon'

export const TICK_PERIOD = 500
export const PHOTO_PERIOD = 5000

export const PHOTOS = Array.from(Array(14).keys()).map(
  number => `/photos/${number}.jpg`
)

export const DOB = DateTime.fromMillis(892371600000)

export const EMAIL = 'geekrodion@gmail.com'
export const POMODORO_ACTIVE_USERS_URL =
  'https://9pzddbezx9.execute-api.eu-central-1.amazonaws.com/tf-analytics-taker/tf-analytics-taker'

export const BOOKS_CONCEPTS_URL = 'https://booksconcepts.com'
export const POMODORO_URL = 'https://increaser.org'
export const MEDIUM_URL = 'https://medium.com/@geekrodion'
export const UDEMY_URL = 'https://www.udemy.com/user/rodion-chachura/'
export const SKILLSHARE_URL =
  'https://www.skillshare.com/r/profile/Rodion-Chachura/4366140'
export const YOUTUBE_INCREASER_URL =
  'https://www.youtube.com/channel/UCPl7uA48MtZrOGWtIZM62Jg'
export const YOUTUBE_CODING_URL =
  'https://www.youtube.com/channel/UC15iv69GgcJWa8GoohNQzpw'
export const GITHUB_URL = 'https://github.com/RodionChachura'
export const LINKEDIN_URL =
  'https://www.linkedin.com/in/rodion-chachura-04aa8a156/'
export const INSTAGRAM_URL = 'https://www.instagram.com/geekrodion/'
export const TIME_WAITS_FOR_NO_ONE_URL =
  'https://medium.com/@geekrodion/increaser-mindset-dc828a2bcd4d'
