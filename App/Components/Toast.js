import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  ViewPropTypes,
  StyleSheet,
  View,
  Text,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Easing,
  Keyboard
} from 'react-native'

const TOAST_MAX_WIDTH = 0.8
const TOAST_ANIMATION_DURATION = 200
const DIMENSION = Dimensions.get('window')
let KEYBOARD_HEIGHT = 0

Keyboard.addListener('keyboardDidChangeFrame', function ({ endCoordinates }) {
  KEYBOARD_HEIGHT = DIMENSION.height - endCoordinates.screenY
})

const WINDOW_WIDTH = DIMENSION.width
const positions = {
  TOP: 20,
  BOTTOM: -20,
  CENTER: 0
}

const durations = {
  LONG: 3500,
  SHORT: 2000
}

let styles = StyleSheet.create({
  defaultStyle: {
    position: 'absolute',
    width: WINDOW_WIDTH,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerStyle: {
    padding: 10,
    backgroundColor: '#000',
    opacity: 0.8,
    borderRadius: 5,
    marginHorizontal: WINDOW_WIDTH * ((1 - TOAST_MAX_WIDTH) / 2)
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 10
  },
  textStyle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center'
  }
})

const defaultOptions = {
  containerStyle: {},
  duration: durations.SHORT,
  position: positions.CENTER,
  animation: true,
  shadow: true,
  backgroundColor: '',
  opacity: 0.8,
  shadowColor: '',
  textColor: '',
  textStyle: {},
  delay: 0,
  hideOnPress: true,
  onHide: () => {},
  onHidden: () => {},
  onShow: () => {},
  onShown: () => {}
}

class Toast extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      opacity: new Animated.Value(0),
      config: defaultOptions
    }
  };

  static toastInstance;

  static _animating = false;
  static _hideTimeout = null;

  static show (message, options) {
    this.toastInstance._root._show(message, options)
  }

  _show (message, options) {
    const nextConfig = { ...defaultOptions, ...options }
    this.setState({ visible: true, message, config: nextConfig }, () => {
      const { config } = this.state
      if (!this._animating) {
        clearTimeout(this._hideTimeout)
        this._animating = true
        config.onShow && config.onShow()
        Animated.timing(this.state.opacity, {
          toValue: config.opacity,
          duration: config.animation ? TOAST_ANIMATION_DURATION : 0,
          easing: Easing.out(Easing.ease)
        }).start(({finished}) => {
          if (finished) {
            this._animating = !finished
            config.onShown && config.onShown()
            if (config.duration > 0) {
              this._hideTimeout = setTimeout(() => this._hide(), config.duration)
            }
          }
        })
      }
    })
  }

  _hide () {
    clearTimeout(this._hideTimeout)
    const { config } = this.state
    if (!this._animating) {
      config.onHide && config.onHide()
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: config.animation ? TOAST_ANIMATION_DURATION : 0,
        easing: Easing.in(Easing.ease)
      }).start(({finished}) => {
        if (finished) {
          this._animating = false
          this.setState({ visible: false })
          config.onHidden && config.onHidden()
        }
      })
    }
  }

  render () {
    let { config } = this.state

    let offset = config.position

    let position = offset ? {
      [offset < 0 ? 'bottom' : 'top']: offset < 0 ? (KEYBOARD_HEIGHT - offset) : offset
    } : {
      top: 0,
      bottom: KEYBOARD_HEIGHT
    }

    return (this.state.visible || this._animating) ? <View
      style={[
        styles.defaultStyle,
        position
      ]}
      pointerEvents='box-none'
    >
      <TouchableWithoutFeedback
        onPress={config.hideOnPress ? this._hide : null}
      >
        <Animated.View
          style={[
            styles.containerStyle,
            config.containerStyle,
            config.backgroundColor && {backgroundColor: config.backgroundColor},
            {
              opacity: this.state.opacity
            },
            config.shadow && styles.shadowStyle,
            config.shadowColor && {shadowColor: config.shadowColor}
          ]}
          pointerEvents='none'
          ref={ele => this._root = ele}
        >
          <Text style={[
            styles.textStyle,
            config.textStyle,
            config.textColor && {color: config.textColor}
          ]}>
            { this.state.message }
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View> : null
  }
}

export default Toast
