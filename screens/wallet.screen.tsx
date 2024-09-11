import {
  Image,
  StyleSheet,
  Platform,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useEffect, useState } from "react";
import Icon from "@expo/vector-icons/Ionicons";
import { ConnectedWallet } from "../components/ConnectedWallet";
import Balance from "../components/Balance";
import CustomText from "../components/CustomText";
import { FONT } from "../utils/constant";
import { useAccount, useBalance, useReadContract, useToken } from "wagmi";
import FloatingButton from "../components/FloatingButton";

export default function WalletScreen({ navigation }: any) {
  const { isConnected, address } = useAccount();
  const { data, isLoading, refetch } = useBalance({ address });
  const [balances, setBalances] = useState([
    {
      name: "Assetchain RWA",
      symbol: "RWA",
      balance: "0.0",
      icon: (
        <Image style={styles.image} source={require("../assets/rwa.png")} />
      ),
    },
    {
      name: "Tether USD",
      symbol: "USDT",
      balance: "0.0",
      icon: (
        <Image style={styles.image} source={require("../assets/usdt.png")} />
      ),
    },
  ]);
  useEffect(() => {
    if (!isConnected) navigation.navigate("Home");
  }, [isConnected]);

  useEffect(() => {
    _balance();
  }, [data]);

  function _balance() {
    if (data) {
      const _bals = [...balances]
      _bals[0].balance = data.formatted;
     
      setBalances([..._bals]);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={styles.screen}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={() => refetch()} />
      }
    >
      <View>
        <View style={styles.header}>
          <CustomText display="My Wallet" fontSize={16} font={FONT.SpaceMono} />
          <ConnectedWallet />
        </View>

        <View style={styles.wallets}>
          <ScrollView>
            {balances.map((b) => (
              <Balance
                balance={b.balance}
                name={b.name}
                symbol={b.symbol}
                icon={b.icon}
                onPress={() => {}}
                key={b.symbol}
              />
            ))}
          </ScrollView>
          {/* <FlatList
          data={balances}
          renderItem={(b) => (
            <Balance
              balance={b.item.balance}
              name={b.item.name}
              symbol={b.item.symbol}
              icon={b.item.icon}
              onPress={() => {}}
            />
          )}
          keyExtractor={(i) => i.symbol}
        /> */}
        </View>
      </View>
      <FloatingButton onPress={() => navigation.navigate("transfer")}>
        <Icon name="send" color={"#fff"} size={20} />
      </FloatingButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    color: "#FFFFFF",
  },
  screen: {
    flex: 1,
    backgroundColor: `#1C1C26`,
    paddingTop: 20,
    paddingHorizontal: 15,
    justifyContent: 'space-between'
  },
  wallets: {
    width: "100%",
    marginTop: 40,
  },
  image: {
    height: 24,
    width: 24,
    marginRight: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
});
