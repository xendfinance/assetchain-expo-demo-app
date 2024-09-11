import { Image, StyleSheet, View } from "react-native";
import { useWeb3Modal } from "@web3modal/wagmi-react-native";
import CustomText from "../components/CustomText";
import { COLORS, FONT } from "../utils/constant";
import Button from "../components/Button";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export default function HomeScreen({navigation, route}: any) {
  const { open } = useWeb3Modal();
  const {isConnected} = useAccount()

  async function connect() {
    if (isConnected){
      navigation.navigate('wallet')
      return
    }
    open({view: 'Networks'});
  }

  useEffect(() => {
    if (isConnected){
      navigation.navigate('wallet')
    }
  }, [isConnected])


  return (
    <View style={styles.screen}>
      <View>
        <CustomText
          font={FONT.SpaceMono}
          display="Asset Chain Demo app"
          fontSize={20}
          textAlign="center"
        />

        <View style={styles.center}>
          <View style={styles.imageCon}>
            <Image
              style={styles.image}
              source={require("../assets/assetchain.png")}
            />
          </View>
        </View>
      </View>
      <Button
        foreColor={COLORS.PRIMARY}
        tintColor="white"
        paddingVertical={10}
        title="Connect Wallet"
        onPress={connect}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  title: {
    textAlign: "center",
    color: "#FFFFFF",
  },
  screen: {
    flex: 1,
    backgroundColor: `#1C1C26`,
    paddingTop: 60,
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  center: {
    height: 250,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageCon: {
    height: 100,
    width: 100,
    marginVertical: 10,
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
