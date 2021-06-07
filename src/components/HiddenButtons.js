import React, { Component } from "react";
import { View, Text, Animated } from "react-native";
import Ripple from "react-native-material-ripple";
import { Feather } from "@expo/vector-icons";

class HiddenButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialSize: new Animated.Value(1),
      isOpen: this.props.isOpen,
    };
  }

  componentDidUpdate = () => {
    Animated.timing(this.state.initialSize, {
      toValue: 1,
      duration: 120,
      useNativeDriver: false,
    }).start();
  };

  render() {
    const { initialSize } = this.state;
    const { icon } = this.props;

    return (
      <Animated.View style={{ transform: [{ scale: initialSize }] }}>
        {icon}
      </Animated.View>
    );
  }
}

export default HiddenButtons;
