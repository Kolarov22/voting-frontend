"use client";

import CandidateBlock from "./CandidateBlock";
import { abi } from "../../constants";

import { useReadContract, usePublicClient } from "wagmi";

const Candidates = ({ address }: { address: any }) => {
  const publicClient = usePublicClient();

  const { data: candidates, isLoading } = useReadContract({
    address: address,
    abi: abi[1],
    functionName: "getAllCandidates",
    args: [],
  });

  return (
    <div className="max-w-1/3 bg-frost-white dark:bg-grey-accent dark:text-frost-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold text-center mb-5">Candidates</h2>
      <ul className="">
        {isLoading ? (
          <p>Loading candidates...</p>
        ) : candidates && candidates.length > 0 ? (
          candidates.map((candidate: any) => (
            <CandidateBlock
              candidate={candidate}
              key={candidate.id}
              address={address}
            />
          ))
        ) : (
          <p>No candidates found</p>
        )}
      </ul>
    </div>
  );
};

export default Candidates;
