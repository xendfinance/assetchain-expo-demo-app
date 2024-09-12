import { Pressable, StyleSheet, View, Text } from "react-native";
import CustomText from "./CustomText";
import { FONT } from "../utils/constant";

type Props = {
  name: string;
  symbol: string;
  balance: string;
  icon: any
  onPress: (symbol: string) => void
};
export default function Balance(props: Props) {
  return (
    <Pressable style={styles.container}>
      <View style={styles.head}>
        {props.icon}
        <CustomText display={props.name} font={FONT.SpaceMono} fontSize={16} />
      </View>
      <View>
      <CustomText display={`${(+props.balance)} ${props.symbol}`} fontWeight={'bold'} font={FONT.SpaceMono} fontSize={15} color="#A1A1B5"/>
        {/* <ThemedText>
                {props.symbol}
            </ThemedText> */}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 15,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
