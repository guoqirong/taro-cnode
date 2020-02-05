import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { AtNavBar, AtTabs, AtTabsPane, AtList, AtListItem, AtButton, AtFab } from 'taro-ui'
import { connect } from '@tarojs/redux'

import HtmlCode from '../../components/htmlCode/index'

import { getLocalStorage, formatDate } from '../../utils/index'
import { getmessagelist, readonemessage, readallmessage } from '../../actions/user/index'

import './index.scss'

@connect(({ user }) => ({
  user
}), (dispatch) => ({
  getmessagelist (data) {
    dispatch(getmessagelist(data))
  },
  readonemessage (data) {
    dispatch(readonemessage(data))
  },
  readallmessage (data) {
    dispatch(readallmessage(data))
  }
}))

class Message extends Component {

  config = {
    navigationBarTitleText: '我的消息'
  }

  state = {
    current: 0
  }

  componentWillMount () {
    this.props.getmessagelist({token: getLocalStorage('token')})
  }

  goback () {
    Taro.navigateBack({ delta: 1 })
  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }

  handleOneClick (id, e) {
    this.props.readonemessage({token: getLocalStorage('token'), id: id})
    e.stopPropagation()
  }

  handleAllClick () {
    this.props.readallmessage({token: getLocalStorage('token')})
  }

  render() {
    return (
      <View className='message'>
        {
          process.env.TARO_ENV != 'weapp' ? 
          <AtNavBar
            onClickLeftIcon={this.goback}
            fixed
            color='#000'
            title='我的消息'
            leftIconType='chevron-left'
          /> : ''
        }
        <View className='message-box' style={process.env.TARO_ENV != 'weapp' ? '' : 'margin-top:0px;'}>
          <AtTabs current={this.state.current} tabList={[{ title: '未读' }, { title: '已读' }]} onClick={this.handleClick.bind(this)}>
            <AtTabsPane current={this.state.current} index={0}>
              <AtList>
                {
                  this.props.user.messageList.hasnot_read_messages && this.props.user.messageList.hasnot_read_messages.length > 0 ? this.props.user.messageList.hasnot_read_messages.map((item, i) => {
                    return (
                      <View className='at-list__item at-list__item--thumb' key={'id' + i}>
                        <View className='at-list__item-thumb item-thumb'>
                          <Image className='my-avatar' src={item.author.avatar_url}></Image>
                        </View>
                        <View className='at-list__item-content item-content'>
                          <View className='item-content__info-title'>{item.author.loginname + '回复了您的话题'}</View>
                          <View className='item-content__info-note'>{formatDate(item.create_at, 'yyyy-MM-dd')}</View>
                        </View>
                        <View className='at-list__item-extra item-extra'>
                          <AtButton onClick={this.handleOneClick.bind(this, item.id)}>已读</AtButton>
                        </View>
                        <HtmlCode data={item.reply.content}></HtmlCode>
                        <View className='topic-list'>
                          <View className='toplic-list-name'>话题：</View>
                          <View className='toplic-list-val'>{item.topic.title}</View>
                        </View>
                      </View>
                    )
                  }) : <AtListItem title='暂无数据'></AtListItem>
                }
              </AtList>
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={1}>
              <AtList>
                {
                  this.props.user.messageList.has_read_messages && this.props.user.messageList.has_read_messages.length > 0 ? this.props.user.messageList.has_read_messages.map((item, i) => {
                    return (
                      <View className='at-list__item at-list__item--thumb' key={'id' + i}>
                        <View className='at-list__item-thumb item-thumb'>
                          <Image className='my-avatar' src={item.author.avatar_url}></Image>
                        </View>
                        <View className='at-list__item-content item-content'>
                          <View className='item-content__info-title'>{item.author.loginname + '回复了您的话题'}</View>
                          <View className='item-content__info-note'>{formatDate(item.create_at, 'yyyy-MM-dd')}</View>
                        </View>
                        <HtmlCode data={item.reply.content}></HtmlCode>
                        <View className='topic-list'>
                          <View className='toplic-list-name'>话题：</View>
                          <View className='toplic-list-val'>{item.topic.title}</View>
                        </View>
                      </View>
                    )
                  }) : <AtListItem title='暂无数据'></AtListItem>
                }
              </AtList>
            </AtTabsPane>
          </AtTabs>
        </View>
        {
          this.state.current === 0 && this.props.user.messageList.hasnot_read_messages && this.props.user.messageList.hasnot_read_messages.length > 0 ? 
          <View className='fab-botton'>
            <AtFab onClick={this.handleAllClick.bind(this)}>
              <Text>全部已读</Text>
            </AtFab>
          </View> : ''
        }
      </View>
    );
  }
}
export default Message;