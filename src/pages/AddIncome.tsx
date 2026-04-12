import { useState } from "react";
import { useBudget } from "@/lib/budget-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from "lucide-react";

const AddIncome = () => {
  const { addTransaction, categories } = useBudget();
  const incomeCategories = categories.filter((c) => ["Pocket Money", "Freelance", "Allowance", "Part-time Job"].includes(c.name));
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category) return;
    addTransaction({ type: "income", amount: parseFloat(amount), category, description, date });
    setAmount(""); setCategory(""); setDescription("");
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add Pocket Money</h1>
      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><PlusCircle className="h-4 w-4 text-income" /> New Pocket Money</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required min="0.01" step="0.01" />
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
              <SelectContent>
                {incomeCategories.map((c) => <SelectItem key={c.id} value={c.name}>{c.icon} {c.name}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <Button type="submit" className="w-full">Add Pocket Money</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddIncome;
