import React, { Component } from 'react';
import { Platform, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';

export default class ZoomView extends Component {

  onGesturePinch = ({ nativeEvent }) => {
    this.props.onPinchProgress(nativeEvent.scale)
  }

  onPinchHandlerStateChange = (event) => {
    const pinch_end = event.nativeEvent.state === State.END
    const pinch_begin = event.nativeEvent.oldState === State.BEGAN
    const pinch_active = event.nativeEvent.state === State.ACTIVE
    if (pinch_end) {
      this.props.onPinchEnd()
    }
    else if (pinch_begin && pinch_active) {
      this.props.onPinchStart()
    }
  }

  render() {
    return (
      <PinchGestureHandler
        onGestureEvent={this.onGesturePinch}
        onHandlerStateChange={this.onPinchHandlerStateChange}>
        <SafeAreaView style={styles.preview}>
          {this.props.children}
        </SafeAreaView>
      </PinchGestureHandler>
    )
  }
}

const styles = StyleSheet.create({
  preview: {
    flex: 1
  },
})
