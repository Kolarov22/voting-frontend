"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";

interface TimerContextType {
  timers: Record<string, number>;
  setTimerValue: (id: string, value: number) => void;
  resetTimer: (id: string) => void;
  startTimer: (id: string, duration: number) => void;
  syncWithElection: (electionId: string) => Promise<number>;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const intervals = useRef<Record<string, NodeJS.Timeout>>({});
  const URL = process.env.NEXT_PUBLIC_API_URL;

  const [timers, setTimers] = useState<Record<string, number>>({});

  useEffect(() => {
    return () => {
      Object.values(intervals.current).forEach(clearInterval);
    };
  }, []);

  const setTimerValue = (id: string, value: number) => {
    setTimers((prev) => ({ ...prev, [id]: value }));
  };

  const resetTimer = (id: string) => {
    if (intervals.current[id]) {
      clearInterval(intervals.current[id]);
      delete intervals.current[id];
    }

    setTimers((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const syncWithElection = async (electionAddress: string) => {
    try {
      const response = await fetch(`${URL}/api/elections/${electionAddress}`);
      if (!response.ok) throw new Error("Failed to fetch election data");

      const election = await response.json();

      // Calculate remaining time
      const startTime = new Date(election.createdAt).getTime();
      const currentTime = new Date().getTime();
      const durationMs = election.duration * 1000;
      const endTime = startTime + durationMs;
      const remainingMs = endTime - currentTime;
      const remainingSeconds = Math.max(0, Math.floor(remainingMs / 1000));

      if (remainingSeconds > 0) {
        setTimerValue(election.id, remainingSeconds);
        startTimer(election.id, remainingSeconds);
      } else {
        setTimerValue(election.id, 0);
      }

      return remainingSeconds;
    } catch (error) {
      console.error("Error syncing with election:", error);
      return 0;
    }
  };

  const startTimer = (id: string, duration: number) => {
    if (timers[id] === undefined) {
      setTimerValue(id, duration);
    }

    if (intervals.current[id]) {
      clearInterval(intervals.current[id]);
    }

    // Set up a new interval that runs even when component is not mounted
    intervals.current[id] = setInterval(() => {
      setTimers((prev) => {
        const currentValue = prev[id];

        if (currentValue === undefined) return prev;

        if (currentValue <= 1) {
          clearInterval(intervals.current[id]);
          delete intervals.current[id];
          return { ...prev, [id]: 0 };
        }

        return { ...prev, [id]: currentValue - 1 };
      });
    }, 1000);
  };

  return (
    <TimerContext.Provider
      value={{
        timers,
        setTimerValue,
        resetTimer,
        startTimer,
        syncWithElection,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimerContext = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error("useTimerContext must be used within a TimerProvider");
  }
  return context;
};
