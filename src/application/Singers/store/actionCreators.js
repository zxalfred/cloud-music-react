import {
  getHotSingerListRequest,
  getSingerListRequest,
} from '@/api/request'
import * as actionTypes from './constants'

const changeSingerList = (data) => ({
  type: actionTypes.CHANGE_SINGER_LIST,
  data,
})

export const changePageCount = (data) => ({
  type: actionTypes.CHANGE_PAGE_COUNT,
  data,
})

export const changeEnterLoading = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADIGN,
  data,
})

export const changePullUpLoading = (data) => ({
  type: actionTypes.CHANGE_PULLUP_LOADING,
  data,
})

export const changePullDownLoading = (data) => ({
  type: actionTypes.CHANGE_PULLDOWN_LOADING,
  data,
})

export const getHotSingerList = () => async (dispatch) => {
  try {
    const res = await getHotSingerListRequest(0)
    dispatch(changeSingerList(res.artists))
    dispatch(changeEnterLoading(false))
    dispatch(changePullDownLoading(false))
  } catch (err) {
    console.log('热门歌手数据获取失败')
  }
}

export const getMoreHotSingerList = () => async (dispatch, getState) => {
  try {
    const state = getState()
    const { pageCount, singerList } = state.singers
    const res = await getHotSingerListRequest(pageCount)
    dispatch(changeSingerList([...singerList, ...res.artists]))
    dispatch(changePullUpLoading(false))
  } catch (err) {
    console.log('热门歌手数据获取失败')
  }
}

export const getSingerList = (category, alpha) => async (dispatch) => {
  try {
    const res = await getSingerListRequest(category, alpha, 0)
    dispatch(changeSingerList(res.artists))
    dispatch(changeEnterLoading(false))
    dispatch(changePullDownLoading(false))
  } catch (err) {
    console.log('歌手数据获取失败')
  }
}

export const getMoreSingerList = (category, alpha) => async (dispatch, getState) => {
  try {
    const { pageCount, singerList } = getState().singers
    const res = await getSingerListRequest(category, alpha, pageCount)
    dispatch(changeSingerList([...singerList, ...res.artists]))
    dispatch(changePullDownLoading(false))
  } catch (err) {
    console.log('歌手数据获取失败')
  }
}
