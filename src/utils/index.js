import Taro from '@tarojs/taro'
/**
 * 日期格式化 gqr
 * @param {*} dateStr
 * @param {*} fmt
 */
export function formatDate (dateStr, fmt) {
  let date = new Date(dateStr)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}

// 补零函数
function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

/**
 * 获取uuid
 */
export function getUUID () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
  })
}

/**
 * 本地保存数据
 * @param {*} key 
 * @param {*} val 
 */
export function setLocalStorage (key, val) {
  Taro.setStorageSync(key, val)
  // // weapp
  // if(process.env.TARO_ENV == 'weapp') {
  //   wx.setStorage({
  //     key: key,
  //     data: val,
  //     success: (res) => {
  //       console.log("保存成功")
  //     }
  //   })
  // } else {
  //   // h5 和 alipay
  //   localStorage.setItem(key, val)
  // }
}

/**
 * 获取本地保存数据
 * @param {*} key 
 */
export function getLocalStorage (key) {
  return Taro.getStorageSync(key)
  // // weapp
  // if(process.env.TARO_ENV == 'weapp') {
  //   let val = ''
  //   wx.getStorage({
  //     key: key,
  //     success: (res) => {
  //       val = res.data
  //     }
  //   })
  //   return val
  // } else {
  //   // h5 和 alipay
  //   return localStorage.getItem(key)
  // }
}