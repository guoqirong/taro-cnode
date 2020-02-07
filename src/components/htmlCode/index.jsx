import { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import WxParse from '../wxParse/wxParse'

import './index.scss'

class HtmlCode extends Component {
  
  imgContent (content) {
    let str = content
    // 匹配图片（g表示匹配所有结果i表示区分大小写）
    let imgReg = /<img.*?(?:>|\/>)/gi
    let arr = str.match(imgReg)
    if (arr && arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        let imgArr = arr[i].split(' ')
        let img = ''
        for (let key in imgArr) {
          if (key == 0) {
            img = imgArr[key] + ' style="width: 100%"'
          } else {
            img = img + ' ' + imgArr[key]
          }
        }
        str = str.replace(arr[i], img)
      }
    }
    return str
  }

  render () {
    let imgContent = ''
    if (process.env.TARO_ENV === 'weapp' && this.props.data) {
      WxParse.wxParse('article', 'html', this.props.data, this.$scope, 5)
    } else {
      if (this.props.data) {
        imgContent = this.imgContent(this.props.data)
      }
    }
    return process.env.TARO_ENV != 'weapp' && imgContent ? (
      <View style='overflow-wrap: break-word' dangerouslySetInnerHTML={{__html: imgContent}}></View>
    ) : (
      <View>
        <import src='../wxParse/wxParse.wxml' />
        <template is='wxParse' data='{{wxParseData:article.nodes}}'/>
      </View>
    )
  }
}

export default HtmlCode