import { OPENMYDRAWER, CLOSEMYDRAWER, CHANGETABITEM, DOWNLOADDATA, PULLLOADDATA, GETTOPICDETAIL, COLLECTTOPIC, DECOLLECTTOPIC, GETCOLLECTLIST } from '../../constants/index/index'
import Taro from '@tarojs/taro'

const INDEX_STATE = {
  drawerShow: false,
  tabList: [
    { key: 'all', icon: 'list', name: '全部' },
    { key: 'good', icon: 'sketch', name: '精华' },
    { key: 'share', icon: 'share', name: '分享' },
    { key: 'ask', icon: 'message', name: '问答' },
    { key: 'job', icon: 'money', name: '招聘' },
    { key: 'dev', icon: 'settings', name: '客户端测试' }
  ],
  changetab: { key: 'all', icon: 'list', name: '全部' },
  searchData: {
    page: 1,
    tab: 'all',
    limit: 20,
    mdrender: true
  },
  dataList: [],
  dataDetail: {},
  collectList: []
}

export default function index (state = INDEX_STATE, action) {
  Taro.hideLoading()
  switch (action.type) {
    case OPENMYDRAWER:
      return {
        ...state,
        drawerShow: true
      }
    case CLOSEMYDRAWER:
      return {
        ...state,
        drawerShow: false
      }
    case CHANGETABITEM:
      return {
        ...state,
        drawerShow: false,
        changetab: action.data,
        searchData: action.searchData,
        dataList: action.dataList
      }
    case DOWNLOADDATA:
      return {
        ...state,
        drawerShow: false,
        searchData: action.searchData,
        dataList: action.dataList
      }
    case PULLLOADDATA:
      let dataList = state.dataList
      action.dataList.forEach(item => {
        dataList.push(item)
      });
      return {
        ...state,
        drawerShow: false,
        searchData: action.searchData,
        dataList: dataList
      }
    case GETTOPICDETAIL:
      return {
        ...state,
        dataDetail: action.dataDetail
      }
    case COLLECTTOPIC:
      let dataDetail = state.dataDetail
      dataDetail.is_collect = action.is_collect
      return {
        ...state,
        dataDetail: dataDetail
      }
    case DECOLLECTTOPIC:
      let dedataDetail = state.dataDetail
      dedataDetail.is_collect = action.is_collect
      return {
        ...state,
        dataDetail: dedataDetail
      }
    case GETCOLLECTLIST:
      return {
        ...state,
        collectList: action.collectList
      }
    default:
      return state
  }
}