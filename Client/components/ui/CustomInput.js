import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

const CustomInput = ({
  placeholder,
  value,
  onChangeText,
  style,
  type,
  keyboardType,
}) => {
  const borderOpt = {
    borderBottomColor: type === "Income" ? "#7149C6" : "#FC2947",
  };
  const colorOpt = {
    color: type === "Income" ? "#7149C6" : "#FC2947",
  };
  return (
    <View style={[styles.inputContainer, borderOpt]}>
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={colorOpt.color}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
    width: 100,
    borderBottomWidth: 1,
  },
  input: {
    textAlign: "center",
    fontSize: 16,
    paddingBottom: 5,
    color: "#7149C6",
  },
});

export default CustomInput;
