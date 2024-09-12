import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { Transaction } from "../utils/types";
import CustomText from "../components/CustomText";
import { COLORS, FONT } from "../utils/constant";
import { getTransactionByhash } from "../api/history";
import { TransactionDetails } from "../components/TransactionDetails";
import { useAccount } from "wagmi";

export function TransactionDetailsScreen({ navigation, route }: any) {
  const { hash } = route.params;
  const [transaction, setTransaction] = useState<Transaction>();
  const { address, isConnected } = useAccount();
  const [uiState, setUiState] = useState({ loading: true, error: false });

  useEffect(() => {
    if (!isConnected) navigation.navigate("Home");
  }, [isConnected]);

  useEffect(() => {
    _getTransactionByHash();
  }, [hash]);

  async function _getTransactionByHash() {
    try {
      setUiState({ ...uiState, loading: true, error: false });
      const trx = await getTransactionByhash(hash);
      setTransaction({ ...trx });
      setUiState({ ...uiState, loading: false });
    } catch (error) {
      setUiState({ ...uiState, loading: false, error: true });
    }
  }

  async function _openLink() {
    try {
      if (!transaction) return;
      await Linking.openURL(
        `https://scan-testnet.assetchain.org/tx/${transaction.hash}`
      );
    } catch (error) {
      console.error(error);
    }
  }

  function render() {
    if (uiState.loading)
      return (
        <View style={styles.centerView}>
          <ActivityIndicator size={"large"} color={COLORS.PRIMARY} />
        </View>
      );
    if (!transaction)
      return (
        <View style={styles.centerView}>
          <CustomText
            display="Transaction not found"
            font={FONT.SpaceMono}
            fontSize={16}
          />
        </View>
      );

    if (uiState.error)
      return (
        <View style={styles.centerView}>
          <CustomText
            display="Error Fetching Transaction"
            font={FONT.SpaceMono}
            fontSize={16}
          />
        </View>
      );

    return (
      <View>
        <TransactionDetails address={address as any} trx={transaction} />
        <Pressable style={styles.center} onPress={_openLink}>
          <CustomText
            display="View in Explorer"
            font={FONT.SpaceMono}
            fontSize={16}
          />
        </Pressable>
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Icon
          onPress={() => navigation.goBack()}
          name="chevron-back"
          size={20}
          color={"#fff"}
        />
        <View style={styles.center}>
          <CustomText
            display="Transaction Details"
            font={FONT.SpaceMono}
            fontSize={15}
          />
        </View>
      </View>
      {render()}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: `#1C1C26`,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  centerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  center: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  form: {
    marginTop: 30,
  },
  bal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
    marginTop: 8,
    // marginHorizontal: 15,
  },
});
