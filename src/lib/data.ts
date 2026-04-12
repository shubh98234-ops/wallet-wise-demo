export type Transaction = {
  id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
  date: string;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

export const defaultCategories: Category[] = [
  { id: "1", name: "Food", icon: "🍔", color: "hsl(25, 95%, 53%)" },
  { id: "2", name: "Travel", icon: "✈️", color: "hsl(200, 80%, 50%)" },
  { id: "3", name: "Shopping", icon: "🛍️", color: "hsl(280, 60%, 55%)" },
  { id: "4", name: "Entertainment", icon: "🎮", color: "hsl(340, 70%, 55%)" },
  { id: "5", name: "Education", icon: "📚", color: "hsl(152, 60%, 40%)" },
  { id: "6", name: "Bills", icon: "💡", color: "hsl(45, 90%, 50%)" },
  { id: "7", name: "Transport", icon: "🚌", color: "hsl(170, 60%, 45%)" },
  { id: "8", name: "Health", icon: "💊", color: "hsl(0, 72%, 55%)" },
  { id: "9", name: "Pocket Money", icon: "🤑", color: "hsl(152, 60%, 40%)" },
  { id: "10", name: "Freelance", icon: "💻", color: "hsl(220, 70%, 50%)" },
  { id: "11", name: "Allowance", icon: "🎁", color: "hsl(300, 60%, 50%)" },
  { id: "12", name: "Part-time Job", icon: "💼", color: "hsl(40, 70%, 50%)" },
];

export const dummyTransactions: Transaction[] = [
  { id: "1", type: "income", amount: 1500, category: "Pocket Money", description: "Monthly pocket money", date: "2026-04-01" },
  { id: "2", type: "income", amount: 500, category: "Allowance", description: "Weekly allowance", date: "2026-04-01" },
  { id: "3", type: "expense", amount: 45, category: "Food", description: "Groceries", date: "2026-04-02" },
  { id: "4", type: "expense", amount: 120, category: "Education", description: "Online course", date: "2026-04-03" },
  { id: "5", type: "expense", amount: 30, category: "Transport", description: "Bus pass", date: "2026-04-04" },
  { id: "6", type: "expense", amount: 85, category: "Shopping", description: "New headphones", date: "2026-04-05" },
  { id: "7", type: "expense", amount: 25, category: "Entertainment", description: "Movie tickets", date: "2026-04-06" },
  { id: "8", type: "expense", amount: 60, category: "Food", description: "Dining out", date: "2026-04-07" },
  { id: "9", type: "income", amount: 200, category: "Freelance", description: "Web design gig", date: "2026-04-08" },
  { id: "10", type: "expense", amount: 150, category: "Bills", description: "Phone bill", date: "2026-04-09" },
  { id: "11", type: "expense", amount: 40, category: "Health", description: "Pharmacy", date: "2026-04-10" },
  { id: "12", type: "expense", amount: 200, category: "Travel", description: "Weekend trip", date: "2026-04-11" },
  { id: "13", type: "expense", amount: 35, category: "Food", description: "Coffee & snacks", date: "2026-04-12" },
  { id: "14", type: "income", amount: 1500, category: "Salary", description: "Part-time job", date: "2026-03-01" },
  { id: "15", type: "income", amount: 500, category: "Allowance", description: "Monthly allowance", date: "2026-03-01" },
  { id: "16", type: "expense", amount: 320, category: "Food", description: "Monthly groceries", date: "2026-03-05" },
  { id: "17", type: "expense", amount: 90, category: "Entertainment", description: "Concert tickets", date: "2026-03-10" },
  { id: "18", type: "expense", amount: 250, category: "Shopping", description: "Clothes", date: "2026-03-15" },
  { id: "19", type: "expense", amount: 150, category: "Bills", description: "Utilities", date: "2026-03-20" },
  { id: "20", type: "expense", amount: 100, category: "Transport", description: "Uber rides", date: "2026-03-25" },
];

export const monthlyData = [
  { month: "Nov", income: 1800, expenses: 950 },
  { month: "Dec", income: 2100, expenses: 1400 },
  { month: "Jan", income: 2000, expenses: 1100 },
  { month: "Feb", income: 1900, expenses: 1250 },
  { month: "Mar", income: 2000, expenses: 910 },
  { month: "Apr", income: 2200, expenses: 790 },
];
