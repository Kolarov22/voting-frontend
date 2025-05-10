import Link from "next/link";
import type { Election } from "@/types";
import Timer from "./Timer";

const ElectionBlock = (election: Election) => {
  return (
    <div className="min-w-fit sm:w-[600px] inline-flex justify-between items-center text-black p-4 rounded-lg shadow-md gap-6 bg-slate-100 dark:bg-grey-accent dark:text-frost-white">
      <div>
        <h2 className="text-xl font-semibold">{election.name}</h2>
        <p className="text-sm">{election.description}</p>
      </div>

      <Timer
        duration={election.duration}
        id={election.id}
        address={election.address}
      />

      <div>
        <Link href={`/elections/${election.address}`}>
          <button className="bg-purple-accent hover:bg-purple-cta text-white px-4 py-2 rounded-lg">
            View Election
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ElectionBlock;
