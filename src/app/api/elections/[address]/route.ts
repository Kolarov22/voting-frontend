import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { address: string } }
) {
  const { address } = params;

  try {
    const election = await prisma.election.findUnique({
      where: {
        address,
      },
      include: {
        candidates: true,
        voters: true,
      },
    });

    if (!election) {
      return NextResponse.json(
        { error: "Election not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(election, { status: 200 });
  } catch (error) {
    console.error("Error fetching election:", error);
    return NextResponse.json(
      { error: "Failed to fetch election" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { address: string } }
) {
  const { address } = params;

  try {
    const election = await prisma.election.delete({
      where: {
        address,
      },
      include: {
        candidates: true,
        voters: true,
      },
    });

    return NextResponse.json(election, { status: 200 });
  } catch (error) {
    console.error("Error deleting election:", error);
    return NextResponse.json(
      { error: "Failed to delete election" },
      { status: 500 }
    );
  }
}
