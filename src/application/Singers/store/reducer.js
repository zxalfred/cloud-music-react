import produce from 'immer'
import * as actionTypes from './constants'

const defaultState = {
  singerList: [], // 列表
  enterLoading: false, // 进场加载动画
  pullUpLoading: false, // 上拉加载动画
  pullDownLoading: false, // 下拉加载动画
  pageCount: 0, // 当前页数
  reachedBottom: false, // 是否加载完了
}

export default (state = defaultState, action) => produce(state, (draft) => {
  switch (action.type) {
    case actionTypes.CHANGE_SINGER_LIST:
      draft.singerList = action.data
      break
    case actionTypes.CHANGE_PAGE_COUNT:
      draft.pageCount = action.data
      break
    case actionTypes.CHANGE_ENTER_LOADING:
      draft.enterLoading = action.data
      break
    case actionTypes.CHANGE_PULLUP_LOADING:
      draft.pullUpLoading = action.data
      break
    case actionTypes.CHANGE_PULLDOWN_LOADING:
      draft.pullDownLoading = action.data
      break
    case actionTypes.CHANGE_REACHED_BOTTOM:
      draft.reachedBottom = action.data
      break
    default:
  }
})
