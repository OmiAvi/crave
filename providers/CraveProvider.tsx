import React, { createContext, useContext, useState, useCallback } from "react";

import { SAMPLE_TRANSACTIONS, Transaction } from "@/mocks/data";

interface CraveState {
  credits: number;
  favorites: string[];
  planId: string;
  transactions: Transaction[];
  addCredits: (amount: number) => void;
  spendCredits: (amount: number, restaurantName: string) => void;
  toggleFavorite: (restaurantId: string) => void;
  setPlan: (planId: string) => void;
}

const CraveContext = createContext<CraveState | undefined>(undefined);

export function CraveProvider({ children }: { children: React.ReactNode }) {
  const [credits, setCredits] = useState(46);
  const [favorites, setFavorites] = useState<string[]>(["1", "6"]);
  const [planId, setPlanId] = useState("regular");
  const [transactions, setTransactions] =
    useState<Transaction[]>(SAMPLE_TRANSACTIONS);

  const addCredits = useCallback(
    (amount: number) => {
      setCredits((c) => c + amount);
      setTransactions((prev) => [
        {
          id: `t${Date.now()}`,
          restaurantName: "Credit Top-up",
          credits: amount,
          date: new Date().toISOString().split("T")[0],
          type: "topup",
        },
        ...prev,
      ]);
    },
    []
  );

  const spendCredits = useCallback(
    (amount: number, restaurantName: string) => {
      setCredits((c) => Math.max(0, c - amount));
      setTransactions((prev) => [
        {
          id: `t${Date.now()}`,
          restaurantName,
          credits: amount,
          date: new Date().toISOString().split("T")[0],
          type: "purchase",
        },
        ...prev,
      ]);
    },
    []
  );

  const toggleFavorite = useCallback((restaurantId: string) => {
    setFavorites((prev) =>
      prev.includes(restaurantId)
        ? prev.filter((id) => id !== restaurantId)
        : [...prev, restaurantId]
    );
  }, []);

  const setPlan = useCallback((id: string) => {
    setPlanId(id);
  }, []);

  return (
    <CraveContext.Provider
      value={{
        credits,
        favorites,
        planId,
        transactions,
        addCredits,
        spendCredits,
        toggleFavorite,
        setPlan,
      }}
    >
      {children}
    </CraveContext.Provider>
  );
}

export function useCrave(): CraveState {
  const ctx = useContext(CraveContext);
  if (!ctx) {
    throw new Error("useCrave must be used within a CraveProvider");
  }
  return ctx;
}
