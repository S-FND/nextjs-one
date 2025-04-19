
import React from 'react';
import { Button } from "@/components/ui/button";
import Logo from "@/components/shared/Logo";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-4 border-b bg-background/90 backdrop-blur-sm fixed top-0 z-50">
      <div className="container flex items-center justify-between">
        <Logo size="md" className="transition-transform hover:scale-105" />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          <NavLinks />
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
        </nav>
        
        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80vw] sm:w-[380px]">
            <div className="flex flex-col gap-6 mt-8">
              <NavLinks className="flex-col items-start gap-4" />
              <div className="flex flex-col gap-2 mt-4">
                <Button variant="outline" asChild className="w-full justify-center">
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild className="w-full justify-center">
                  <Link to="/register">Get Started</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

interface NavLinksProps {
  className?: string;
}

const NavLinks: React.FC<NavLinksProps> = ({ className }) => {
  const navItems = [
    { label: 'Features', href: '/#features' },
    { label: 'Solutions', href: '/#solutions' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'About', href: '/#about' },
  ];

  return (
    <ul className={`flex items-center gap-6 ${className}`}>
      {navItems.map((item) => (
        <li key={item.label}>
          <Link 
            to={item.href} 
            className="text-muted-foreground hover:text-foreground transition-colors relative group"
          >
            {item.label}
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-forest-500 transform scale-x-0 group-hover:scale-x-100 transition-transform" />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Header;
