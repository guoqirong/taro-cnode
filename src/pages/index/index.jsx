import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { AtNavBar, AtDrawer, AtList, AtListItem, AtActivityIndicator  } from 'taro-ui'
import { connect } from '@tarojs/redux'

import { openmydrawer, closemydrawer, changetabitem, downloaddata, pullloaddata } from '../../actions/index/index'

import MyList from './banner/mylist'

import './index.scss'


@connect(({ counter, index }) => ({
  counter, index
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
  }
}))

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
  }

  config = {
    navigationBarTitleText: '首页'
  }

  componentDidMount () {
    let changetab = { key: 'all', icon: 'list', name: '全部' }
    this.props.changetabitem(changetab)
  }

  handleClick () {
    console.log(111)
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
            height: pY + 'px'
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
            <AtListItem title='登录' arrow='right' iconInfo={{ size: 16, color: '#78A4FA', value: 'user', }} />
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
          <AtList>
            <AtListItem title='我的消息' arrow='right' iconInfo={{ size: 16, color: '#78A4FA', value: 'bell', }} />
          </AtList>
        </AtDrawer>
        <View className='list-box dragUpdataPage'>
          <View className='downDragBox' style={downDragStyle}>
            <AtActivityIndicator></AtActivityIndicator>
            <Text className='downText'>{this.state.downText}</Text>
          </View>
          <ScrollView
            style={dargStyle}
            onTouchMove={this.touchmove}
            onTouchEnd={this.touchEnd}
            onTouchStart={this.touchStart}
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
