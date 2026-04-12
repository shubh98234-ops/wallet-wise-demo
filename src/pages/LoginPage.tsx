import { useState } from "react";
import { useBudget } from "@/lib/budget-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, BookOpen, Wallet, PiggyBank } from "lucide-react";

const LoginPage = () => {
  const { login, register } = useBudget();
  const [loginEmail, setLoginEmail] = useState("student@demo.com");
  const [loginPassword, setLoginPassword] = useState("demo123");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  return (
    <div className="min-h-screen flex bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-[30rem] h-[30rem] rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full bg-accent/40 blur-3xl" />
      </div>

      {/* Left branding panel - hidden on mobile */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative">
        <div className="max-w-md space-y-8 p-12">
          <div className="w-16 h-16 rounded-2xl gradient-balance flex items-center justify-center">
            <GraduationCap className="h-8 w-8 text-primary-foreground" />
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-foreground leading-tight">
              Smart budgeting<br />for students
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Track your pocket money, manage expenses, and build healthy financial habits.
            </p>
          </div>
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm text-foreground">Track every rupee you spend</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <PiggyBank className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm text-foreground">Set budgets & savings goals</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm text-foreground">Visualize your spending habits</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile-only branding */}
          <div className="text-center space-y-2 lg:hidden">
            <div className="mx-auto w-14 h-14 rounded-2xl gradient-balance flex items-center justify-center">
              <GraduationCap className="h-7 w-7 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Student Budget Tracker</h1>
            <p className="text-muted-foreground text-sm">Track your spending, save smarter</p>
          </div>

          <Card className="shadow-lg border-border/50 backdrop-blur-sm bg-card/80">
            <Tabs defaultValue="login">
              <CardHeader className="pb-3">
                <TabsList className="w-full">
                  <TabsTrigger value="login" className="flex-1">Login</TabsTrigger>
                  <TabsTrigger value="register" className="flex-1">Register</TabsTrigger>
                </TabsList>
              </CardHeader>
              <CardContent>
                <TabsContent value="login" className="space-y-4 mt-0">
                  <CardTitle className="text-lg">Welcome back</CardTitle>
                  <CardDescription>Enter your credentials to continue</CardDescription>
                  <form onSubmit={(e) => { e.preventDefault(); login(loginEmail, loginPassword); }} className="space-y-3">
                    <Input placeholder="Email" type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                    <Input placeholder="Password" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                    <Button type="submit" className="w-full">Sign In</Button>
                  </form>
                </TabsContent>
                <TabsContent value="register" className="space-y-4 mt-0">
                  <CardTitle className="text-lg">Create account</CardTitle>
                  <CardDescription>Get started with your budget tracker</CardDescription>
                  <form onSubmit={(e) => { e.preventDefault(); register(regName, regEmail, regPassword); }} className="space-y-3">
                    <Input placeholder="Full Name" value={regName} onChange={(e) => setRegName(e.target.value)} required />
                    <Input placeholder="Email" type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required />
                    <Input placeholder="Password" type="password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} required />
                    <Button type="submit" className="w-full">Create Account</Button>
                  </form>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>

          <p className="text-center text-xs text-muted-foreground">
            Demo credentials are pre-filled. Just click Sign In!
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
