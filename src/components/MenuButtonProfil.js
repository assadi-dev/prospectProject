import React, { Component } from "react";
import { Text, View, StyleSheet, Animated } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Ripple from "react-native-material-ripple";

export class MenuButtonProfil extends Component {
  iconSize = new Animated.Value(1);

  handlePress = () => {
    Animated.sequence([
      Animated.timing(this.iconSize, {
        toValue: 1.3,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(this.iconSize, {
        toValue: 1,
        useNativeDriver: false,
      }),
    ]).start();
  };

  /*componentDidUpdate = () => {
    if (this.state.isTouch === true) {
      this.handlePress();
    }
  };
  componentWillUnmount = () => {
    this.setState({ isTouch: false });
  };*/

  render() {
    const sizeButton = { transform: [{ scale: this.iconSize }] };

    const { navigation, routeName, title, icon } = this.props;

    return (
      <Ripple
        style={styles.buttonContainer}
        onPress={() => {
          this.handlePress;
          navigation.navigate(routeName);
        }}
        rippleCentered={false}
        rippleColor="grey"
      >
        <Animated.View style={[styles.iconContainer, sizeButton]}>
          {icon}
        </Animated.View>

        <Text style={styles.titleMenu}> {title}</Text>
      </Ripple>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    padding: 15,

    width: "48%",
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,
  },
  titleMenu: {
    marginTop: 10,
    fontWeight: "bold",
    color: "grey",
  },
  iconContainer: {
    backgroundColor: "lightblue",
    borderRadius: 100,
    padding: 5,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 8,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 3,
  },
});

export default MenuButtonProfil;
