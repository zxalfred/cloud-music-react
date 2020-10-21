import { getSingerInfoRequest } from '@/api/request'
import * as actionTypes from './constants'

const changeArtist = (data) => ({
  type: actionTypes.CHANGE_ARTIST,
  data,
})

const changeSongs = (data) => ({
  type: actionTypes.CHANGE_SONGS_OF_ARTIST,
  data,
})

export const changeEnterLoading = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data,
})

export const getSingerInfo = (id) => async (dispatch) => {
  try {
    const res = await getSingerInfoRequest(id)
    dispatch(changeArtist(res.artist))
    dispatch(changeSongs(res.hotSongs))
    dispatch(changeEnterLoading(false))
  } catch (err) {
    console.log('获取歌手详情失败')
  }
}
