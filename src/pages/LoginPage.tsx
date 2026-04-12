import { useState } from "react";
import { useBudget } from "@/lib/budget-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap } from "lucide-react";

const LoginPage = () => {
  const { login, register } = useBudget();
  const [loginEmail, setLoginEmail] = useState("student@demo.com");
  const [loginPassword, setLoginPassword] = useState("demo123");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto w-14 h-14 rounded-2xl gradient-balance flex items-center justify-center">
            <GraduationCap className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Student Budget Tracker</h1>
          <p className="text-muted-foreground text-sm">Track your spending, save smarter</p>
        </div>

        <Card>
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
      </div>
    </div>
  );
};

export default LoginPage;
