import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { formatDate } from '../../../utils/index'

import './myList.scss'

class MyList extends Component {

  config = {
    navigationBarTitleText: ''
  }

  state={}

  gotoDetail (id) {
    Taro.navigateTo({
      url: `/pages/detail/index?id=${id}`
    })
  }

  getTab(val) {
    for (let i = 0; i < this.props.tabList.length; i++) {
      let item = this.props.tabList[i];
      if (item.key === val) {
        return item.name
      }
    }
  }

  render() {
    return (
      <View className='my-list at-list' style={this.props.isNotTop ? 'margin-top: 0px' : ''}>
        {
          this.props.dataList ? this.props.dataList.map((item, i) => {
            return (
              <View className='at-list__item at-list__item--thumb' key={'id' + i} onClick={this.gotoDetail.bind(this, item.id)}>
                <View className='at-list__item-thumb item-thumb'>
                  <Image className='my-avatar' src={item.author.avatar_url}></Image>
                  <View className='my-tab' style={'background-color:' + (item.top ? 'lightcoral' : item.tab === 'share' ? 'limegreen' : item.tab === 'ask' ? 'lightseagreen' : item.tab === 'job' ? 'lightpink' : item.tab === 'dev' ? 'lightgray' : '')}>{item.top ? '置顶' : this.getTab(item.tab, this)}</View>
                </View>
                <View className='at-list__item-content item-content'>
                  <View className='item-content__info-title'>{item.title}</View>
                  <View className='item-content__info-note'>{formatDate(item.create_at, 'yyyy-MM-dd')}</View>
                </View>
                <View className='at-list__item-extra item-extra'>
                  <View className='item-content__info-title'>{item.reply_count}</View>
                  <View className='item-content__info-note'>{item.visit_count}</View>
                </View>
              </View>
            )
          }) : ''
        }
      </View>
    );
  }
}
export default MyList;