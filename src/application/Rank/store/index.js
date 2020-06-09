import produce from 'immer'
import { getRankListRequest } from '@/api/request'

export const CHANGE_RANK_LIST = 'home/rank/CHANGE_RANK_LIST'
export const CHANGE_LOADING = 'home/rank/CHANGE_LOADING'

const changeRankList = (data) => ({
  type: CHANGE_RANK_LIST,
  data,
})

const changeLoading = (data) => ({
  type: CHANGE_LOADING,
  data,
})

export const getRankList = () => async (dispatch) => {
  try {
    const data = await getRankListRequest()
    const list = data && data.list
    dispatch(changeRankList(list))
    dispatch(changeLoading(false))
  } catch (err) {
    console.log('获取排行榜数据错误')
  }
}

const defaultState = {
  rankList: [],
  loading: true,
}

const reducer = (state = defaultState, action) => produce(state, (draft) => {
  switch (action.type) {
    case CHANGE_RANK_LIST:
      draft.rankList = action.data
      break
    case CHANGE_LOADING:
      draft.loading = action.data
      break
    default:
  }
})

export { reducer }
