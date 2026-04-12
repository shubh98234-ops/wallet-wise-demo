import { useState } from "react";
import { useBudget } from "@/lib/budget-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const SettingsPage = () => {
  const { monthlyBudget, setMonthlyBudget, categories, addCategory, budgetPercentage, currentMonthExpenses } = useBudget();
  const [budgetInput, setBudgetInput] = useState(monthlyBudget.toString());
  const [newCatName, setNewCatName] = useState("");
  const [newCatIcon, setNewCatIcon] = useState("📌");

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Card>
        <CardHeader><CardTitle className="text-base">Monthly Budget</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Input type="number" value={budgetInput} onChange={(e) => setBudgetInput(e.target.value)} min="0" />
            <Button onClick={() => setMonthlyBudget(parseFloat(budgetInput) || 0)}>Save</Button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Spent: ${currentMonthExpenses.toLocaleString()}</span>
              <span className="font-medium">{Math.round(budgetPercentage)}%</span>
            </div>
            <Progress value={Math.min(budgetPercentage, 100)} className="h-3" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Categories</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <Badge key={c.id} variant="secondary" className="text-sm py-1 px-3">
                {c.icon} {c.name}
              </Badge>
            ))}
          </div>
          <Separator />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (newCatName) {
                addCategory({ name: newCatName, icon: newCatIcon, color: `hsl(${Math.random() * 360}, 60%, 50%)` });
                setNewCatName(""); setNewCatIcon("📌");
              }
            }}
            className="flex gap-3"
          >
            <Input className="w-16" value={newCatIcon} onChange={(e) => setNewCatIcon(e.target.value)} placeholder="Icon" />
            <Input value={newCatName} onChange={(e) => setNewCatName(e.target.value)} placeholder="Category name" className="flex-1" />
            <Button type="submit">Add</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
