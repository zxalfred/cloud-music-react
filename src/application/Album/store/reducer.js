import produce from 'immer'
import * as actionTypes from './constants'

const defaultState = {
  currentAlbum: {},
  enterLoading: false,
}

export default (state = defaultState, action) => produce(state, (draft) => {
  switch (action.type) {
    case actionTypes.CHANGE_CURRENT_ALBUM:
      draft.currentAlbum = action.data
      break
    case actionTypes.CHANGE_ENTER_LOADING:
      draft.enterLoading = action.data
      break
    default:
  }
})
