"use client";
import { abi } from "../../constants";
import { useWriteContract } from "wagmi";

const CandidateBlock = ({
  candidate,
  address,
}: {
  candidate: any;
  address: string;
}) => {
  const { writeContractAsync, isPending, isSuccess } = useWriteContract();

  const voteCandidate = async function (
    candidateId: number,
    electionAddress: string
  ) {
    console.log(JSON.stringify(abi[1]));
    console.log("Candidate ID:", candidateId);
    console.log("Election Address:", electionAddress);

    writeContractAsync({
      address: electionAddress as `0x${string}`,
      abi: abi[1],
      functionName: "vote",
      args: [candidateId],
    });

    if (isSuccess) {
      console.log("Vote successful");
    }
  };

  return (
    <div className="flex justify-between gap-4 items-center my-2 px-4">
      <p>{candidate.name}</p>
      <button
        onClick={() => voteCandidate(candidate.id, address)}
        disabled={isPending}
        className="bg-purple-accent rounded-md py-1 px-2 text-white hover:bg-purple-cta"
      >
        Cast vote
      </button>
    </div>
  );
};

export default CandidateBlock;
