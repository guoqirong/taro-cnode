import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { AtNavBar, AtDrawer, AtList, AtIcon, AtListItem, AtActivityIndicator } from 'taro-ui'
import { connect } from '@tarojs/redux'

import { setLocalStorage, getLocalStorage } from '../../utils/index'
import { openmydrawer, closemydrawer, changetabitem, downloaddata, pullloaddata } from '../../actions/index/index'
import { settoken, accesstoken, clearsuserinfo, getmessagecount } from '../../actions/user/index'

import IconSvg from '../../components/image/index'
import MyList from './banner/mylist'

import './index.scss'

@connect(({ index, user }) => ({
  index, user
}), (dispatch) => ({
  openmydrawer () {
    dispatch(openmydrawer())
  },
  closemydrawer () {
    dispatch(closemydrawer())
  },
  changetabitem (data) {
    dispatch(changetabitem(data))
  },
  downloaddata (data) {
    dispatch(downloaddata(data))
  },
  pullloaddata (data) {
    dispatch(pullloaddata(data))
  },
  settoken (data) {
    dispatch(settoken(data))
  },
  accesstoken (data) {
    dispatch(accesstoken(data))
  },
  clearsuserinfo () {
    dispatch(clearsuserinfo())
  },
  getmessagecount (data) {
    dispatch(getmessagecount(data))
  }
}))

