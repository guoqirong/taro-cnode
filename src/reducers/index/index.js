import { OPENMYDRAWER, CLOSEMYDRAWER, CHANGETABITEM, DOWNLOADDATA, PULLLOADDATA } from '../../constants/index/index'

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
  dataList: []
}

export default function index (state = INDEX_STATE, action) {
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
    default:
      return state
  }
}