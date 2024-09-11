import React from "react";
import { View, TextInput, StyleSheet, TextInputProps } from "react-native";
import { COLORS, FONT } from "../utils/constant";
import CustomText from "./CustomText";

type Props = {
  inputProps: TextInputProps;
  label?: string;
};

const CustomInput = (props: Props) => {
  return (
    <View style={[styles.container, props.inputProps.style]}>
      {props.label && (
        <CustomText display={props.label} font={FONT.SpaceMono} fontSize={14} />
      )}
      <TextInput
        style={styles.input}
        placeholder={props.inputProps.placeholder}
        value={props.inputProps.value}
        onChangeText={props.inputProps.onChangeText}
        {...props.inputProps}
        placeholderTextColor={'#fff'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    marginTop: 10
  },
  input: {
    height: 50,
    borderColor: "#A1A1B5",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 14,
    backgroundColor: COLORS.ACCENT,
    fontFamily: FONT.SpaceMono,
    color: '#fff'
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: "#fff",
  },
});

export default CustomInput;
