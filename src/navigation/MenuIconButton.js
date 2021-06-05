import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { color } from "react-native-reanimated";

const MenuIconButton = ({ focused, label, icon, color }) => {
  return (
    <View style={styles.iconContainer}>
      {icon}
      <Text style={[styles.label, { color: color }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    marginTop: 5,
    fontSize: 10,
  },
});

export default MenuIconButton;
