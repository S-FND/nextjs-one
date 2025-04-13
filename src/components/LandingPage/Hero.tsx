import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart2, Globe, Users, LineChart, Heart } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-32 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-forest-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-[600px] h-[600px] rounded-full bg-ocean-500/10 blur-3xl" />
      </div>
      
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-sm">
              <span className="font-semibold">Introducing Fandoro</span>
              <span className="rounded-full bg-forest-500 px-1.5 py-0.5 text-xs text-white">New</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Sustainability <span className="text-forest-500">Management</span> Simplified
            </h1>
            
            <p className="text-xl text-muted-foreground">
              Streamline your ESG reporting, track net zero progress, and align with sustainable development goals in one powerful platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button size="lg" asChild>
                <Link to="/register">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/demo">Request Demo</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-2">
                <BarChart2 className="text-forest-500 h-5 w-5" />
                <span className="text-sm">ESG Reporting</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="text-forest-500 h-5 w-5" />
                <span className="text-sm">Net Zero Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="text-forest-500 h-5 w-5" />
                <span className="text-sm">Stakeholder Engagement</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="text-forest-500 h-5 w-5" />
                <span className="text-sm">CSR Impact</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square md:aspect-auto md:h-[500px] bg-gradient-to-br from-forest-500/80 to-ocean-500/80 rounded-2xl p-1">
              <div className="w-full h-full bg-background rounded-xl overflow-hidden">
                <div className="p-6 h-full flex flex-col">
                  <div className="border-b pb-3 mb-3">
                    <h3 className="text-lg font-semibold">Sustainability Dashboard</h3>
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div className="bg-muted rounded-lg p-3 flex flex-col items-center justify-center">
                      <div className="rounded-full bg-forest-500/20 p-2 mb-2">
                        <LineChart className="h-6 w-6 text-forest-500" />
                      </div>
                      <div className="text-center">
                        <span className="text-3xl font-bold">42%</span>
                        <p className="text-xs text-muted-foreground">Carbon Reduction</p>
                      </div>
                    </div>
                    <div className="bg-muted rounded-lg p-3 flex flex-col items-center justify-center">
                      <div className="rounded-full bg-ocean-500/20 p-2 mb-2">
                        <BarChart2 className="h-6 w-6 text-ocean-500" />
                      </div>
                      <div className="text-center">
                        <span className="text-3xl font-bold">8.4</span>
                        <p className="text-xs text-muted-foreground">ESG Score</p>
                      </div>
                    </div>
                    <div className="col-span-2 bg-muted rounded-lg p-3">
                      <h4 className="text-sm font-medium mb-2">SDG Alignment</h4>
                      <div className="grid grid-cols-4 gap-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <div 
                            key={num}
                            className="aspect-square rounded bg-accent/80 flex items-center justify-center text-xs font-medium animate-float"
                            style={{ animationDelay: `${num * 0.2}s` }}
                          >
                            {num}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-accent rounded-full opacity-80" />
            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-forest-500 rounded-full opacity-70" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
