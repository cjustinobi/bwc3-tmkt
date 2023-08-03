import type { AppProps } from "next/app";
import {getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import Layout from "../components/Layout";
import "../styles/globals.css"
import "@rainbow-me/rainbowkit/styles.css"
import { celo } from "viem/chains"
import { publicProvider } from 'wagmi/providers/public'




const projectId = process.env.NEXT_PUBLIC_PROJECTID as string // get one at https://cloud.walletconnect.com/app

const { chains, publicClient } = configureChains(
  [celo],
  // [jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }) })]
  [publicProvider()]
);
  
const { connectors } = getDefaultWallets({
  appName: 'Talent Mkt',
  projectId: projectId,
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient: publicClient,
});

function App({ Component, pageProps }: AppProps) {
  return (
    <main>

      <WagmiConfig config={wagmiConfig}>

      <RainbowKitProvider chains={chains} coolMode={true}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RainbowKitProvider>
      </WagmiConfig>


    </main>  

  )
}

export default App;