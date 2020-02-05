
import { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'


class IconSvg extends Component {
  render () {
    return (
      <View className='column-view'>
        <Image style={(this.props.width ? ('width:' + this.props.width + ';') : '') + (this.props.height ? ('height:' + this.props.height + ';') : '') + (this.props.borderRadius ? ('border-radius:' + this.props.borderRadius) : '')} mode='scaleToFill' src={this.props.src}/>
      </View>
    )
  }
}

export default IconSvg