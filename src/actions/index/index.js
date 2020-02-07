import {
  OPENMYDRAWER,
  CLOSEMYDRAWER,
  CHANGETABITEM,
  DOWNLOADDATA,
  PULLLOADDATA,
  GETTOPICDETAIL,
  COLLECTTOPIC,
  DECOLLECTTOPIC,
  GETCOLLECTLIST
} from '../../constants/index/index'
import { request } from '../../utils/request'
import { API_TOPICS, API_TOPIC, API_TOPIC_COLLECT, API_TOPIC_DECOLLECT, API_TOPIC_COLLECTLIST } from '../../constants/api'

export const openmydrawer = () => {
  return {
    type: OPENMYDRAWER
  }
}
export const closemydrawer = () => {
  return {
    type: CLOSEMYDRAWER
  }
}
export const savedatachange = (resData) => {
  return resData
}
export const changetabitem = (data) => {
  return dispatch => {
    request({
      url: API_TOPICS,
      method: 'GET',
      data: {
        page: 1,
        tab: data.key,
        limit: 20,
        mdrender: true
      }
    }).then((res) => {
      let resData = {
        type: CHANGETABITEM,
        data: data,
        searchData: {
          page: 1,
          tab: data.key,
          limit: 20,
          mdrender: true
        },
        dataList: res
      }
      dispatch(savedatachange(resData))
    }).catch((e) => {
      dispatch(closemydrawer())
      console.log(e)
    })
  }
}
export const downloaddata = (data) => {
  return dispatch => {
    request({
      url: API_TOPICS,
      method: 'GET',
      data: {
        page: 1,
        tab: data.tab,
        limit: 20,
        mdrender: true
      }
    }).then((res) => {
      let resData = {
        type: DOWNLOADDATA,
        data: data,
        searchData: {
          page: 1,
          tab: data.tab,
          limit: 20,
          mdrender: true
        },
        dataList: res
      }
      dispatch(savedatachange(resData))
    }).catch((e) => {
      console.log(e)
    })
  }
}
export const pullloaddata = (data) => {
  return dispatch => {
    request({
      url: API_TOPICS,
      method: 'GET',
      data: {
        page: data.page,
        tab: data.tab,
        limit: 20,
        mdrender: true
      }
    }).then((res) => {
      let resData = {
        type: PULLLOADDATA,
        data: data,
        searchData: {
          page: data.page,
          tab: data.tab,
          limit: 20,
          mdrender: true
        },
        dataList: res
      }
      dispatch(savedatachange(resData))
    }).catch((e) => {
      console.log(e)
    })
  }
}
export const gettopicdetail = (data) => {
  return dispatch => {
    request({
      url: API_TOPIC + data.id,
      method: 'GET',
      data: {
        accesstoken: data.token
      }
    }).then((res) => {
      let resData = {
        type: GETTOPICDETAIL,
        dataDetail: res
      }
      dispatch(savedatachange(resData))
    }).catch((e) => {
      console.log(e)
    })
  }
}
export const collecttopic = (data) => {
  return dispatch => {
    request({
      url: API_TOPIC_COLLECT,
      method: 'POST',
      data: {
        accesstoken: data.token,
        topic_id: data.id
      }
    }).then((res) => {
      let resData = {
        type: COLLECTTOPIC,
        is_collect: true
      }
      dispatch(savedatachange(resData))
    }).catch((e) => {
      console.log(e)
    })
  }
}
export const decollecttopic = (data) => {
  return dispatch => {
    request({
      url: API_TOPIC_DECOLLECT,
      method: 'POST',
      data: {
        accesstoken: data.token,
        topic_id: data.id
      }
    }).then((res) => {
      let resData = {
        type: DECOLLECTTOPIC,
        is_collect: false
      }
      dispatch(savedatachange(resData))
    }).catch((e) => {
      console.log(e)
    })
  }
}
export const getcollectlist = (data) => {
  return dispatch => {
    request({
      url: API_TOPIC_COLLECTLIST + data.userName,
      method: 'GET'
    }).then((res) => {
      let resData = {
        type: GETCOLLECTLIST,
        collectList: res
      }
      dispatch(savedatachange(resData))
    }).catch((e) => {
      console.log(e)
    })
  }
}