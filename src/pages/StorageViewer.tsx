import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Database, User, Lock, FileJson, Trash2 } from "lucide-react";
import { toast } from "sonner";

type StorageEntry = { key: string; value: string };

const StorageViewer = () => {
  const [entries, setEntries] = useState<StorageEntry[]>([]);

  const refresh = () => {
    const all: StorageEntry[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      all.push({ key, value: localStorage.getItem(key) ?? "" });
    }
    all.sort((a, b) => a.key.localeCompare(b.key));
    setEntries(all);
  };

  useEffect(() => {
    refresh();
    const handler = () => refresh();
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const clearAll = () => {
    if (!confirm("This will wipe ALL localStorage data (every user, every transaction). Continue?")) return;
    localStorage.clear();
    refresh();
    toast.success("localStorage cleared");
  };

  const registered = entries.filter((e) => e.key.startsWith("registered:"));
  const passwords = entries.filter((e) => e.key.startsWith("password:"));
  const userData = entries.filter((e) => e.key.startsWith("userData:"));
  const other = entries.filter(
    (e) =>
      !e.key.startsWith("registered:") &&
      !e.key.startsWith("password:") &&
      !e.key.startsWith("userData:")
  );

  const tryParse = (raw: string) => {
    try {
      return JSON.stringify(JSON.parse(raw), null, 2);
    } catch {
      return raw;
    }
  };

  const emailFromKey = (key: string) => key.split(":")[1] ?? key;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Database className="h-7 w-7 text-primary" />
            Storage Viewer
          </h1>
          <p className="text-muted-foreground mt-1">
            Live view of everything saved in this browser's localStorage. Use this to demo where the
            app stores user data.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={refresh}>
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh
          </Button>
          <Button variant="destructive" size="sm" onClick={clearAll}>
            <Trash2 className="mr-2 h-4 w-4" /> Clear All
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Registered users</CardDescription>
            <CardTitle className="text-3xl">{registered.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Saved profiles</CardDescription>
            <CardTitle className="text-3xl">{userData.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total keys</CardDescription>
            <CardTitle className="text-3xl">{entries.length}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" /> Registered Accounts
          </CardTitle>
          <CardDescription>One entry per signed-up email.</CardDescription>
        </CardHeader>
        <CardContent>
          {registered.length === 0 ? (
            <p className="text-sm text-muted-foreground">No registered users yet.</p>
          ) : (
            <ul className="space-y-2">
              {registered.map((e) => {
                const email = emailFromKey(e.key);
                const pw = passwords.find((p) => emailFromKey(p.key) === email);
                return (
                  <li
                    key={e.key}
                    className="flex items-center justify-between gap-2 rounded-md border bg-muted/30 px-3 py-2"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Badge variant="secondary">user</Badge>
                      <span className="font-mono text-sm truncate">{email}</span>
                    </div>
                    {pw && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono truncate">
                        <Lock className="h-3 w-3" /> {pw.value}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileJson className="h-5 w-5 text-primary" /> User Data (transactions, budget, categories)
          </CardTitle>
          <CardDescription>
            Each block is the full JSON saved for that account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {userData.length === 0 ? (
            <p className="text-sm text-muted-foreground">No user data saved yet.</p>
          ) : (
            userData.map((e) => (
              <div key={e.key} className="rounded-md border">
                <div className="flex items-center justify-between gap-2 border-b bg-muted/40 px-3 py-2">
                  <span className="font-mono text-sm">{e.key}</span>
                  <Badge variant="outline">{(e.value.length / 1024).toFixed(2)} KB</Badge>
                </div>
                <pre className="overflow-auto p-3 text-xs leading-relaxed max-h-80">
                  {tryParse(e.value)}
                </pre>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {other.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Other Keys</CardTitle>
            <CardDescription>App settings & misc values.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {other.map((e) => (
                <li
                  key={e.key}
                  className="flex items-center justify-between gap-2 rounded-md border bg-muted/30 px-3 py-2"
                >
                  <span className="font-mono text-sm">{e.key}</span>
                  <span className="font-mono text-xs text-muted-foreground truncate max-w-[50%]">
                    {e.value}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StorageViewer;
