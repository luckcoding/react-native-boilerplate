import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  ActivityIndicator
} from 'react-native'
import { connectStyle } from 'native-base'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  textContent: {
    top: 80,
    height: 50,
    fontSize: 20,
    fontWeight: 'bold'
  }
});

const ANIMATION = ['none', 'slide', 'fade'];
const SIZES = ['small', 'normal', 'large'];

const defaultOptions = {
  visible: false,
  cancelable: false,
  textContent: '',
  animation: 'none',
  color: 'white',
  size: 'large', // 'normal',
  overlayColor: 'rgba(0, 0, 0, 0.25)'
}

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      textContent: '',
      options: defaultOptions
    };
  }

  static loadingInstance;

  static show (message, options) {
    this.loadingInstance._root._show(message, options)
  }

  static hide () {
    this.loadingInstance._root.close()
  }

  _show (message, options) {
    this.setState({
      visible: true,
      textContent: message,
      options: { ...defaultOptions, ...options }
    });
  }

  close() {
    this.setState({ visible: false });
  }

  componentWillReceiveProps(nextProps) {
    const { visible, textContent } = nextProps;
    this.setState({ visible, textContent });
  }

  _handleOnRequestClose() {
    if (this.state.options.cancelable) {
      this.close();
    }
  }

  _renderDefaultContent() {
    return (
      <View style={styles.background}>
        <ActivityIndicator
          color={this.state.options.color}
          size={this.state.options.size}
          style={{ flex: 1 }}
        />
        <View style={styles.textContainer}>
          <Text style={[styles.textContent, this.state.options.textStyle]}>{this.state.textContent}</Text>
        </View>
      </View>
    );
  }

  _renderSpinner() {
    const { visible } = this.state;

    if (!visible)
      return null;

    const spinner = (
      <View style={[
        styles.container,
        { backgroundColor: this.state.options.overlayColor }
      ]} key={`spinner_${Date.now()}`}>
        {this.state.options.children ? this.state.options.children : this._renderDefaultContent()}
      </View>
    );

    return (
      <Modal
        animationType={this.state.options.animation}
        onRequestClose={() => this._handleOnRequestClose()}
        supportedOrientations={['landscape', 'portrait']}
        transparent
        visible={visible}>
        {spinner}
      </Modal>
    );

  }

  render() {
    return this._renderSpinner();
  }

}

export default connectStyle('')(Loading)