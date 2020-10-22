import * as actionTypes from './constants'

export const changeCurrentSong = (data) => ({
  type: actionTypes.SET_CURRENT_SONG,
  data,
})

export const changeFullScreen = (data) => ({
  type: actionTypes.SET_FULL_SCREEN,
  data,
})

export const changePlayingState = (data) => ({
  type: actionTypes.SET_PLAYING_STATE,
  data,
})

export const changeSequecePlayList = (data) => ({
  type: actionTypes.SET_SEQUECE_PLAYLIST,
  data,
})

export const changePlayList = (data) => ({
  type: actionTypes.SET_PLAYLIST,
  data,
})

export const changePlayMode = (data) => ({
  type: actionTypes.SET_PLAY_MODE,
  data,
})

export const changeCurrentIndex = (data) => ({
  type: actionTypes.SET_CURRENT_INDEX,
  data,
})

export const changeShowPlayList = (data) => ({
  type: actionTypes.SET_SHOW_PLAYLIST,
  data,
})
