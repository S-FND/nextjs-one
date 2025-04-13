
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
        <Logo size="md" />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
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
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-6 mt-8">
              <NavLinks className="flex-col items-start gap-4" />
              <div className="flex flex-col gap-2 mt-4">
                <Button variant="outline" asChild className="w-full">
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild className="w-full">
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
  return (
    <ul className={`flex items-center gap-6 ${className}`}>
      <li>
        <Link to="/#features" className="text-muted-foreground hover:text-foreground transition-colors">
          Features
        </Link>
      </li>
      <li>
        <Link to="/#solutions" className="text-muted-foreground hover:text-foreground transition-colors">
          Solutions
        </Link>
      </li>
      <li>
        <Link to="/#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
          Pricing
        </Link>
      </li>
      <li>
        <Link to="/#about" className="text-muted-foreground hover:text-foreground transition-colors">
          About
        </Link>
      </li>
    </ul>
  );
};

export default Header;
