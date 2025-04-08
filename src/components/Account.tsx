"use client";

import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";

export default function Account() {
  const { address, chain, chainId } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address: address! });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  return (
    <div>
      {ensName && <div>ENS Name: {ensName}</div>}
      {address && <div>Address: {address}</div>}
      {chain && (
        <div>
          Chain: {chain.name} ({chainId})
        </div>
      )}
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  );
}
