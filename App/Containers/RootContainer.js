import React, { Component } from 'react'
import { View, StatusBar, Platform, BackHandler } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
// import { Toast } from 'next-ui'

class RootContainer extends Component {
  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }

    if (Platform.OS === 'android') {
      this._BackHandler()
    }
  }

  _BackHandler = () => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      const { routes } = this.props.nav
      if (routes.length > 1) {
        this.props.goBack({ key: routes[routes.length - 1]['key'] })
        return true
      }
      // 如果为根,2s 连续返回 即退出
      if (this.lastBackPressed && (this.lastBackPressed + 2000 >= Date.now())) {
        BackHandler.exitApp()
        return true
      }
      this.lastBackPressed = Date.now()
      // Toast.show('再按一次退出应用')
      return true
    })
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress')
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle='light-content' />
        <ReduxNavigation />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  nav: state.nav
})

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  goBack: (params) => dispatch(NavigationActions.back(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
