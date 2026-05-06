import React from 'react';
import * as LucideIcons from 'lucide-react';

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number | string;
  color?: string;
}

const LucideIcon = ({ name, className, size = 24, color }: LucideIconProps) => {
  // Check if name exists in LucideIcons, otherwise fallback to a default icon
  const IconComponent = (LucideIcons as any)[name];

  if (!IconComponent) {
    // If it's an emoji (common fallback in this project), render it as text
    const isEmoji = /\p{Extended_Pictographic}/u.test(name);
    if (isEmoji) {
      return <span className={className} style={{ fontSize: size }}>{name}</span>;
    }
    
    // Default fallback icon
    return <LucideIcons.HelpCircle className={className} size={size} color={color} />;
  }

  return <IconComponent className={className} size={size} color={color} />;
};

export default LucideIcon;
