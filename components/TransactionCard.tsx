import { Pressable, StyleSheet, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import { Transaction } from "../utils/types";
import { COLORS, FONT } from "../utils/constant";
import CustomText from "./CustomText";
import { formatEther, formatUnits } from "ethers";

type Props = {
  trx: Transaction;
  onPress: (hash: string) => void;
  address?: string
};

export function TransactionCard(props: Props) {
  const isConfirmed = props.trx.status === "ok";
  const isNative = !props.trx.to.is_contract;
  const symbol = isNative ? "RWA" : "USDT";
  const value = isNative ? formatEther(props.trx.value).toString() : formatUnits((props.trx.decoded_input as any).parameters[1].value, 18);
  const isReceived = props.trx.to.hash === '0x13890B3639DE690CD965b92C7fcc97ebdAd7F535'
  const icon = isReceived ? 'south-west' : 'north-east'
  const method = isNative ? isReceived ? 'RECEIVED' : 'SENT' : props.trx.method.toUpperCase()
  return (
    <Pressable
      style={styles.container}
      onPress={() => props.onPress(props.trx.hash)}
    >
      <View style={styles.head}>
        <View style={styles.icon}>
          <Icon name={icon} color={COLORS.PRIMARY} size={20} />
        </View>
        <View>
          <CustomText
            display={`${method} ${symbol.toUpperCase()}`}
            font={FONT.SpaceMono}
            fontSize={12}
          />
          <CustomText
            display={isConfirmed ? "Confirmed" : "Pending"}
            font={FONT.SpaceMono}
            fontSize={10}
            color={isConfirmed ? "green" : "yellow"}
          />
        </View>
      </View>
      <CustomText display={`${value} ${symbol}`} font={FONT.SpaceMono} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 15,
    width: "100%",
    borderBottomWidth: .5,
    paddingBottom: 8,
    borderBottomColor: '#292938'
  },
  icon: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    backgroundColor: "#292938",
    borderRadius: 15,
  },
  head: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
});
