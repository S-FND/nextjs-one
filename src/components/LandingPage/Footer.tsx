
import React from 'react';
import { Link } from "react-router-dom";
import Logo from "@/components/shared/Logo";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  return (
    <footer className="bg-muted pt-16 pb-8 border-t">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Logo size="lg" className="mb-4" />
            <p className="mt-4 text-muted-foreground">
              Empowering organizations to achieve their sustainability goals through innovative technology solutions.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {[
                { icon: Facebook, label: 'Facebook', href: '#' },
                { icon: Twitter, label: 'Twitter', href: '#' },
                { icon: Linkedin, label: 'LinkedIn', href: '#' },
                { icon: Instagram, label: 'Instagram', href: '#' },
              ].map(({ icon: Icon, label, href }) => (
                <Button
                  key={label}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="hover:text-forest-500 transition-colors"
                >
                  <a href={href} aria-label={label}>
                    <Icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Solutions</h3>
            <ul className="space-y-3">
              {[
                'ESG Reporting',
                'Net Zero Tracking',
                'SDG Alignment',
                'CSR Impact Assessment',
                'Sustainability Consulting',
              ].map((item) => (
                <li key={item}>
                  <Link 
                    to="#" 
                    className="text-muted-foreground hover:text-foreground transition-colors hover:underline"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {[
                'About Us',
                'Our Team',
                'Careers',
                'Press',
                'Blog',
              ].map((item) => (
                <li key={item}>
                  <Link 
                    to="#" 
                    className="text-muted-foreground hover:text-foreground transition-colors hover:underline"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              {[
                { icon: Mail, text: 'contact@ecoflowcompass.com' },
                { icon: Phone, text: '+1 (555) 123-4567' },
                { icon: MapPin, text: '123 Sustainability St\nGreen City, EC 12345' },
              ].map(({ icon: Icon, text }, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Icon className="h-5 w-5 text-forest-500 mt-0.5" />
                  <span className="text-muted-foreground whitespace-pre-line">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Fandoro. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <Link
                key={item}
                to="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
