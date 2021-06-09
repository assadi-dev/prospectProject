import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SwipeButton = ({ icon, title, style, textColor, backgroundColor }) => {
  return (
    <View
      style={[styles.container, style, { backgroundColor: backgroundColor }]}
    >
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
    </View>
  );
};

export default SwipeButton;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
    margin: 0,
    marginVertical: 5,
    width: 150,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});
