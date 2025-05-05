import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { address, candidates } = await request.json();
  try {
    // First find the election by address
    const election = await prisma.election.findUnique({
      where: {
        address,
      },
    });

    if (!election) {
      return NextResponse.json(
        { error: "Election not found" },
        { status: 404 }
      );
    }

    // Then update using the id
    const updatedElection = await prisma.election.update({
      where: {
        id: election.id,
      },
      data: {
        candidates: {
          createMany: {
            data: candidates.map((name: string) => ({ name })),
          },
        },
      },
    });

    return NextResponse.json(updatedElection, { status: 201 });
  } catch (error) {
    console.error("Error adding candidates:", error);
    return NextResponse.json(
      { error: "Failed to add candidates" },
      { status: 500 }
    );
  }
}
