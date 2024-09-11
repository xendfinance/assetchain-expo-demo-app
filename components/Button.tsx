import { TouchableOpacity, StyleSheet, View } from "react-native";
import { CSSProperties, memo } from "react";
import CustomText from "./CustomText";
import { COLORS, FONT } from "../utils/constant";

type Props = {
  title: string;
  tintColor: string;
  foreColor: string;
  onPress?: () => void;
  disabled?: boolean;
  paddingHorizontal?: number;
  paddingVertical?: number;
  borderRadius?: number;
  border?: string;
  width?: number;
  loading?: boolean;
  left?: JSX.Element;
  right?: JSX.Element;
  style?: CSSProperties;
  textColor?: string;
};

export default memo(function CustomButton({
  title,
  tintColor,
  foreColor,
  onPress,
  disabled,
  paddingHorizontal,
  paddingVertical,
  border,
  width,
  loading,
  left,
  right,
  borderRadius,
  style,
  textColor,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.btn,
        {
          backgroundColor: loading || disabled ? COLORS.ACCENT : foreColor,
          paddingHorizontal: paddingHorizontal ? paddingHorizontal : undefined,
          paddingVertical: paddingVertical ? paddingVertical : undefined,
          borderColor: loading || disabled ? "#F8F9FB" : border,
          borderWidth: border ? 1 : undefined,
          width,
          borderRadius: borderRadius ? borderRadius : 30,
        },
        // @ts-ignore
        style,
      ]}
    >
      {left}
      <View style={styles.text}>
        <CustomText
          display={loading ? "Loading..." : title}
          color={textColor ? textColor : "#fff"}
          font={FONT.SpaceMono}
          textAlign="center"
        />
      </View>

      <View style={{ marginLeft: 5 }}>{right}</View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  btn: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 30,
    paddingVertical: 8,
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: "100%",
  },
});
