import {
  Image,
  StyleSheet,
  Platform,
  View,
  ScrollView,
  RefreshControl,
  Dimensions,
} from "react-native";
import { useEffect, useState } from "react";
import Icon from "@expo/vector-icons/Ionicons";
import { ConnectedWallet } from "../components/ConnectedWallet";
import Balance from "../components/Balance";
import CustomText from "../components/CustomText";
import { FONT, USDTCONTRACT } from "../utils/constant";
import { useAccount, useBalance, useReadContract, useToken } from "wagmi";
import FloatingButton from "../components/FloatingButton";
import { getTransactions } from "../api/history";
import { Transaction } from "../utils/types";
import { TransactionCard } from "../components/TransactionCard";

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
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  useEffect(() => {
    if (!isConnected) navigation.navigate("Home");
  }, [isConnected]);

  useEffect(() => {
    _balance();
  }, [data]);

  useEffect(() => {
    _gettransactions();
    refetch();
  }, [address]);


  function _balance() {
    if (data) {
      const _bals = [...balances];
      _bals[0].balance = data.formatted;

      setBalances([..._bals]);
    }
  }

  async function _gettransactions() {
    if (address) {
      const { items } = await getTransactions(address);
      setTransactions([...items]);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={styles.screen}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => {
            refetch();
            _gettransactions();
          }}
        />
      }
    >
      <View>
        <View style={styles.header}>
          <CustomText display="My Wallet" fontSize={16} font={FONT.SpaceMono} />
          <ConnectedWallet />
        </View>

        <View style={styles.wallets}>
          <View>
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
          </View>
          
          <View style={styles.trx}>
            <CustomText
              display="Activities"
              font={FONT.SpaceMono}
              fontSize={13}
            />
            <ScrollView style={{ marginTop: 10 }}>
              {transactions
                .filter((t) => t.to.hash === USDTCONTRACT || !t.to.is_contract)
                .slice(0, 5)
                .map((t, i) => (
                  <TransactionCard key={i} onPress={() => {}} trx={t} />
                ))}
            </ScrollView>
          </View>
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
    // justifyContent: "space-between",
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
  trx: {
    marginTop: 20,
    width: "100%",
  },
});
