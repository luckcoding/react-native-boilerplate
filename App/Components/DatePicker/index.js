import React, { PureComponent } from 'react'
import {
  Platform, DatePickerIOS, DatePickerAndroid, TimePickerAndroid,
  TouchableWithoutFeedback, StyleSheet, View
} from 'react-native'
import DatePickerView from './DatePickerView'

class DatePicker extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      options: {}
    }
  };

  static datePickerInstance;
  static open (options = {}) {
    this.datePickerInstance._root._open(options)
  }

  _open (options) {
    this.setState({ visible: true, options }, () => {
      this._root.onPressDate()
    })
  }

  _close = () => {
    this.setState({ visible: false })
  }

  render () {
    return this.state.visible ? (
      <DatePickerView
        ref={c => this._root = c}
        {...this.state.options}
        hideText
        onPressCancel={this._close}
      />
    ) : null
  }
}

export default DatePicker
