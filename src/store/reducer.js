import { combineReducers } from 'redux'
import { reducer as recommendReducer } from '@/application/Recommend/store'

export default combineReducers({
  recommend: recommendReducer,
})
