import { Linking, Pressable, StyleSheet, View } from "react-native";
import { Transaction } from "../utils/types";
import { formatEther, formatUnits } from "ethers";
import Icon from "@expo/vector-icons/MaterialIcons";
import { FONT } from "../utils/constant";
import CustomText from "./CustomText";
import { capitalizeFirstLetter, shortenEthAddress } from "../utils/helpers";

type Props = {
  trx: Transaction;
  address: string;
};
export function TransactionDetails(props: Props) {
  const isConfirmed = props.trx.status === "ok";
  const isNative = !props.trx.to.is_contract;
  const symbol = isNative ? "RWA" : "USDT";
  const value = isNative
    ? formatEther(props.trx.value).toString()
    : formatUnits((props.trx.decoded_input as any).parameters[1].value, 18);
  const isReceived = props.trx.to.hash === props.address;
  const icon = isReceived ? "south-west" : "north-east";
  const method = isNative
    ? isReceived
      ? "RECEIVED"
      : "SENT"
    : props.trx.method.toUpperCase();
  const details: any = {
    hash: shortenEthAddress(props.trx.hash),
    receipient: isNative
      ? shortenEthAddress(props.trx.to.hash)
      : shortenEthAddress((props.trx.decoded_input as any).parameters[0].value),
    from: shortenEthAddress(props.trx.from.hash),
    amount: `${value} ${symbol}`,
    nonce: props.trx.nonce,
    gas_used: props.trx.gas_used,
    total_gas_fee: `${formatEther(props.trx.fee.value)} RWA`,
    status: isConfirmed,
  };
  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <View style={styles.icon}>
          <Icon name={icon} size={25} color={isReceived ? "green" : "red"} />
        </View>
        <CustomText
          display={method}
          fontSize={18}
          textAlign="center"
          font={FONT.SpaceMono}
        />
        <CustomText
          display={`${value} ${symbol}`}
          fontSize={16}
          textAlign="center"
          font={FONT.SpaceMono}
          color="#A1A1B5"
          fontWeight={"bold"}
        />
      </View>
      <View style={styles.details}>
        {Object.keys(details).map((key) => {
          const label = key.replace(/_/g, " ");
          return (
            <View style={styles.row} key={key}>
              <CustomText
                display={capitalizeFirstLetter(label)}
                font={FONT.SpaceMono}
                fontSize={14}
                fontWeight={"bold"}
              />
              <CustomText
                display={
                  key === "status"
                    ? details[key]
                      ? "Confirmed"
                      : "Pending"
                    : details[key]
                }
                font={FONT.SpaceMono}
                fontSize={12}
                color={
                  key === "status"
                    ? details[key]
                      ? "green"
                      : "yellow"
                    : "#A1A1B5"
                }
                textAlign="right"
              />
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    marginVertical: 15,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    backgroundColor: "#3D3D52",
    borderRadius: 25,
  },
  container: {
    marginVertical: 15,
    borderRadius: 15,
    backgroundColor: `#292938`,
    padding: 10,
    width: "100%",
  },
  row: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
    justifyContent: "space-between",
  },
  details: {
    borderTopWidth: 1,
    paddingVertical: 15,
    borderTopColor: "#292938",
  },
});
