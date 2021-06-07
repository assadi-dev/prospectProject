import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { State, TapGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

const RippleButton = ({ children, style, onPress }) => {
  return (
    <TapGestureHandler>
      <Animated.View style={style}>{children}</Animated.View>
    </TapGestureHandler>
  );
};

export default RippleButton;

const styles = StyleSheet.create({});
