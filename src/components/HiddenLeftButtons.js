import React, { Component } from "react";
import { View, Text, Animated, TouchableOpacity } from "react-native";
import Ripple from "react-native-material-ripple";
import { Feather } from "@expo/vector-icons";

class HiddenLeftButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnimation: new Animated.Value(0),
    };
  }

  fadeIn = () => {
    Animated.timing(this.state.fadeAnimation, {
      toValue: 1,
      duration: 800,
      delay: 1000,
      useNativeDriver: false,
    }).start();
  };

  fadeOut = () => {
    Animated.timing(this.state.fadeAnimation, {
      toValue: 0,
      duration: 800,
      useNativeDriver: false,
    }).start();
  };

  componentDidMount = () => {
    this.fadeIn();
  };

  componentWillUnmount = () => {
    this.fadeOut;
  };

  render() {
    const { fadeAnimation, iconSize } = this.state;
    const { onClose, swipeAnimatedValue, onDelete } = this.props;
    return (
      <Animated.View
        style={{
          height: 50,
          marginVertical: 6,
          borderRadius: 6,
          flexDirection: "row",
          justifyContent: "flex-end",
          opacity: fadeAnimation,
        }}
      >
        <TouchableOpacity
          style={{
            width: "20%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "orange",
            padding: 2,
          }}
          onPress={onClose}
        >
          <Animated.View
            style={{
              transform: [
                {
                  scale: swipeAnimatedValue.interpolate({
                    inputRange: [-90, 45],
                    outputRange: [1, 0],
                  }),
                },
              ],
            }}
          >
            <Feather name="eye" size={24} color="white" />
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: "20%",
            height: "100%",
            backgroundColor: "red",
            borderTopRightRadius: 6,
            borderBottomRightRadius: 6,
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
          }}
          onPress={onDelete}
        >
          <Animated.View
            style={{
              transform: [
                {
                  scale: swipeAnimatedValue.interpolate({
                    inputRange: [-90, 45],
                    outputRange: [1, 0],
                  }),
                },
              ],
            }}
          >
            <Feather name="trash-2" size={24} color="white" />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

export default HiddenLeftButtons;
