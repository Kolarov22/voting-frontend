"use client";
import { abi } from "../../constants";
import { useWriteContract } from "wagmi";
import { useToast } from "@/hooks/use-toast";

const CandidateBlock = ({
  candidate,
  address,
}: {
  candidate: any;
  address: string;
}) => {
  const { writeContractAsync, isPending, isSuccess } = useWriteContract();
  const { toast } = useToast();

  const voteCandidate = async function (
    candidateId: number,
    electionAddress: string
  ) {
    try {
      await writeContractAsync({
        address: electionAddress as `0x${string}`,
        abi: abi[1],
        functionName: "vote",
        args: [candidateId],
      });

      toast({
        title: "Vote cast successfully",
        description: `You have voted for ${candidate.name}`,
        variant: "default",
      });
    } catch (error) {
      console.log("Vote casting failed", error);
      toast({
        title: "Vote casting failed",
        description: "An error occurred while casting your vote",
        variant: "destructive",
      });
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
