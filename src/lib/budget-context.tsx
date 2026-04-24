import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Transaction, Category, defaultCategories, dummyTransactions } from "./data";
import { toast } from "sonner";

type BudgetContextType = {
  transactions: Transaction[];
  categories: Category[];
  monthlyBudget: number;
  isLoggedIn: boolean;
  userName: string;
  offlineDemoMode: boolean;
  setOfflineDemoMode: (v: boolean) => void;
  resetDemoData: () => void;
  addTransaction: (t: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
  setMonthlyBudget: (b: number) => void;
  addCategory: (c: Omit<Category, "id">) => void;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  currentMonthExpenses: number;
  budgetPercentage: number;
};

const BudgetContext = createContext<BudgetContextType | null>(null);

export const useBudget = () => {
  const ctx = useContext(BudgetContext);
  if (!ctx) throw new Error("useBudget must be inside BudgetProvider");
  return ctx;
};

export const BudgetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(dummyTransactions);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [monthlyBudget, setMonthlyBudgetState] = useState(1200);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [offlineDemoMode, setOfflineDemoModeState] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    const stored = localStorage.getItem("offlineDemoMode");
    return stored === null ? true : stored === "true";
  });

  const setOfflineDemoMode = useCallback((v: boolean) => {
    setOfflineDemoModeState(v);
    try { localStorage.setItem("offlineDemoMode", String(v)); } catch {}
    toast.success(v ? "Offline demo mode enabled" : "Offline demo mode disabled");
  }, []);

  const resetDemoData = useCallback(() => {
    setTransactions(dummyTransactions);
    setCategories(defaultCategories);
    setMonthlyBudgetState(1200);
    toast.success("Demo data reset");
  }, []);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const currentMonthTx = transactions.filter((t) => {
    const d = new Date(t.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const totalIncome = currentMonthTx.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpenses = currentMonthTx.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpenses;
  const currentMonthExpenses = totalExpenses;
  const budgetPercentage = monthlyBudget > 0 ? (currentMonthExpenses / monthlyBudget) * 100 : 0;

  useEffect(() => {
    if (budgetPercentage >= 100) {
      toast.error("🚨 You've exceeded your monthly budget!", { duration: 5000 });
    } else if (budgetPercentage >= 80) {
      toast.warning("⚠️ You've used 80% of your monthly budget!", { duration: 5000 });
    }
  }, [budgetPercentage]);

  const addTransaction = useCallback((t: Omit<Transaction, "id">) => {
    setTransactions((prev) => [{ ...t, id: crypto.randomUUID() }, ...prev]);
    toast.success(`${t.type === "income" ? "Pocket money" : "Expense"} added!`);
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    toast.success("Transaction deleted");
  }, []);

  const setMonthlyBudget = useCallback((b: number) => {
    setMonthlyBudgetState(b);
    toast.success("Budget updated!");
  }, []);

  const addCategory = useCallback((c: Omit<Category, "id">) => {
    setCategories((prev) => [...prev, { ...c, id: crypto.randomUUID() }]);
    toast.success("Category added!");
  }, []);

  const login = useCallback((email: string, _password: string) => {
    if (email) {
      setIsLoggedIn(true);
      setUserName(email.split("@")[0]);
      setTransactions([]);
      setMonthlyBudgetState(0);
      toast.success("Welcome! Start fresh 🎉");
      return true;
    }
    return false;
  }, []);

  const register = useCallback((name: string, email: string, _password: string) => {
    if (name && email) {
      setIsLoggedIn(true);
      setUserName(name);
      setTransactions([]);
      setMonthlyBudgetState(0);
      toast.success("Account created! Start fresh 🎉");
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserName("");
    toast.info("Logged out");
  }, []);

  return (
    <BudgetContext.Provider
      value={{
        transactions, categories, monthlyBudget, isLoggedIn, userName,
        offlineDemoMode, setOfflineDemoMode, resetDemoData,
        addTransaction, deleteTransaction, setMonthlyBudget, addCategory,
        login, register, logout,
        totalIncome, totalExpenses, balance, currentMonthExpenses, budgetPercentage,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
