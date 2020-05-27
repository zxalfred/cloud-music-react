import produce from 'immer'
import * as actionTypes from './constants'

const defaultState = {
  bannerList: [],
  recommendList: [],
  enterLoading: true,
}

export default (state = defaultState, action) => produce(state, (draft) => {
  switch (action.type) {
    case actionTypes.CHANGE_BANNER:
      draft.bannerList = action.data
      break
    case actionTypes.CHANGE_RECOMMEND_LIST:
      draft.recommendList = action.data
      break
    default:
  }
})
