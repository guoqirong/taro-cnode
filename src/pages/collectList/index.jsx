import Taro, { Component } from '@tarojs/taro';
import { View, Text , Button } from '@tarojs/components';
import { AtNavBar } from 'taro-ui'
import { connect } from '@tarojs/redux'

import { getLocalStorage } from '../../utils/index'
import { getcollectlist } from '../../actions/index/index'

import MyList from '../index/banner/mylist'

import './index.scss'

@connect(({ index }) => ({
  index
}), (dispatch) => ({
  getcollectlist (data) {
    dispatch(getcollectlist(data))
  }
}))

class CollectList extends Component {

  config = {
    navigationBarTitleText: '我的收藏'
  }

  state={}

  componentDidShow () {
    this.props.getcollectlist({userName: getLocalStorage('userName')})
  }

  goback () {
    Taro.navigateBack({ delta: 1 })
  }

  render() {
    return (
      <View className='collect-list'>
        {
          process.env.TARO_ENV != 'weapp' ? 
          <AtNavBar
            onClickLeftIcon={this.goback}
            fixed
            color='#000'
            title='我的收藏'
            leftIconType='chevron-left'
          /> : ''
        }
        <View className='collect-list-box' style={process.env.TARO_ENV != 'weapp' ? '' : 'margin-top:0px;'}>
          <MyList dataList={this.props.index.collectList} tabList={this.props.index.tabList} isNotTop={true}></MyList>
        </View>
      </View>
    );
  }
}
export default CollectList;