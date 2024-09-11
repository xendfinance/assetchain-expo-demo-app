import { Image, Pressable, StyleSheet } from "react-native";
import CustomText from "./CustomText";
import { FONT } from "../utils/constant";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi-react-native";

export function ConnectedWallet(){
    const {isConnected} = useAccount()
    const {open} = useWeb3Modal()

    function _open(){
        if (!isConnected){
            open({view: 'Networks'})
        }else {
            open()
        }
    }

    return <Pressable style={styles.container} onPress={_open} >
        <Image style={styles.image} source={require('../assets/rwa.png')} />
        <CustomText display={isConnected ? 'View Wallet' : 'Connect Wallet'} font={FONT.SpaceMono} fontSize={12}/>
    </Pressable>

}


const styles = StyleSheet.create({
    image: {
        height: 20,
        width: 10,
        marginRight: 5
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})