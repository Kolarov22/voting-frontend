import Timer from "@/components/Timer";
import Candidates from "@/components/Candidates";

const getElection = async (address: string) => {
  const URL = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${URL}/api/elections/${address}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch election");
  }

  const data = await response.json();
  return data;
};

const ElectionPage = async ({
  params,
}: {
  params: Promise<{ address: string }>;
}) => {
  const { address } = await params;
  const election = await getElection(address);
  const sepoliaVerifyURL = `https://sepolia.etherscan.io/address/${address}`;

  return (
    <div className="container p-2 my-10 flex flex-col justify-between gap-16 md:gap-10 mx-auto">
      <div className="flex justify-between items-center ">
        <h1 className="text-2xl">{election.name}</h1>
        <Timer
          duration={election.duration}
          id={election.id}
          address={election.address}
        />
      </div>

      <div className="container mx-auto flex justify-around items-center gap-8 flex-wrap py-6 px-3 border">
        <div className="w-2/3 space-y-4">
          <h2 className="text-lg font-semibold">Description</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
            molestias, fugit animi aliquam ratione ipsum, a aliquid excepturi,
            provident eligendi ducimus enim ad aut! Accusantium, molestiae ipsam
            itaque perferendis eum assumenda consequatur modi quos ad ex
            laborum, est deleniti voluptates, ab sunt aperiam autem. Delectus
            deleniti iste ducimus harum repellendus.
          </p>

          <h2 className="">
            Created:{" "}
            {new Date(election.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </h2>

          <button className="bg-purple-accent hover:bg-purple-cta text-white px-2 py-1 rounded-lg">
            <a href={sepoliaVerifyURL}>View contract on Etherscan</a>
          </button>
        </div>

        <Candidates address={election.address} />
      </div>
    </div>
  );
};

export default ElectionPage;
