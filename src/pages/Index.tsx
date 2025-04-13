
import React from 'react';
import Header from "@/components/LandingPage/Header";
import Hero from "@/components/LandingPage/Hero";
import Features from "@/components/LandingPage/Features";
import Footer from "@/components/LandingPage/Footer";

const Index: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        {/* Add more sections as needed */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
