import { createReducer } from 'redux-act'
import _ from 'lodash'

import * as a from '../actions/main'
import { PHOTO_PERIOD, PHOTOS } from '../constants'

const DEFAULT_STATE = {
  photo: _.sample(PHOTOS),
  viewedPhotos: [],
  lastPhotoChange: Date.now(),
  activeUsers: {
    pomodoro: 0
  }
}

export default createReducer(
  {
    [a.tick]: state => {
      const now = Date.now()
      const timeFromLastChange = now - state.lastPhotoChange
      if (timeFromLastChange > PHOTO_PERIOD) {
        const newViewedPhotos = [...state.viewedPhotos, state.photo]
        const viewedPhotos =
          newViewedPhotos.length === PHOTOS.length ? [] : newViewedPhotos
        const photo = _.sample(_.difference(PHOTOS, viewedPhotos))
        return { ...state, viewedPhotos, photo, lastPhotoChange: now }
      }

      return state
    },
    [a.updateActiveUsersNumber]: (state, { app, number }) => ({
      ...state,
      activeUsers: {
        ...state.activeUsers,
        [app]: number
      }
    })
  },
  DEFAULT_STATE
)
