import { getBannerRequest, getRecommendListRequest } from '@/api/request'
import * as actionTypes from './constants'

export const changeBannerList = (data) => ({
  type: actionTypes.CHANGE_BANNER,
  data,
})

export const changeRecommendList = (data) => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  data,
})

export const changeEnterLoading = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data,
})

export const getBannerList = () => async (dispatch) => {
  try {
    const data = await getBannerRequest()
    dispatch(changeBannerList(data.banners))
  } catch (err) {
    console.log('轮播图数据获取错误')
  }
}

export const getRecommendList = () => async (dispatch) => {
  try {
    const data = await getRecommendListRequest()
    dispatch(changeRecommendList(data.result))
    dispatch(changeEnterLoading(false))
  } catch (err) {
    console.log('推荐歌单数据获取错误')
  }
}
