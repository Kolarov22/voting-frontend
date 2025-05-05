import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const wagmiState = JSON.parse(
    req.cookies.get("wagmi.store")?.value as string
  );

  const chainId = wagmiState.state.chainId as string;

  const deployerAddress: string =
    chainId != "31337"
      ? "0xCF2145D8Ba029c5E41e6c9D21851cBD1A5936B16"
      : "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

  const userAddress = wagmiState.state.connections.value[0][1]
    .accounts[0] as string;

  if (userAddress !== deployerAddress) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: "/admin/:path*",
};
