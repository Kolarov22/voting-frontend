import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Providers } from "./providers";
import { cookieToInitialState } from "wagmi";
import { config } from "@/config/wagmi-config";
import { headers } from "next/headers";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "E-Voting",
  description: "E-Voting platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    config,
    headers().get("cookie") ?? ""
  );

  return (
    <html lang="en">
      <body className="font-mono">
        <Providers initialState={initialState}>
          <Navbar />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
