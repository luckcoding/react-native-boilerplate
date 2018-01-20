import '../Config'
import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './RootContainer'
import createStore from '../Redux'

import { StyleProvider, Root } from 'native-base'
import getTheme from '../../theme/components'
import platform from '../../theme/variables/platform'
import CmptsRoot from '../Components/Root'

// create our store
const store = createStore()

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  render () {
    return (
      <StyleProvider style={getTheme(platform)}>
        <Provider store={store}>
          <Root>
            <CmptsRoot>
              <RootContainer />
            </CmptsRoot>
          </Root>
        </Provider>
      </StyleProvider>
    )
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App
