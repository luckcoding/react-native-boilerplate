import React from 'react'
import { View, Text } from 'react-native'

export default class L extends React.PureComponent {
  componentDidMount () {
    console.tron.log(this.props.navigation)
    // this.props.navigator.navigationContext.addListener('didfocus', (event) => {
    //   console.tron.display({
    //     name: '====>',
    //     value: event
    //   })
    // })
  }

  render () {
    return (
      <View>
        <Text>Launcher</Text>
      </View>
    )
  }
}
