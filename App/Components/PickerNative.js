import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  Modal,
  Platform,
} from 'react-native';
import Picker from 'react-native-picker'

class PickerNative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      options: {}
    }
  }

  static pickerInstance;

  static init (options) {
    this.pickerInstance._root._show(options)
  }

  _show (options) {
    this.setState({
      options,
      modalVisible: true
    }, () => {
      Picker.init({
        ...options,
        onPickerConfirm: (...args) => {
          this.setState({ modalVisible: false }, () => {
            if (typeof this.state.options.onPickerConfirm === 'function') {
              this.state.options.onPickerConfirm(...args)
            }
          })
        },
        onPickerCancel: (...args) => {
          this.setState({ modalVisible: false }, () => {
            if (typeof this.state.options.onPickerCancel === 'function') {
              this.state.options.onPickerCancel(...args)
            }
          })
        }
      })
      Picker.show()
    })
  }

  _handleOnRequestClose = () => {
    if (Picker.isPickerShow) {
      Picker.hide()
    }
    this.setState({ modalVisible: false })
  }

  render() {
    return this.state.modalVisible ? (
      Platform.OS === 'ios' ? <TouchableOpacity
        activeOpacity={1}
        onPress={this._handleOnRequestClose}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
          flex: 1
        }}
      /> : (
        <Modal
          animationType='fade'
          transparent
          visible={this.state.modalVisible}
          onRequestClose={this._handleOnRequestClose}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={this._handleOnRequestClose}
            style={{
              backgroundColor: 'rgba(0,0,0,0.4)',
              flex: 1
            }}
          />
        </Modal>
      )
    ) : null
  }

}

export default PickerNative