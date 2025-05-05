import ElectionBlock from "@/components/ElectionBlock";
import type { Election } from "@/types";

async function getElections(): Promise<Election[]> {
  const URL = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${URL}/elections`, {
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch elections");
  }

  return response.json();
}

const ElectionsPage = async () => {
  const elections = await getElections();

  return (
    <div className="container my-20 px-3 mx-auto flex flex-col justify-between items-center gap-4 md:gap-8">
      <h2 className="place-self-start text-3xl font-bold">Elections</h2>
      {elections.length === 0 ? (
        <div className="text-center">
          <h2 className="text-2xl font-semibold">No elections ongoing</h2>
        </div>
      ) : (
        elections.map((election) => (
          <ElectionBlock key={election.address} {...election} />
        ))
      )}
    </div>
  );
};

export default ElectionsPage;
