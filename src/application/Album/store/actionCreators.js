import { getAlbumDetailRequest } from '@/api/request'
import { CHANGE_CURRENT_ALBUM, CHANGE_ENTER_LOADING } from './constants'

const changeCurrentAlbum = (data) => ({
  type: CHANGE_CURRENT_ALBUM,
  data,
})

export const changeEnterLoading = (data) => ({
  type: CHANGE_ENTER_LOADING,
  data,
})

export const getAlbumList = (id) => async (dispatch) => {
  try {
    const res = await getAlbumDetailRequest(id)
    dispatch(changeCurrentAlbum(res.playlist))
    dispatch(changeEnterLoading(false))
  } catch (err) {
    console.log('获取歌单数据失败')
  }
}
