"use client";

import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";

export default function Account() {
  const { address, chain, chainId } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address: address! });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  return (
    <div className="flex flex-col items-start justify-center sm:gap-4 gap-10 my-10 bg-slate-100 p-12 rounded-lg shadow-md dark:text-white dark:bg-grey-accent">
      <h1 className="text-xl self-center font-medium md:mb-5">
        Wallet information
      </h1>
      {ensName && <div>ENS Name: {ensName}</div>}
      {address && <div>Address: {address}</div>}
      {chain && (
        <div>
          Chain: {chain.name} ({chainId})
        </div>
      )}
      <button
        className="bg-purple-cta rounded-md text-frost-white px-4 py-2 self-center mt-2"
        onClick={() => disconnect()}
      >
        Disconnect
      </button>
    </div>
  );
}
