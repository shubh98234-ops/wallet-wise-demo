import { LayoutDashboard, PlusCircle, MinusCircle, List, PieChart, Settings, LogOut, GraduationCap, Database } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useBudget } from "@/lib/budget-context";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Add Pocket Money", url: "/add-income", icon: PlusCircle },
  { title: "Add Expense", url: "/add-expense", icon: MinusCircle },
  { title: "Transactions", url: "/transactions", icon: List },
  { title: "Analytics", url: "/analytics", icon: PieChart },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Storage Viewer", url: "/storage", icon: Database },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { logout, userName } = useBudget();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              {!collapsed && <span>Budget Tracker</span>}
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end={item.url === "/"} className="hover:bg-sidebar-accent/50" activeClassName="bg-sidebar-accent text-sidebar-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {!collapsed && (
          <div className="px-3 py-2 text-xs text-sidebar-foreground/60">
            Signed in as <span className="font-medium text-sidebar-foreground">{userName}</span>
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={logout} className="w-full justify-start text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent">
          <LogOut className="mr-2 h-4 w-4" />
          {!collapsed && "Logout"}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
