import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomBtn = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#5319CF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#FFDEB9",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomBtn;
