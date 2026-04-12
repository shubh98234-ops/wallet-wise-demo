import { useState } from "react";
import { useBudget } from "@/lib/budget-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { defaultCategories } from "@/lib/data";
import { Trash2 } from "lucide-react";

const Transactions = () => {
  const { transactions, deleteTransaction } = useBudget();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = transactions
    .filter((t) => filter === "all" || t.type === filter)
    .filter((t) => t.description.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Transactions</h1>
      <div className="flex flex-col sm:flex-row gap-3">
        <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="sm:max-w-xs" />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Card>
        <CardHeader><CardTitle className="text-base">{filtered.length} transactions</CardTitle></CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-8">No transactions found</p>
          ) : (
            <div className="space-y-2">
              {filtered.map((tx) => {
                const cat = defaultCategories.find((c) => c.name === tx.category);
                return (
                  <div key={tx.id} className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-muted/50 group transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{cat?.icon || "💵"}</span>
                      <div>
                        <p className="text-sm font-medium">{tx.description}</p>
                        <p className="text-xs text-muted-foreground">{tx.category} · {new Date(tx.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`font-semibold text-sm ${tx.type === "income" ? "text-income" : "text-expense"}`}>
                        {tx.type === "income" ? "+" : "-"}${tx.amount}
                      </span>
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => deleteTransaction(tx.id)}>
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;
