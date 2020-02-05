import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtNavBar, AtForm, AtInput, AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'

import { setLocalStorage } from '../../utils/index'
import { settoken, accesstoken } from '../../actions/user/index'

import './index.scss'

@connect(({ user }) => ({
  user
}), (dispatch) => ({
  settoken (data) {
    dispatch(settoken(data))
  },
  accesstoken (data) {
    dispatch(accesstoken(data))
  }
}))

class Login extends Component {

  config = {
    navigationBarTitleText: '用户登录'
  }
  
  goback () {
    Taro.navigateBack({ delta: 1 })
  }

  handleChange(val, e){
    if ((e && e.type === 'input') || !e) {
      this.props.settoken({
        token: val,
      })
    }
  }

  onSubmit () {
    if (this.props.user.token) {
      setLocalStorage('token', this.props.user.token)
      this.props.accesstoken({token: this.props.user.token})
      this.goback()
    } else {
      Taro.showToast({
        title: '请输入登录验证码',
        icon: 'none'
      })
    }
  }

  render() {
    return (
      <View className='login'>
        {
          process.env.TARO_ENV != 'weapp' ? 
          <AtNavBar
            onClickLeftIcon={this.goback}
            fixed
            color='#000'
            title='用户登录'
            leftIconType='chevron-left'
          /> : ''
        }
        <View className='login-box' style={process.env.TARO_ENV != 'weapp' ? '' : 'margin-top:0px;'}>
          <AtForm
            onSubmit={this.onSubmit.bind(this)}
          >
            <AtInput
              clear
              className='login-input'
              name='token'
              type='text'
              placeholder='登录验证码'
              value={this.props.user.token}
              onChange={this.handleChange.bind(this)}
            />
            <AtButton formType='submit' type='primary' size='normal'>登录</AtButton>
          </AtForm>
        </View>
      </View>
    );
  }
}
export default Login;