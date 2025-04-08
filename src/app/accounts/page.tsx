import Account from "@/components/Account";
import ConnectWallet from "@/components/ConnectWallet";

const AccountsPage = () => {
  return (
    <div>
      <h1>Connected account: </h1>
      <ConnectWallet />
    </div>
  );
};

export default AccountsPage;