class Index extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    dargStyle: {       // 下拉框的样式
      top: 0 + 'px'
    },
    downDragStyle: {   // 下拉图标的样式
      height: 0 + 'px'
    },
    downText: '下拉刷新',
    upDragStyle: {     // 上拉图标样式
      height: 0 + 'px'
    },
    pullText: '上拉加载更多',
    start_p: {},
    scrollY:true,
    dargState: 0      // 刷新状态 0不做操作 1刷新 -1加载更多
  }

  config = {
    navigationBarTitleText: '首页'
  }

  componentDidMount () {
    let changetab = { key: 'all', icon: 'list', name: '全部' }
    this.props.changetabitem(changetab)
  }

  componentDidShow () {
    if (getLocalStorage('token')) {
      this.props.accesstoken({token: getLocalStorage('token')})
      this.props.getmessagecount({token: getLocalStorage('token')})
    }
  }

  handleClick () {
    console.log(111)
  }

  handleGotoLogin () {
    // console.log(getLocalStorage('token'), this.props.user.token)
    if (getLocalStorage('token') || this.props.user.token) {
      Taro.navigateTo({
        url: '/pages/user/index'
      })
    } else {
      Taro.navigateTo({
        url: '/pages/login/index'
      })
    }
  }

  scanCode (e) {
    let that = this
    Taro.scanCode().then((data) => {
      setLocalStorage('token', data.result)
      that.props.settoken({token: data.result})
      if (that.props.user.token) {
        that.props.accesstoken({token: data.result})
      }
    })
    e.stopPropagation()
  }

  goOut (e) {
    Taro.removeStorageSync('token')
    this.props.clearsuserinfo()
    this.props.settoken({token: ''})
    e.stopPropagation()
  }

  myMessage () {
    if (getLocalStorage('token') || this.props.user.token) {
      Taro.navigateTo({
        url: '/pages/message/index'
      })
    } else {
      Taro.navigateTo({
        url: '/pages/login/index'
      })
    }
  }

  reduction() {                   // 还原初始设置
    const time = 0.5;
    this.setState({
      upDragStyle: {              // 上拉图标样式
        height: 0 + 'px',
        transition: `all ${time}s`
      },
      dargState: 0,
      dargStyle: {
        top: 0 + 'px',
        transition: `all ${time}s`
      },
      downDragStyle: {
        height: 0 + 'px',
        transition: `all ${time}s`
      },
      scrollY:true
    })
    setTimeout(() => {
      this.setState({
        dargStyle: {
          top: 0 + 'px',
        },
        upDragStyle: {          // 上拉图标样式
          height: 0 + 'px'
        },
        pullText: '上拉加载更多',
        downText: '下拉刷新'
      })
    }, time * 1000);
  }
  touchStart(e) {
    this.setState({
      start_p: e.touches[0]
    })
  }
  touchmove(e) {
    let that = this
    let move_p = e.touches[0],   // 移动时的位置
      deviationX = 0.30,         // 左右偏移量(超过这个偏移量不执行下拉操作)
      deviationY = 70,           // 拉动长度（低于这个值的时候不执行）
      maxY = 100;                // 拉动的最大高度

    let start_x = this.state.start_p.clientX,
      start_y = this.state.start_p.clientY,
      move_x = move_p.clientX,
      move_y = move_p.clientY;


    // 得到偏移数值
    let dev = Math.abs(move_x - start_x) / Math.abs(move_y - start_y);
    if (dev < deviationX) {     // 当偏移数值大于设置的偏移数值时则不执行操作
      let pY = Math.abs(move_y - start_y) / 3.5;  // 拖动倍率（使拖动的时候有粘滞的感觉--试了很多次 这个倍率刚好）
      if (move_y - start_y > 0) {   // 下拉操作
        if (pY >= deviationY) {
          this.setState({ dargState: 1, downText: '释放刷新' })
        } else {
          this.setState({ dargState: 0, downText: '下拉刷新' })
        }
        if (pY >= maxY) {
          pY = maxY
        }
        this.setState({
          dargStyle: {
            top: pY + 'px',
          },
          downDragStyle: {
            height: pY + 'px'
          },
          scrollY: false          // 拖动的时候禁用
        })
      }
      if (start_y - move_y > 0) { // 上拉操作
        // console.log('上拉操作')
        if (pY >= deviationY) {
          this.setState({ dargState: -1, pullText: '释放加载更多' })
        } else {
          this.setState({ dargState: 0, pullText: '上拉加载更多' })
        }
        if (pY >= maxY) {
          pY = maxY
        }
        this.setState({
          dargStyle: {
            top: -pY + 'px',
          },
          upDragStyle: {
            height: pY + 'px',
            backgroundColor: '#FFF'
          },
          scrollY: false            // 拖动的时候禁用
        })
      }
    }
  }
  pull() {            // 上拉
    // console.log('上拉')
    // this.props.onPull()
    let searchData = this.props.index.searchData
    searchData.page++
    this.props.pullloaddata(searchData)
  }
  down() {            // 下拉
    // console.log('下拉')
    // this.props.onDown()
    let searchData = this.props.index.searchData
    searchData.page = 1
    this.props.downloaddata(searchData)
  }
  touchEnd(e) {
    if (this.state.dargState === 1) {
      this.down()
    } else if (this.state.dargState === -1) {
      this.pull()
    }
    this.reduction()
  }

  render () {
		let dargStyle = this.state.dargStyle;
    let downDragStyle = this.state.downDragStyle;
    let upDragStyle = this.state.upDragStyle;
    return (
      <View className='index'>
        <AtNavBar
          onClickLeftIcon={this.props.openmydrawer}
          onClickRgIconSt={this.handleClick}
          fixed
          color='#000'
          title={this.props.index.changetab.name}
          leftIconType='menu'
          rightFirstIconType='star'
        />
        <AtDrawer 
          show={this.props.index.drawerShow}
          mask
          onClose={this.props.index.drawerShow ? this.props.closemydrawer : function(){}}
        >
          <AtList>
            <View onClick={this.handleGotoLogin.bind(this)}>
              <View className='at-list__item-thumb item-thumb my-item-thumb'>
                <IconSvg width='40px' height='40px' borderRadius='20px' src={this.props.user.simpleUserInfo.avatar_url || require('../../assets/icons/svg/icon-user.svg')}></IconSvg>
              </View>
              <View className='at-list__item-content item-content my-item-content'>
                <View className='item-content__info-title'>{this.props.user.simpleUserInfo.loginname || '登录'}</View>
              </View>
              {
                process.env.TARO_ENV == 'weapp' && !getLocalStorage('token') ? 
                <View className='at-list__item-extra item-extra my-item-extra' onClick={this.scanCode.bind(this)}>
                  <IconSvg width='30px' height='30px' borderRadius='15px' src={require('../../assets/icons/svg/icon-scan.svg')}></IconSvg>
                </View> : ''
              }
              {
                getLocalStorage('token') ? 
                <View className='at-list__item-extra item-extra my-item-extra' onClick={this.goOut.bind(this)}>
                  <AtIcon value='external-link' size='30' color='#999'></AtIcon>
                </View> : ''
              }
            </View>
          </AtList>
          <AtList>
            {
              this.props.index.tabList.map((item, i) => {
                return (
                  <AtListItem title={item.name} key={item.key + i} arrow='right' onClick={this.props.changetabitem.bind(this, item)} iconInfo={{ size: 16, color: '#78A4FA', value: item.icon, }} />
                );
              })
            }
          </AtList>
          <AtList className='my-message'>
            <AtListItem title='我的消息' arrow='right' onClick={this.myMessage.bind(this)} iconInfo={{ size: 16, color: '#78A4FA', value: 'bell', }} extraText={this.props.user.messageCount ? String(this.props.user.messageCount) : ''} />
          </AtList>
        </AtDrawer>
        <View className='list-box dragUpdataPage' style={process.env.TARO_ENV != 'weapp' ? 'margin-top: 38px;calc(100vh - 38px)' : ''}>
          <View className='downDragBox' style={downDragStyle}>
            <AtActivityIndicator></AtActivityIndicator>
            <Text className='downText'>{this.state.downText}</Text>
          </View>
          <ScrollView
            style={dargStyle}
            onTouchMove={this.touchmove.bind(this)}
            onTouchEnd={this.touchEnd.bind(this)}
            onTouchStart={this.touchStart.bind(this)}
            className='dragUpdata'
            scrollY={this.state.scrollY}
            scrollWithAnimation>
            <MyList dataList={this.props.index.dataList} tabList={this.props.index.tabList}></MyList>
          </ScrollView>
          <View className='upDragBox' style={upDragStyle}>
            <AtActivityIndicator></AtActivityIndicator>
            <Text className='downText'>{this.state.pullText}</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default Index
