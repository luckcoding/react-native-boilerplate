import React from 'react'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import {
  View, Text, H1, Button
} from 'native-base'
import Swiper from 'react-native-swiper'
import AppActions from '../Redux/AppRedux'

const styles = StyleSheet.create({
  continer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

class AppIntro extends React.Component {
  state = {}

  render () {
    return (
      <View style={{ flex: 1 }}>
        <Swiper 
          loop={false}
          dotColor='white'
          activeDotColor='red'
        >
          <View style={[styles.continer, { backgroundColor: 'yellow' }]}>
            <H1>App Intro 1</H1>
          </View>
          <View style={[styles.continer, { backgroundColor: 'blue' }]}>
            <H1>App Intro 2</H1>
          </View>
          <View style={[styles.continer, { backgroundColor: 'pink' }]}>
            <Button full onPress={() => this.props.readedAppintro()}>
              <Text>App Intro 2</Text>
            </Button>
          </View>
        </Swiper>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  readedAppintro: () => dispatch(AppActions.appintro(true))
})

export default connect(null, mapDispatchToProps)(AppIntro)
