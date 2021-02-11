import React from "react";
import { Contract } from "@ethersproject/contracts";
import { getDefaultProvider } from "@ethersproject/providers";
import { useQuery } from "@apollo/react-hooks";

import { Body, Button, Header, Image, Link } from "./components";
import logo from "./ethereumLogo.png";
import useWeb3Modal from "./hooks/useWeb3Modal";
import Web3 from "web3";

import { MAINNET_ID, addresses, abis } from "@compound-app/contracts";
import GET_MONEY_MARKETS from "./graphql/subgraph";

async function readOnChainData() {
  let tokenAddress = "0x5aD31601E31427d596FEE422c1D1cad3c6fF0274";
  let walletAddress = "0x28458151eC48491e91022Db4EFe259358F45b30D";

  // The minimum ABI to get ERC20 Token balance
  let minABI = [
    {
      constant: false,
      inputs: [
        {
          name: "from",
          type: "address",
        },
        {
          name: "tokens",
          type: "uint256",
        },
        {
          name: "token",
          type: "address",
        },
        {
          name: "data",
          type: "bytes",
        },
      ],
      name: "receiveApproval",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const web3 = new Web3(Web3.givenProvider);
  web3.eth.getAccounts(console.log);
  web3.eth
    .getBalance("0x28458151eC48491e91022Db4EFe259358F45b30D")
    .then(console.log);
}

function WalletButton({ provider, loadWeb3Modal, logoutOfWeb3Modal }) {
  return (
    <Button
      onClick={() => {
        if (!provider) {
          loadWeb3Modal();
        } else {
          logoutOfWeb3Modal();
        }
      }}
    >
      {!provider ? "Connect Wallet" : "Disconnect Wallet"}
    </Button>
  );
}

function App() {
  const { loading, error, data } = useQuery(GET_MONEY_MARKETS);
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();

  React.useEffect(() => {
    if (!loading && !error && data && data.markets) {
      console.log({ markets: data.markets });
    }
  }, [loading, error, data]);

  return (
    <div>
      <Header>
        <WalletButton
          provider={provider}
          loadWeb3Modal={loadWeb3Modal}
          logoutOfWeb3Modal={logoutOfWeb3Modal}
        />
      </Header>
      <Body>
        <Image src={logo} alt="react-logo" />
        <p>
          Edit <code>packages/react-app/src/App.js</code> and save to reload.
        </p>
        {/* Remove the "hidden" prop and open the JavaScript console in the browser to see what this function does */}
        <Button onClick={() => readOnChainData()}>Read On-Chain Balance</Button>
        <Link
          href="https://ethereum.org/developers/#getting-started"
          style={{ marginTop: "8px" }}
        >
          Learn Ethereum
        </Link>
        <Link href="https://reactjs.org">Learn React</Link>
        <Link href="https://compound.finance/developers">Learn Compound</Link>
      </Body>
    </div>
  );
}

export default App;
