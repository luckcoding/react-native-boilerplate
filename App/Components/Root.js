import React, { Component } from 'react'
import { View } from 'react-native'
import Loading from './Loading'
import Toast from './Toast'
import DatePicker from './DatePicker'
import PickerNative from './PickerNative'

class Root extends Component {
  render () {
    return (
      <View ref={c => (this._root = c)} {...this.props} style={{ flex: 1 }}>
        {this.props.children}
        <Toast ref={c => { if (!Toast.toastInstance) Toast.toastInstance = c }} />
        <DatePicker ref={c => { if (!DatePicker.datePickerInstance) DatePicker.datePickerInstance = c }} />
        <PickerNative ref={c => { if (!PickerNative.pickerInstance) PickerNative.pickerInstance = c }} />
        <Loading ref={c => { if (!Loading.loadingInstance) Loading.loadingInstance = c }} />
      </View>
    )
  }
}

export default Root
