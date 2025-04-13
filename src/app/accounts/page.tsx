import Account from "@/components/Account";
import ConnectWallet from "@/components/ConnectWallet";

const AccountsPage = () => {
  return (
    <div className="flex flex-col items-center justify-center sm:gap-4 gap-10 my-10">
      <ConnectWallet />
    </div>
  );
};

export default AccountsPage;
