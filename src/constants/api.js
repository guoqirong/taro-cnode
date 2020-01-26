
import config from '../constants/config'

// 主题
export const API_TOPICS = `${config.GATEWAY_URL}/api/v1/topics`
export const API_TOPIC = `${config.GATEWAY_URL}/api/v1/topic/`

// 主题收藏
export const API_TOPIC_COLLECT = `${config.GATEWAY_URL}/api/v1/topic_collect/collect`
export const API_TOPIC_DECOLLECT = `${config.GATEWAY_URL}/api/v1/topic_collect/de_collect`
export const API_TOPIC_COLLECTLIST = `${config.GATEWAY_URL}/api/v1/topic_collect/`

// 用户
export const API_USER = `${config.GATEWAY_URL}/api/v1/user/`
export const API_ACCESSTOKEN = `${config.GATEWAY_URL}/api/v1/accesstoken`

// 消息通知
export const API_MESSAGE_COUNT = `${config.GATEWAY_URL}/api/v1/message/count`
export const API_MESSAGE = `${config.GATEWAY_URL}/api/v1/messages`
export const API_MESSAGE_MARKALL = `${config.GATEWAY_URL}/api/v1/message/mark_all`
export const API_MESSAGE_MARKONE = `${config.GATEWAY_URL}/api/v1/message/mark_one/`
