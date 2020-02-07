import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { AtNavBar, AtIcon, AtList, AtListItem } from 'taro-ui'
import { connect } from '@tarojs/redux'

import HtmlCode from '../../components/htmlCode/index'
import { getLocalStorage, formatDate } from '../../utils/index'
import { gettopicdetail, collecttopic, decollecttopic } from '../../actions/index/index'

import './index.scss'

@connect(({ index }) => ({
  index
}), (dispatch) => ({
  gettopicdetail (data) {
    dispatch(gettopicdetail(data))
  },
  collecttopic (data) {
    dispatch(collecttopic(data))
  },
  decollecttopic (data) {
    dispatch(decollecttopic(data))
  }
}))

class TopicDetail extends Component {

  config = {
    navigationBarTitleText: '详情'
  }

  state={}

  componentWillMount () {
    this.props.gettopicdetail({id: this.$router.params.id, token: getLocalStorage('token')})
  }

  goback () {
    Taro.navigateBack({ delta: 1 })
  }

  starClick (item, e) {
    if (getLocalStorage('token')) {
      if (item.is_collect) {
        this.props.decollecttopic({token: getLocalStorage('token'), id: item.id})
      } else {
        this.props.collecttopic({token: getLocalStorage('token'), id: item.id})
      }
    } else {
      Taro.navigateTo({
        url: '/pages/login/index'
      })
    }
    e.stopPropagation()
  }
  
  render() {
    return (
      <View className='detail'>
        {
          process.env.TARO_ENV != 'weapp' ? 
          <AtNavBar
            onClickLeftIcon={this.goback}
            fixed
            color='#000'
            title='详情'
            leftIconType='chevron-left'
          /> : ''
        }
        <View className='detail-box' style={process.env.TARO_ENV != 'weapp' ? '' : 'margin-top:0px;'}>
          <View className='at-list__item at-list__item--thumb'>
            <View className='at-list__item-content item-content'>
              <View className='item-content__info'>{this.props.index.dataDetail.title}</View>
              <View className='item-content__info-note'>{formatDate(this.props.index.dataDetail.create_at, 'yyyy-MM-dd')}</View>
            </View>
            <View className='at-list__item-extra item-extra'>
              <AtIcon onClick={this.starClick.bind(this, this.props.index.dataDetail)} value={this.props.index.dataDetail.is_collect ? 'star-2' : 'star'} size='30' color={this.props.index.dataDetail.is_collect ? '#E6A230' : '#999'}></AtIcon >
            </View>
          </View>
          <HtmlCode data={this.props.index.dataDetail.content}></HtmlCode>
          {
            this.props.index.dataDetail.replies && this.props.index.dataDetail.replies.length > 0 ? <AtListItem title='评论：'></AtListItem> : ''
          }
          <AtList className='replies-list'>
            {
              this.props.index.dataDetail.replies && this.props.index.dataDetail.replies.length > 0 ? this.props.index.dataDetail.replies.map((item, i) => {
                return (
                  <View className='at-list__item at-list__item--thumb' key={'id' + i}>
                    <View className='at-list__item-thumb item-thumb'>
                      <Image className='my-avatar' src={item.author.avatar_url}></Image>
                    </View>
                    <View className='at-list__item-content item-content'>
                      <View className='item-content__info-title'>{item.author.loginname + '回复了您的话题'}</View>
                      <View className='item-content__info-note'>{formatDate(item.create_at, 'yyyy-MM-dd')}</View>
                    </View>
                    <HtmlCode data={item.content}></HtmlCode>
                  </View>
                )
              }) : ''
            }
          </AtList>
        </View>
      </View>
    );
  }
}
export default TopicDetail;