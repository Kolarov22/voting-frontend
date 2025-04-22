"use client";

import { useAccount } from "wagmi";
import Account from "./Account";
import WalletConnector from "./WalletConnector";
import Link from "next/link";

export default function ConnectWallet() {
  const { isConnected, address } = useAccount();

  return isConnected ? (
    <>
      <h1 className="text-2xl text-center mb-5">
        Welcome to E-Voting platform
      </h1>
      <Account />

      {address === "0xCF2145D8Ba029c5E41e6c9D21851cBD1A5936B16" ? (
        <Link href={"/admin"}>
          <button className="bg-purple-cta text-white px-4 py-2 rounded-lg">
            Go to admin dashboard
          </button>
        </Link>
      ) : null}
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
