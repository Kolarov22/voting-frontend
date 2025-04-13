"use client";

import { useAccount } from "wagmi";
import Account from "./Account";
import WalletConnector from "./WalletConnector";

export default function ConnectWallet() {
  const { isConnected } = useAccount();

  return isConnected ? (
    <>
      <h1 className="text-2xl text-center mb-5">
        Welcome to E-Voting platform
      </h1>
      <Account />
    </>
  ) : (
    <>
      <h1 className="text-2xl text-center mb-5">
        Welcome to E-Voting platform, in order to interact with the app you
        should install <a href="https://metamask.io/download">MetaMask</a>
      </h1>
      <WalletConnector />
    </>
  );
}
