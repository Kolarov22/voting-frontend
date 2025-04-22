"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { State, WagmiProvider } from "wagmi";
import { config } from "../config/wagmi-config";
import { TimerProvider } from "@/context/TimerContext";

const queryClient = new QueryClient();

export function Providers({
  initialState,
  children,
}: Readonly<{
  children: React.ReactNode;
  initialState: State | undefined;
}>) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <TimerProvider>{children}</TimerProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
