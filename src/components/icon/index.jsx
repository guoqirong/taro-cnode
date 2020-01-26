
import { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'


class IconSvg extends Component {

  render () {
    return (
      <View className='column-view'>
        <Image mode='scaleToFill' src={require('../../../assets/icons/svg/icon-' + this.props.name + '.svg')}/>
      </View>
    )
  }
}

export default IconSvg