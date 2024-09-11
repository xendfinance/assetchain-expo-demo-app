import "@walletconnect/react-native-compat";
import { WagmiProvider } from "wagmi";
import { RootSiblingParent } from "react-native-root-siblings";
import { assetChainTestnet } from "@wagmi/core/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createWeb3Modal,
  defaultWagmiConfig,
  Web3Modal,
} from "@web3modal/wagmi-react-native";
import { Application } from "./navigation/app";
import { StatusBar } from "react-native";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { hideAsync } from "expo-splash-screen";


const queryClient = new QueryClient();

// Get projectId at https://cloud.walletconnect.com
const projectId = process.env.WALLECT_CONNECT_PROJECTID as string;


const metadata = {
  name: "AppKit RN",
  description: "AppKit RN Example",
  url: "https://walletconnect.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
  redirect: {
    native: "YOUR_APP_SCHEME://",
    universal: "YOUR_APP_UNIVERSAL_LINK.com",
  },
};

const chains = [assetChainTestnet] as const;

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({
  projectId,
  wagmiConfig,
  defaultChain: assetChainTestnet,
});

export default function App() {
  const [loaded] = useFonts({
    SpaceMono: require("./assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RootSiblingParent>
          <Application />
          <StatusBar />
          <Web3Modal />
        </RootSiblingParent>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
