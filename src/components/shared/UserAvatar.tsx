
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type UserAvatarProps = {
  src?: string;
  name: string;
  userType?: 'admin' | 'enterprise' | 'employee' | 'partner' | 'vendor' | 'investor' | 'supplier';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const UserAvatar: React.FC<UserAvatarProps> = ({ 
  src, 
  name, 
  userType = 'employee',
  size = 'md',
  className 
}) => {
  // Get initials from name
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
  
  // Define size classes
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };
  
  // Define color based on user type
  const userTypeColors: Record<string, string> = {
    admin: 'bg-purple-600',
    enterprise: 'bg-forest-500',
    employee: 'bg-forest-400',
    partner: 'bg-amber-500',
    vendor: 'bg-amber-400',
    investor: 'bg-ocean-500',
    supplier: 'bg-ocean-400',
  };
  
  return (
    <Avatar className={cn(sizeClasses[size], className)}>
      {src && <AvatarImage src={src} alt={name} />}
      <AvatarFallback className={cn("text-white", userTypeColors[userType])}>
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
