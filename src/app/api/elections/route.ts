import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, description, duration, address } = body;

  try {
    const election = await prisma.election.create({
      data: {
        name,
        description,
        duration,
        address,
      },
    });

    return NextResponse.json(election, { status: 201 });
  } catch (error) {
    console.error("Error creating election:", error);
    return NextResponse.json(
      { error: "Failed to create election" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const elections = await prisma.election.findMany();
    return NextResponse.json(elections, { status: 200 });
  } catch (error) {
    console.error("Error fetching elections:", error);
    return NextResponse.json(
      { error: "Failed to fetch elections" },
      { status: 500 }
    );
  }
}
