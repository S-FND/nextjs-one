import React, { ReactNode, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import Logo from "@/components/shared/Logo";
import UserAvatar from "@/components/shared/UserAvatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  LogOut,
  Menu,
  Settings,
  User,
  BarChart2,
  FileText,
  Globe,
  Users,
  Activity,
  Briefcase,
  Building,
  Package,
  TrendingUp,
  Heart,
  HelpCircle,
  Target,
  CheckSquare,
  Handshake,
  Calendar,
  Clipboard,
  BookOpen,
  GraduationCap,
  ClipboardCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

interface DashboardLayoutProps {
  children: ReactNode;
  userType?: 'admin' | 'enterprise' | 'employee' | 'partner' | 'vendor' | 'investor' | 'supplier';
  userName?: string;
  userAvatar?: string;
}

const getUserTypeConfig = (userType: string) => {
  switch (userType) {
    case 'admin':
      return {
        title: 'Fandoro Admin Dashboard',
        icon: <Building className="h-5 w-5" />,
        navigation: [
          { name: 'Overview', href: '/dashboard', icon: <BarChart2 className="h-5 w-5" /> },
          { name: 'Organizations', href: '/dashboard/organizations', icon: <Building className="h-5 w-5" /> },
          { name: 'Users', href: '/dashboard/users', icon: <Users className="h-5 w-5" /> },
          { name: 'Analytics', href: '/dashboard/analytics', icon: <Activity className="h-5 w-5" /> },
          { name: 'EHS Trainings', href: '/dashboard/ehs-trainings', icon: <GraduationCap className="h-5 w-5" /> },
          { name: 'Training Calendar', href: '/dashboard/training-calendar', icon: <Calendar className="h-5 w-5" /> },
          { name: 'Training Vendors', href: '/dashboard/training-vendors', icon: <Handshake className="h-5 w-5" /> },
          { name: 'Settings', href: '/dashboard/settings', icon: <Settings className="h-5 w-5" /> },
        ]
      };
    case 'enterprise':
      return {
        title: 'Enterprise Dashboard',
        icon: <Building className="h-5 w-5" />,
        navigation: [
          { name: 'Overview', href: '/dashboard', icon: <BarChart2 className="h-5 w-5" /> },
          { name: 'ESG Reporting', href: '/dashboard/esg', icon: <FileText className="h-5 w-5" /> },
          { name: 'Net Zero', href: '/dashboard/net-zero', icon: <Globe className="h-5 w-5" /> },
          { name: 'SDG Tracking', href: '/dashboard/sdg', icon: <Target className="h-5 w-5" /> },
          { name: 'EHS Trainings', href: '/dashboard/ehs-trainings', icon: <GraduationCap className="h-5 w-5" /> },
          { name: 'Teams', href: '/dashboard/teams', icon: <Users className="h-5 w-5" /> },
          { name: 'Settings', href: '/dashboard/settings', icon: <Settings className="h-5 w-5" /> },
        ]
      };
    case 'vendor':
      return {
        title: 'Vendor Dashboard',
        icon: <Package className="h-5 w-5" />,
        navigation: [
          { name: 'Overview', href: '/dashboard', icon: <BarChart2 className="h-5 w-5" /> },
          { name: 'Services', href: '/dashboard/services', icon: <Package className="h-5 w-5" /> },
          { name: 'EHS Training Opportunities', href: '/dashboard/ehs-training-bids', icon: <GraduationCap className="h-5 w-5" /> },
          { name: 'Assigned Trainings', href: '/dashboard/assigned-trainings', icon: <ClipboardCheck className="h-5 w-5" /> },
          { name: 'My Proposals', href: '/dashboard/training-proposals', icon: <Clipboard className="h-5 w-5" /> },
          { name: 'Sustainability Reports', href: '/dashboard/reports', icon: <FileText className="h-5 w-5" /> },
        ]
      };
    case 'employee':
      return {
        title: 'Employee Dashboard',
        icon: <User className="h-5 w-5" />,
        navigation: [
          { name: 'Overview', href: '/dashboard', icon: <BarChart2 className="h-5 w-5" /> },
          { name: 'My Tasks', href: '/dashboard/tasks', icon: <CheckSquare className="h-5 w-5" /> },
          { name: 'Sustainability Goals', href: '/dashboard/goals', icon: <Target className="h-5 w-5" /> },
          { name: 'CSR Activities', href: '/dashboard/csr', icon: <Heart className="h-5 w-5" /> },
        ]
      };
    case 'partner':
      return {
        title: 'Partner Dashboard',
        icon: <Handshake className="h-5 w-5" />,
        navigation: [
          { name: 'Overview', href: '/dashboard', icon: <BarChart2 className="h-5 w-5" /> },
          { name: 'Joint Initiatives', href: '/dashboard/initiatives', icon: <Users className="h-5 w-5" /> },
          { name: 'Reports', href: '/dashboard/reports', icon: <FileText className="h-5 w-5" /> },
          { name: 'Analytics', href: '/dashboard/analytics', icon: <Activity className="h-5 w-5" /> },
        ]
      };
    case 'investor':
      return {
        title: 'Investor Dashboard',
        icon: <TrendingUp className="h-5 w-5" />,
        navigation: [
          { name: 'Overview', href: '/dashboard', icon: <BarChart2 className="h-5 w-5" /> },
          { name: 'Portfolio', href: '/dashboard/portfolio', icon: <Briefcase className="h-5 w-5" /> },
          { name: 'ESG Analytics', href: '/dashboard/esg-analytics', icon: <Activity className="h-5 w-5" /> },
          { name: 'Reports', href: '/dashboard/reports', icon: <FileText className="h-5 w-5" /> },
        ]
      };
    case 'supplier':
      return {
        title: 'Supplier Dashboard',
        icon: <Package className="h-5 w-5" />,
        navigation: [
          { name: 'Overview', href: '/dashboard', icon: <BarChart2 className="h-5 w-5" /> },
          { name: 'Sustainability Performance', href: '/dashboard/performance', icon: <Activity className="h-5 w-5" /> },
          { name: 'Reporting', href: '/dashboard/reporting', icon: <FileText className="h-5 w-5" /> },
          { name: 'Carbon Tracking', href: '/dashboard/carbon', icon: <Globe className="h-5 w-5" /> },
        ]
      };
    default:
      return {
        title: 'Dashboard',
        icon: <BarChart2 className="h-5 w-5" />,
        navigation: [
          { name: 'Overview', href: '/dashboard', icon: <BarChart2 className="h-5 w-5" /> },
          { name: 'Reports', href: '/dashboard/reports', icon: <FileText className="h-5 w-5" /> },
          { name: 'Settings', href: '/dashboard/settings', icon: <Settings className="h-5 w-5" /> },
        ]
      };
  }
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  userType = 'employee',
  userName = 'John Doe',
  userAvatar,
}) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const config = getUserTypeConfig(userType);
  
  return (
    <div className="flex min-h-screen bg-muted/30">
      <aside className="hidden w-64 flex-col border-r bg-card md:flex">
        <div className="flex h-14 items-center border-b px-4">
          <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
            <Logo variant="icon" />
            <span>Fandoro</span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-auto py-2">
          <nav className="flex flex-col gap-1 px-2">
            {config.navigation.map((item) => (
              <Link 
                key={item.name} 
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                  location.pathname === item.href 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto border-t p-4">
          <div className="flex items-center gap-3">
            <UserAvatar name={userName} userType={userType} src={userAvatar} />
            <div className="flex flex-1 flex-col">
              <span className="text-sm font-medium">{userName}</span>
              <span className="text-xs text-muted-foreground capitalize">{userType}</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronDown className="h-4 w-4" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>
      
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-14 items-center border-b px-4">
            <Link to="/dashboard" className="flex items-center gap-2 font-semibold" onClick={() => setMobileMenuOpen(false)}>
              <Logo variant="icon" />
              <span>Fandoro</span>
            </Link>
          </div>
          
          <div className="flex-1 overflow-auto py-2">
            <nav className="flex flex-col gap-1 px-2">
              {config.navigation.map((item) => (
                <Link 
                  key={item.name} 
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                    location.pathname === item.href 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:bg-muted"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="mt-auto border-t p-4">
            <div className="flex items-center gap-3">
              <UserAvatar name={userName} userType={userType} src={userAvatar} />
              <div className="flex flex-1 flex-col">
                <span className="text-sm font-medium">{userName}</span>
                <span className="text-xs text-muted-foreground capitalize">{userType}</span>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center border-b px-4 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              {config.icon}
            </div>
            <h1 className="hidden text-xl font-semibold md:block">
              {config.title}
            </h1>
          </div>
          
          <div className="ml-auto flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Globe className="h-5 w-5" />
              <span className="sr-only">Language</span>
            </Button>
            
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-5 w-5" />
              <span className="sr-only">Help</span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <UserAvatar name={userName} userType={userType} src={userAvatar} size="sm" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
