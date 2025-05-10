// @ts-nocheck

"use client";

import { useTimerContext } from "@/context/TimerContext";
import { useState } from "react";
import { useReadContract, usePublicClient } from "wagmi";
import { abi } from "../../constants";
import {
  BarChart,
  PieChart,
  ResponsiveContainer,
  Bar,
  Pie,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const Results = (election: any) => {
  const { timers } = useTimerContext();
  const [chartType, setChartType] = useState<string>("bar");
  const COLORS = [
    "#8884d8", // Purple
    "#82ca9d", // Green
    "#ffc658", // Yellow
    "#ff8042", // Orange
    "#0088fe", // Blue
    "#ff6b81", // Pink
    "#00C49F", // Teal
    "#FFBB28", // Amber
    "#FF8042", // Coral
    "#a4de6c", // Light Green
  ];

  const getColor = (index: number) => COLORS[index % COLORS.length];

  const publicClient = usePublicClient();

  const { data, isLoading } = useReadContract({
    address: election.address,
    abi: abi[1],
    functionName: "getAllCandidates",
    args: [],
  });

  const formattedData =
    data?.map((candidate: any, index: number) => ({
      id: Number(candidate.id),
      name: candidate.name,
      voteCount: Number(candidate.voteCount),
      fill: getColor(index),
    })) ?? [];

  return timers[election.id!] > 0 ? null : (
    <>
      <div className="flex flex-col gap-8">
        <h2 className="text-2xl">Results</h2>
        <div className="flex gap-3">
          <button
            className={`${
              chartType === "bar"
                ? "bg-purple-accent text-frost-white"
                : "bg-slate-100 text-black"
            } px-3 py-1 rounded-lg`}
            onClick={() => setChartType("bar")}
          >
            Bar Chart
          </button>
          <button
            className={`${
              chartType === "pie"
                ? "bg-purple-accent text-frost-white"
                : "bg-slate-100 text-black"
            } px-3 py-1 rounded-lg`}
            onClick={() => setChartType("pie")}
          >
            Pie Chart
          </button>
        </div>

        {isLoading ? (
          <p>Loading ...</p>
        ) : (
          <div className="h-96 w-full bg-slate-100 dark:bg-grey-accent rounded-lg shadow-md p-4">
            <ResponsiveContainer width={"100%"} height={"100%"}>
              {chartType === "bar" ? (
                <BarChart
                  data={formattedData}
                  margin={{ top: 20, right: 40, bottom: 10, left: 40 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />

                  <Bar dataKey="voteCount" fill="#8884d8" />
                </BarChart>
              ) : (
                <PieChart width={600} height={600}>
                  <Tooltip />
                  <Legend />
                  <Pie
                    data={formattedData}
                    dataKey="voteCount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={3}
                  />
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </>
  );
};

export default Results;
