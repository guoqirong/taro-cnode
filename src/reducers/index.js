import { combineReducers } from 'redux'
import index from './index/index'
import user from './user/index'

export default combineReducers({
  index,
  user
})
