import {
  OPENMYDRAWER,
  CLOSEMYDRAWER,
  CHANGETABITEM,
  DOWNLOADDATA,
  PULLLOADDATA
} from '../../constants/index/index'
import { request } from '../../utils/request'
import { API_TOPICS } from '../../constants/api'

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