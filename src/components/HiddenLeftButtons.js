import React, { Component } from "react";
import { View, Text, Animated } from "react-native";
import Ripple from "react-native-material-ripple";
import { Feather } from "@expo/vector-icons";

class HiddenLeftButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnimation: new Animated.Value(0),
      iconSize: new Animated.Value(0),
    };
  }

  fadeIn = () => {
    Animated.timing(this.state.fadeAnimation, {
      toValue: 1,
      duration: 2800,
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
        <Animated.View
          style={{
            height: "100%",
            width: "20%",
            backgroundColor: "orange",
            alignSelf: "flex-start",
            opacity: fadeAnimation,
          }}
        >
          <Ripple
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              padding: 2,
            }}
            rippleCentered={true}
            onPress={() => alert("edit")}
          >
            <Animated.View style={{ transform: [{ scale: iconSize }] }}>
              <Feather name="edit" size={24} color="white" />
            </Animated.View>
          </Ripple>
        </Animated.View>

        <Animated.View
          style={{
            height: "100%",
            width: "20%",
            backgroundColor: "red",
            alignSelf: "flex-end",
            borderTopRightRadius: 6,
            borderBottomRightRadius: 6,
            opacity: fadeAnimation,
          }}
        >
          <Ripple
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              padding: 2,
            }}
            rippleCentered={true}
          >
            <Animated.View style={{ transform: [{ scale: iconSize }] }}>
              <Feather name="trash-2" size={24} color="white" />
            </Animated.View>
          </Ripple>
        </Animated.View>
      </Animated.View>
    );
  }
}

export default HiddenLeftButtons;
