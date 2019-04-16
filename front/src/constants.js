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
export const JOB_URL = 'https://www.kreo.net/'
export const POMODORO_URL = 'https://pomodoro.increaser.org'
export const MEDIUM_URL = 'https://medium.com/@geekrodion'
export const TIME_WAITS_FOR_NO_ONE_URL =
  'https://medium.com/@geekrodion/increaser-mindset-dc828a2bcd4d'
