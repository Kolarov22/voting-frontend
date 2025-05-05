"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  ExternalLink,
  Clock,
  X,
} from "lucide-react";
import Timer from "./Timer";
import type { Election } from "@/types";

const Dashboard = () => {
  const [sortField, setSortField] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [elections, setElections] = useState<Election[]>([]);
  const URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await fetch(`${URL}/api/elections`);
        if (!response.ok) {
          throw new Error("Failed to fetch elections");
        }
        const data = await response.json();
        setElections(data);
      } catch (error) {
        console.error("Error fetching elections:", error);
      }
    };

    fetchElections();
  }, []);

  const cancelElection = async (address: string) => {
    try {
      const response = await fetch(`${URL}/api/elections/${address}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to cancel election");
      }
      setElections((prev) =>
        prev.filter((election) => election.address !== address)
      );
    } catch (error) {
      console.error("Error canceling election:", error);
    }
  };

  const sortedElections = [...elections].sort((a, b) => {
    const aValue = a[sortField as keyof typeof a];
    const bValue = b[sortField as keyof typeof b];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    return 0;
  });

  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ArrowUpCircle className="inline ml-1 w-4 h-4" />
    ) : (
      <ArrowDownCircle className="inline ml-1 w-4 h-4" />
    );
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Active Elections</h2>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
        <table className="w-full bg-white dark:bg-grey-accent  text-left text-sm">
          <thead className="bg-gray-100 dark:bg-slate-800">
            <tr>
              <th
                className="px-6 py-4 font-medium text-gray-900 dark:text-frost-white cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-700"
                onClick={() => toggleSort("name")}
              >
                Election Name {getSortIcon("name")}
              </th>
              <th
                className="px-6 py-4 font-medium text-gray-900 dark:text-frost-white cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-700"
                onClick={() => toggleSort("address")}
              >
                Contract Address {getSortIcon("address")}
              </th>
              <th className="px-6 py-4 font-medium text-gray-900 dark:text-frost-white">
                Status
              </th>
              <th className="px-6 py-4 font-medium text-gray-900 dark:text-frost-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 border-t border-gray-200">
            {sortedElections.map((election) => (
              <tr
                key={election.id}
                className="hover:bg-gray-50 dark:hover:bg-slate-700"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-frost-white">
                  {election.name}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-frost-white font-mono text-xs md:text-sm truncate max-w-xs">
                  {election.address}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="mr-2">
                      <Clock className="h-4 w-4 text-purple-accent" />
                    </div>
                    <div className="text-xs">
                      <Timer
                        id={election.id}
                        duration={election.duration}
                        address={election.address}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/elections/${election.address}`}
                    className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-purple-cta  hover:bg-purple-100"
                  >
                    View <ExternalLink className="h-3 w-3" />
                  </Link>

                  <a
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      cancelElection(election.address);
                    }}
                    className="inline-flex items-center gap-1 rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-500 hover:bg-red-100 mt-1 min-[953px]:mt-0 min-[953px]:ml-1"
                  >
                    Cancel <X className="h-3 w-3 text-red-500 inline" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {elections.length === 0 && (
        <div className="text-center p-8 bg-gray-50 rounded-lg mt-4 dark:bg-slate-800">
          <p className="text-gray-500">No active elections available.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
