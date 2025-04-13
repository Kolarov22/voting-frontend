import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const deployerAddress: string = "0xCF2145D8Ba029c5E41e6c9D21851cBD1A5936B16";

export function middleware(req: NextRequest) {
  const wagmiState = JSON.parse(
    req.cookies.get("wagmi.store")?.value as string
  );

  const userAddress = wagmiState.state.connections.value[0][1]
    .accounts[0] as string;

  if (userAddress !== deployerAddress) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: "/admin/:path*",
};
