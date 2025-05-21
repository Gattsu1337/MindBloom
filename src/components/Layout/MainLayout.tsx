
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Sidebar, 
  SidebarContent as UISidebarContent, 
  SidebarTrigger, 
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  useSidebar
} from "@/components/ui/sidebar";
import { useLocation } from 'react-router-dom';
import { 
  CalendarCheck, 
  BarChart3, 
  PenLine, 
  BookHeart, 
  LogOut, 
  Menu,
  User,
  Home
} from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const SidebarNavContent = () => {
  const { logout } = useAuth();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const getNavClass = (active: boolean) => 
    `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
      active 
        ? 'bg-primary/10 text-primary font-medium' 
        : 'hover:bg-muted/80'
    }`;
  
  return (
    <Sidebar className={collapsed ? "w-[70px]" : "w-64"}>
      <div className="flex flex-col h-full">
        <div className="p-4 mb-2">
          <SidebarTrigger className="ml-auto block">
            <Menu size={20} />
          </SidebarTrigger>
        </div>
        
        <UISidebarContent className="px-3 py-2 flex-1">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/" className={getNavClass(isActive('/'))}>
                  <Home size={20} />
                  {!collapsed && <span>Home</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/journal" className={getNavClass(isActive('/journal'))}>
                  <PenLine size={20} />
                  {!collapsed && <span>Journal</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/calendar" className={getNavClass(isActive('/calendar'))}>
                  <CalendarCheck size={20} />
                  {!collapsed && <span>Calendar</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/stats" className={getNavClass(isActive('/stats'))}>
                  <BarChart3 size={20} />
                  {!collapsed && <span>Statistics</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/recommendations" className={getNavClass(isActive('/recommendations'))}>
                  <BookHeart size={20} />
                  {!collapsed && <span>Recommendations</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </UISidebarContent>
        
        <div className="p-4 border-t mt-auto">
          {!collapsed ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="rounded-full bg-primary/10 p-2 mr-3">
                  <User size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Demo User</p>
                  <p className="text-xs text-muted-foreground">demo@example.com</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut size={18} />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={logout} className="w-full">
              <LogOut size={18} />
            </Button>
          )}
        </div>
      </div>
    </Sidebar>
  );
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <SidebarNavContent />
        
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
