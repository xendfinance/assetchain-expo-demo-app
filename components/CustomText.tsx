import { Text } from "react-native";
import { CSSProperties } from "react";
import { FONT } from "../utils/constant";

type Props = {
  display: string;
  font: FONT;
  color?: string;
  italic?: boolean;
  fontSize?: number;
  textAlign?: "auto" | "left" | "right" | "center" | "justify";
  textDecoration?: "underline" | "line-through" | "underline line-through";
  onPress?: () => void;
  opacity?: number;
  marginVerical?: number;
  fontWeight?: any
  numberOfLines?: number
  ellipsizeMode?: 'tail' | 'head' | 'middle' | 'clip';
  style?:CSSProperties
};
export default function CustomText({
  display,
  font,
  color,
  italic,
  textAlign,
  textDecoration,
  onPress,
  fontSize,
  opacity,
  fontWeight,
  marginVerical,
  numberOfLines,
  ellipsizeMode,
  style
}: Props) {
  return (
    <Text
      style={[{
        fontFamily: font,
        color: color ? color : "white",
        fontStyle: italic ? "italic" : "normal",
        textDecorationLine: textDecoration ? textDecoration : "none",
        marginVertical: marginVerical ? marginVerical  : 3 ,
        textAlign: textAlign ? textAlign : "left",
        fontSize: fontSize ? fontSize  : 14,
        display: "flex",
        flexWrap: "wrap",
        opacity: opacity,
        fontWeight
      },
      // @ts-ignore
      style]}
      onPress={onPress}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
    >
      {display}
    </Text>
  );
}
