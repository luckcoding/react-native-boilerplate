import React from 'react'
import { View, Text } from 'react-native'

class Home extends React.PureComponent<Props, State> {
  static navigationOptions = {
    title: '123'
  }

  componentDidMount () {
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
        <Text>Home</Text>
      </View>
    )
  }
}

export default Home
