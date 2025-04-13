
import React from 'react';
import { Leaf, BarChart2 } from 'lucide-react';

type LogoProps = {
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg';
};

const Logo: React.FC<LogoProps> = ({ variant = 'full', size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };
  
  const iconSize = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Leaf className="text-forest-500" size={iconSize[size]} />
        <BarChart2 
          className="text-ocean-500 absolute top-0 left-0 opacity-60" 
          size={iconSize[size]}
        />
      </div>
      
      {variant === 'full' && (
        <span className={`font-bold ${sizeClasses[size]} text-foreground`}>
          Fandoro<span className="text-forest-500">SaaS</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
