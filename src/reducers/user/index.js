import { SETTOKEN, ACCESSTOKEN, CLEARSUSERINFO, GETUSERINFO, GETMESSAGECOUNT, GETMESSAGELIST } from '../../constants/user/index'
import Taro from '@tarojs/taro'

const USER_STATE = {
  token: '',
  simpleUserInfo: {},
  userInfo: {},
  messageCount: 0,
  messageList: {}
}

export default function index (state = USER_STATE, action) {
  Taro.hideLoading()
  switch (action.type) {
    case SETTOKEN:
      return {
        ...state,
        token: action.token
      }
    case ACCESSTOKEN:
      return {
        ...state,
        simpleUserInfo: action.data
      }
    case CLEARSUSERINFO:
      return {
        ...state,
        simpleUserInfo: {},
        messageCount: 0
      }
    case GETUSERINFO:
      return {
        ...state,
        userInfo: action.data
      }
    case GETMESSAGECOUNT:
      return {
        ...state,
        messageCount: action.data
      }
    case GETMESSAGELIST:
      return {
        ...state,
        messageList: action.data
      }
    default:
      return state
  }
}