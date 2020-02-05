import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtNavBar, AtAvatar, AtTabs, AtTabsPane, AtList, AtListItem } from 'taro-ui'
import { connect } from '@tarojs/redux'

import { getLocalStorage, formatDate } from '../../utils/index'
import { getuserinfo } from '../../actions/user/index'

import './index.scss'

@connect(({ user }) => ({
  user
}), (dispatch) => ({
  getuserinfo (data) {
    dispatch(getuserinfo(data))
  }
}))

class User extends Component {

  config = {
    navigationBarTitleText: '个人中心'
  }

  state = {
    current: 0
  }

  componentWillMount () {
    this.props.getuserinfo({userName: getLocalStorage('userName')})
  }
  
  goback () {
    Taro.navigateBack({ delta: 1 })
  }
  
  handleClick (value) {
    this.setState({
      current: value
    })
  }
  
  render() {
    return (
      <View className='user'>
        {
          process.env.TARO_ENV != 'weapp' ? 
          <AtNavBar
            onClickLeftIcon={this.goback}
            fixed
            color='#000'
            title='个人中心'
            leftIconType='chevron-left'
          /> : ''
        }
        <View className='user-box' style={process.env.TARO_ENV != 'weapp' ? '' : 'margin-top:0px;'}>
          <View className='user-logo'>
            <AtAvatar circle image={this.props.user.userInfo.avatar_url} size='large'></AtAvatar>
          </View>
          <View className='user-name'>{this.props.user.userInfo.loginname}</View>
        </View>
        <View>
        <AtTabs current={this.state.current} tabList={[{ title: '最近话题' }, { title: '最近的回复' }]} onClick={this.handleClick.bind(this)} key='title'>
          <AtTabsPane current={this.state.current} index={0}>
            <AtList>
              {
                this.props.user.userInfo.recent_topics ? this.props.user.userInfo.recent_topics.map(item => {
                  return (      
                    <AtListItem key='id' title={item.title} note={formatDate(item.last_reply_at, 'yyyy-MM-dd')} />
                  )
                }) : ''
              }
            </AtList>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
          <AtList>
              {
                this.props.user.userInfo.recent_replies ? this.props.user.userInfo.recent_replies.map(item => {
                  return (      
                    <AtListItem key='id' title={item.title} note={formatDate(item.last_reply_at, 'yyyy-MM-dd')} />
                  )
                }) : ''
              }
            </AtList>
          </AtTabsPane>
        </AtTabs>
        </View>
      </View>
    );
  }
}
export default User;