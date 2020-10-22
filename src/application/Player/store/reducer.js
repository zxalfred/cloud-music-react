import produce from 'immer'
import { playMode } from '@/api/config'
import * as actionTypes from './constants'

const defaultState = {
  fullScreen: false, // 播放器是否全屏
  playing: false, // 当前歌曲是否播放
  sequencePlayList: [], // 顺序播放列表
  playList: [], // 播放列表
  mode: playMode.sequence,
  currentIndex: -1, // 当前歌曲在播放列表中的索引
  showPlayList: false, // 是否展示播放列表
  currentSong: {},
}

export default (state = defaultState, action) => produce(state, (draft) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_SONG:
      draft.currentSong = action.data
      break
    case actionTypes.SET_FULL_SCREEN:
      draft.fullScreen = action.data
      break
    case actionTypes.SET_PLAYING_STATE:
      draft.playing = action.data
      break
    case actionTypes.SET_SEQUECE_PLAYLIST:
      draft.sequencePlayList = action.data
      break
    case actionTypes.SET_PLAYLIST:
      draft.playList = action.data
      break
    case actionTypes.SET_PLAY_MODE:
      draft.mode = action.data
      break
    case actionTypes.SET_CURRENT_INDEX:
      draft.currentIndex = action.data
      break
    case actionTypes.SET_SHOW_PLAYLIST:
      draft.showPlayList = action.data
      break
    default:
  }
})
