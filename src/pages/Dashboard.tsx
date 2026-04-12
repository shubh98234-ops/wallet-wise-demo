import { useBudget } from "@/lib/budget-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, ArrowDownRight, Wallet, TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { monthlyData, defaultCategories } from "@/lib/data";

const Dashboard = () => {
  const { totalIncome, totalExpenses, balance, budgetPercentage, monthlyBudget, transactions, currentMonthExpenses } = useBudget();

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const expensesByCategory = transactions
    .filter((t) => t.type === "expense" && new Date(t.date).getMonth() === currentMonth && new Date(t.date).getFullYear() === currentYear)
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const pieData = Object.entries(expensesByCategory).map(([name, value]) => {
    const cat = defaultCategories.find((c) => c.name === name);
    return { name, value, color: cat?.color || "hsl(200,50%,50%)" };
  });

  const recentTx = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const budgetColor = budgetPercentage >= 100 ? "bg-destructive" : budgetPercentage >= 80 ? "bg-warning" : "bg-primary";

  const statCards = [
    { title: "Balance", value: balance, icon: Wallet, gradient: "gradient-balance", prefix: "$" },
    { title: "Income", value: totalIncome, icon: ArrowUpRight, gradient: "gradient-income", prefix: "+$" },
    { title: "Expenses", value: totalExpenses, icon: ArrowDownRight, gradient: "gradient-expense", prefix: "-$" },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Your financial overview for {now.toLocaleString("default", { month: "long", year: "numeric" })}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statCards.map((s) => (
          <Card key={s.title} className={`${s.gradient} border-0`}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-primary-foreground/80">{s.title}</p>
                  <p className="text-2xl font-bold text-primary-foreground">{s.prefix}{Math.abs(s.value).toLocaleString()}</p>
                </div>
                <s.icon className="h-8 w-8 text-primary-foreground/40" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4" /> Monthly Budget
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">${currentMonthExpenses.toLocaleString()} of ${monthlyBudget.toLocaleString()}</span>
            <span className={`font-medium ${budgetPercentage >= 100 ? "text-destructive" : budgetPercentage >= 80 ? "text-warning" : "text-primary"}`}>
              {Math.round(budgetPercentage)}%
            </span>
          </div>
          <Progress value={Math.min(budgetPercentage, 100)} className={`h-3 ${budgetColor}`} />
          {budgetPercentage >= 100 && <p className="text-xs text-destructive font-medium">⚠️ Budget exceeded!</p>}
          {budgetPercentage >= 80 && budgetPercentage < 100 && <p className="text-xs text-warning font-medium">⚠️ Approaching budget limit</p>}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Expenses by Category</CardTitle>
          </CardHeader>
          <CardContent>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" paddingAngle={3} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(val: number) => `$${val}`} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-muted-foreground text-sm text-center py-10">No expenses this month</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Monthly Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,20%,90%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(val: number) => `$${val}`} />
                <Legend />
                <Bar dataKey="income" fill="hsl(152,60%,40%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="hsl(0,72%,55%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTx.map((tx) => {
              const cat = defaultCategories.find((c) => c.name === tx.category);
              return (
                <div key={tx.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{cat?.icon || "💵"}</span>
                    <div>
                      <p className="text-sm font-medium">{tx.description}</p>
                      <p className="text-xs text-muted-foreground">{tx.category} · {new Date(tx.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <span className={`font-semibold text-sm ${tx.type === "income" ? "text-income" : "text-expense"}`}>
                    {tx.type === "income" ? "+" : "-"}${tx.amount}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
