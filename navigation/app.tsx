import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/index.screen';
import WalletScreen from '../screens/wallet.screen';
import TransferScreen from '../screens/transfer.screen';

const {Navigator, Screen} = createNativeStackNavigator();
export function Application() {
    return (
      <NavigationContainer>
        <Navigator screenOptions={{headerShown: false}}>
          <Screen name="Home" component={HomeScreen} />
          <Screen name="wallet" component={WalletScreen} />
          <Screen name="transfer" component={TransferScreen} />
        </Navigator>
      </NavigationContainer>
    );
  }