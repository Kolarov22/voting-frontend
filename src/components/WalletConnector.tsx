import * as React from "react";
import { Connector, useConnect } from "wagmi";

export default function WalletConnector() {
  const { connectors, connect } = useConnect();

  const metamaskConnector = connectors.find(
    (connector) => connector.name === "MetaMask"
  );

  return metamaskConnector ? (
    <WalletOption
      key={metamaskConnector.uid}
      connector={metamaskConnector}
      onClick={() => connect({ connector: metamaskConnector })}
    />
  ) : (
    <div>Please install MetaMask to connect your wallet.</div>
  );
}

function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <button
      className="bg-purple-cta rounded-md text-frost-white px-4 py-2"
      disabled={!ready}
      onClick={onClick}
    >
      Connect with {connector.name}
    </button>
  );
}
