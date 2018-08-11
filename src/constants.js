import { DateTime } from 'luxon'

export const TICK_PERIOD = 500
export const PHOTO_PERIOD = 5000

export const PHOTOS = Array.from(Array(8).keys()).map(number => `/photos/${number}.jpg`)

export const DOB = DateTime.fromMillis(892371600000)

export const THEME = {
  color: {
    fontColor: '#FFFFFF'
  }
}