import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import CustomText from "../components/CustomText";
import { COLORS, FONT, USDTCONTRACT } from "../utils/constant";
import DropdownSelect from "../components/Dropdown";
import { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import Button from "../components/Button";
import { useAccount, useBalance, useReadContract, useSendTransaction, useWriteContract } from "wagmi";
import { formatEther, isAddress, parseEther } from "ethers";
import Toast from "react-native-root-toast";
import ABI from "../utils/abi.json";

const options = ["RWA", "USDT"];

export default function TransferScreen({ navigation }: any) {
  const { address, isConnected } = useAccount();
  const { data, refetch, isLoading } = useBalance({ address });
  const { data: usdtBal } = useReadContract({abi:ABI, address: USDTCONTRACT, functionName: 'balanceOf', args: [address]});
  const { writeContract, isPending: _isLoading, error: _error, data: usdttxData, isSuccess: usdtIsSuccess } = useWriteContract();
  const {
    sendTransaction,
    isSuccess,
    data: _txData,
    error,
    isPending,
  } = useSendTransaction();
  const [state, setState] = useState({
    asset: options[0],
    amount: "",
    address: "",
    formInvalid: true,
  });

  const balance = state.asset === 'RWA' ? data ? (+data.formatted).toFixed(6) : '0' : usdtBal ? (+formatEther(usdtBal as any)).toFixed(2) : '0'

  useEffect(() => {
    if (!isConnected) navigation.navigate("Home");
  }, [isConnected]);

  useEffect(() => {
    if (error) {
      Toast.show(`Transaction Failed!`);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      Toast.show("Transaction has been Submitted");
      refetch();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (_error) {
      Toast.show(`Transaction Failed!`);
    }
  }, [_error]);

  useEffect(() => {
    if (usdtIsSuccess) {
      Toast.show("Transaction has been Submitted");
      refetch();
    }
  }, [usdtIsSuccess]);

  function onFormChanged(id: "address" | "amount", value: string) {
    switch (id) {
      case "address":
        const isInvalid = !isAddress(value) || !state.amount || Number.isNaN(state.amount) || +balance < +state.amount
        setState({ ...state, address: value, formInvalid: isInvalid });
        break;
      case "amount":
        const _isInvalid = !value || Number.isNaN(value) || !state.address || !isAddress(state.address) || +balance < +value
        setState({
          ...state,
          amount: value,
          formInvalid: _isInvalid
        });
        break;
    }
  }
  async function send() {
    try {
      if (!state.address || !state.amount) return;
      const amountInWei = parseEther(state.amount);
      if (state.asset === 'USDT'){
        sendToken()
        return
      }
      sendTransaction({ to: state.address as any, value: amountInWei }, {});
    } catch (error: any) {
      Toast.show('Something went wrong')
    }
  }

  async function sendToken(){
    try {
      const amountInWei = parseEther(state.amount);
      writeContract({
        abi: ABI,
        address: USDTCONTRACT,
        functionName: 'transfer',
        args: [state.address, amountInWei],

      })
    } catch (error: any) {
      console.log(error.message)
      Toast.show("Transaction Failed")
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
          <Icon
            onPress={() => navigation.goBack()}
            name="chevron-back"
            size={20}
            color={"#fff"}
          />
          <View style={styles.center}>
            <CustomText
              display="Make a Transfer"
              font={FONT.SpaceMono}
              fontSize={15}
            />
          </View>
        </View>
        <View style={styles.form}>
          <DropdownSelect
            onValueChange={(v) => {
              setState({ ...state, asset: v });
            }}
            options={options}
            selectedValue={state.asset}
            label="Select Asset"
          />
          <CustomInput
            inputProps={{
              placeholder: "enter address...",
              value: state.address,
              onChangeText: (v) => {
                onFormChanged("address", v);
              },
            }}
            label="To Address"
          />
          <CustomInput
            inputProps={{
              placeholder: "enter amount...",
              value: state.amount,
              onChangeText: (v) => {
                onFormChanged("amount", v);
              },
              keyboardType: "number-pad",
            }}
            label="Amount"
          />
          <View style={styles.bal}>
            <CustomText display="Balance" font={FONT.SpaceMono} fontSize={12} />
            <CustomText
              display={
                `${balance} ${state.asset}`
              }
              font={FONT.SpaceMono}
              fontSize={12}
              color={"#A1A1B5"}
            />
          </View>
        </View>
      </View>
      <Button
        foreColor={COLORS.PRIMARY}
        tintColor="white"
        paddingVertical={10}
        title={isPending ? "Sending" : "Transfer"}
        disabled={state.formInvalid || isPending}
        onPress={send}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: `#1C1C26`,
    paddingHorizontal: 15,
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  center: {
    width: "90%",
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
