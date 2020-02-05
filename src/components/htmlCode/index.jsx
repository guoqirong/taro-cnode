import { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import WxParse from '../wxParse/wxParse'

import './index.scss'

class HtmlCode extends Component {
  render () {
    if (process.env.TARO_ENV === 'weapp' && this.props.data) {
      WxParse.wxParse('article', 'html', this.props.data, this.$scope, 5)
    }
    return process.env.TARO_ENV != 'weapp' ? (
      <View style='overflow-wrap: break-word' dangerouslySetInnerHTML={{__html: this.props.data}}>{}</View>
    ) : (
      <View>
        <import src='../wxParse/wxParse.wxml' />
        <template is='wxParse' data='{{wxParseData:article.nodes}}'/>
      </View>
    )
  }
}

export default HtmlCode