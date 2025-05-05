"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { submitElectionSchema } from "@/schemas";

import { useWriteContract, useAccount } from "wagmi";

import { useWatchContractEvent, usePublicClient } from "wagmi";
import { abi, contractAddresses } from "../../constants";
import { useState } from "react";
import { decodeEventLog } from "viem";

const ElectionAddDropdown = () => {
  const URL = process.env.NEXT_PUBLIC_API_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [deployedContractAddress, setDeployedContractAddress] = useState<
    string | null
  >(null);

  const publicClient = usePublicClient();

  const [electionData, setElectionData] = useState<{
    name: string;
    description: string;
    duration: number;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<z.infer<typeof submitElectionSchema>>({
    resolver: zodResolver(submitElectionSchema),
  });

  const account = useAccount();
  const chainId = account.chainId?.toString();

  if (chainId === undefined) {
    console.error("Chain ID is undefined");
  }

  const factoryAddress =
    chainId && chainId in contractAddresses
      ? contractAddresses[chainId as keyof typeof contractAddresses][0]
      : undefined;

  const { writeContractAsync, isPending, isSuccess } = useWriteContract();

  const saveElectionToDatabase = async (election: {
    name: string;
    description: string;
    duration: number;
    address: `0x${string}`;
  }) => {
    try {
      const response = await fetch(`${URL}/elections`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(election),
      });

      if (!response.ok) {
        throw new Error("Failed to save election");
      }

      const data = await response.json();
      console.log("Election saved:", data);
    } catch (error) {
      console.error("Error saving election:", error);
    }
  };

  const onSubmit = async (data: z.infer<typeof submitElectionSchema>) => {
    const { name, description, duration } = data;

    // Early validation
    if (!factoryAddress) {
      console.error(
        "Factory address not available. Check your network connection."
      );
      return;
    }

    if (!publicClient) {
      console.error("Public client not available");
      return;
    }

    // Store form data first
    setElectionData({ name, description, duration });
    setIsLoading(true);

    try {
      // Step 1: Send the transaction
      console.log("Creating election with duration:", duration);
      const hash = await writeContractAsync({
        address: factoryAddress as `0x${string}`,
        abi: abi[0],
        functionName: "createElection",
        args: [duration],
      });
      console.log("Transaction submitted with hash:", hash);

      // Step 2: Wait for confirmation
      const receipt = await publicClient.waitForTransactionReceipt({
        hash: hash as `0x${string}`,
        timeout: 60_000, // 60 seconds timeout
      });
      console.log("Transaction confirmed:", receipt);

      // Step 3: Parse logs to find the event
      let electionAddress: `0x${string}` | null = null;

      for (const log of receipt.logs) {
        try {
          const decodedLog = decodeEventLog({
            abi: abi[0],
            data: log.data,
            topics: log.topics,
          });

          if (decodedLog.eventName === "ElectionCreated") {
            electionAddress = decodedLog?.args
              ?.electionAddress as `0x${string}`;
            console.log("Found election address:", electionAddress);
            break;
          }
        } catch (e) {
          // Skip logs that can't be decoded with our ABI
        }
      }

      // Step 4: Handle the result
      if (electionAddress) {
        setDeployedContractAddress(electionAddress);

        // Step 5: Save to database
        await saveElectionToDatabase({
          name,
          description,
          duration,
          address: electionAddress,
        });

        // Step 6: Reset UI state
        reset();
        console.log("Election created successfully");
      } else {
        console.error("No ElectionCreated event found in transaction logs");
      }
    } catch (error) {
      console.error("Error in election creation:", error);

      // Provide more specific error message if possible
      if (error instanceof Error) {
        if (error.message.includes("user rejected")) {
          console.log("Transaction was rejected by the user");
        } else if (error.message.includes("insufficient funds")) {
          console.log("Insufficient funds for transaction");
        }
      }
    } finally {
      // Always clean up state
      setIsLoading(false);
      setElectionData(null);
    }
  };

  return (
    <div className="w-1/2">
      <Accordion type="single" collapsible>
        <AccordionItem
          className="border shadow-sm rounded-lg p-2 dark:bg-slate-800 dark:border-frost-white"
          value="item-1"
        >
          <AccordionTrigger className="justify-center">
            Add election
          </AccordionTrigger>
          <AccordionContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 py-2 flex flex-col gap-4"
            >
              <div className="">
                <label htmlFor="name" className="text-sm font-medium">
                  Election Name
                </label>
                <input
                  {...register("name")}
                  id="name"
                  type="text"
                  className="w-full rounded-md border px-3 py-2 text-sm dark:text-black"
                  placeholder="Enter election name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="">
                <label htmlFor="description" className="text-sm font-medium">
                  Election Description
                </label>
                <textarea
                  {...register("description")}
                  id="description"
                  className="w-full rounded-md border px-3 py-2 text-sm min-h-[100px] dark:text-black"
                  placeholder="Enter election description"
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="">
                <label htmlFor="duration" className="text-sm font-medium">
                  Election Duration (seconds)
                </label>
                <input
                  {...register("duration", { valueAsNumber: true })}
                  id="duration"
                  type="number"
                  min="1"
                  className="w-full rounded-md border px-3 py-2 text-sm dark:text-black"
                  placeholder="Enter duration in seconds"
                />
                {errors.duration && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.duration.message}
                  </p>
                )}
              </div>

              <button
                onClick={handleSubmit(onSubmit)}
                disabled={isPending || isLoading}
                type="submit"
                className="w-1/4 rounded-md bg-purple-cta px-4 py-2 text-sm font-medium text-white self-center whitespace-nowrap min-w-fit"
              >
                Create Election
              </button>
            </form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ElectionAddDropdown;
