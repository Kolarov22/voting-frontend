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
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const intervals = useRef<Record<string, NodeJS.Timeout>>({});

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
    // Clear any running interval
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

  const startTimer = (id: string, duration: number) => {
    // Check if timer exists already
    if (timers[id] === undefined) {
      setTimerValue(id, duration);
    }

    // Clear any existing interval for this ID
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
      value={{ timers, setTimerValue, resetTimer, startTimer }}
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
