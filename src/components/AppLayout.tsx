import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useBudget } from "@/lib/budget-context";
import { WifiOff } from "lucide-react";

const AppLayout = () => {
  const { offlineDemoMode } = useBudget();
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center border-b bg-card px-4 sticky top-0 z-10 gap-3">
            <SidebarTrigger className="mr-1" />
            <h2 className="text-sm font-medium text-muted-foreground">Student Budget Tracker</h2>
            {offlineDemoMode && (
              <Badge variant="secondary" className="ml-auto gap-1 text-xs">
                <WifiOff className="h-3 w-3" /> Offline Demo
              </Badge>
            )}
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
