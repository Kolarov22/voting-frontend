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

import { modifyElectionSchema } from "@/schemas";
import { useAccount, useWriteContract } from "wagmi";
import { abi } from "../../constants";

const ElectionModifyDropdown = () => {
  const URL = process.env.NEXT_PUBLIC_API_URL;
  const account = useAccount();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<z.infer<typeof modifyElectionSchema>>({
    resolver: zodResolver(modifyElectionSchema),
  });

  const { writeContractAsync, isPending, isSuccess } = useWriteContract();

  const addCandidatetoElection = async function (
    address: string,
    candidate: string
  ) {
    console.log(abi[1]);

    await writeContractAsync({
      address: address as `0x${string}`,
      abi: abi[1],
      functionName: "addCandidate",
      args: [candidate],
    });
  };

  const updateElection = async function (
    address: string,
    candidatesArray: string[]
  ) {
    const response = await fetch(`${URL}/candidates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address,
        candidates: candidatesArray,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error adding candidates:", errorData);
      throw new Error("Failed to add candidates");
    }

    const data = await response.json();
    console.log("Candidates added successfully:", data);
  };

  const onSubmit = async (data: z.infer<typeof modifyElectionSchema>) => {
    const { address, candidates } = data;

    const candidatesArray = candidates
      .split(",")
      .map((candidate) => candidate.trim());

    candidatesArray.forEach((candidate) => {
      try {
        addCandidatetoElection(address, candidate);
      } catch (error) {
        console.error("Failed to add candidate:", error);
      }
    });

    await updateElection(address, candidatesArray);

    reset({
      address: "",
      candidates: "",
    });
  };

  return (
    <div className="w-1/2">
      <Accordion type="single" collapsible>
        <AccordionItem
          className="border shadow-sm rounded-lg p-2 dark:bg-slate-800 dark:border-frost-white"
          value="item-1"
        >
          <AccordionTrigger className="justify-center">
            Interact with election
          </AccordionTrigger>
          <AccordionContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 py-2 flex flex-col gap-4"
            >
              <div className="">
                <label htmlFor="address" className="text-sm font-medium">
                  Election Address
                </label>
                <input
                  {...register("address")}
                  id="address"
                  type="text"
                  className="w-full rounded-md border px-3 py-2 text-sm dark:text-black"
                  placeholder="Enter election address"
                />

                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="">
                <label htmlFor="candidatesAdd" className="text-sm font-medium">
                  Add candidates
                </label>
                <input
                  {...register("candidates")}
                  id="candidates"
                  className="w-full rounded-md border px-3 py-2 text-sm dark:text-black"
                  placeholder="Enter new election candidates (comma separated)"
                />

                {errors.candidates && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.candidates.message}
                  </p>
                )}
              </div>

              <button
                disabled={isPending}
                onClick={handleSubmit(onSubmit)}
                type="submit"
                className="w-1/4 rounded-md bg-purple-cta px-4 py-2 text-sm font-medium text-white self-center whitespace-nowrap min-w-fit"
              >
                Edit Election
              </button>
            </form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ElectionModifyDropdown;
