import React from 'react';
import { motion } from 'framer-motion';

type CardVariant = 'default' | 'primary' | 'flat';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  animate?: boolean;
  className?: string;
  onClick?: () => void;
}

const variants: Record<CardVariant, string> = {
  default: 'bg-white dark:bg-gray-800 shadow-md rounded-lg',
  primary: 'bg-primary-50 dark:bg-primary-900 shadow-md rounded-lg',
  flat: 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg',
};

export const Card: React.FC<CardProps> = ({ 
  children, 
  variant = 'default', 
  animate = false,
  className = '',
  onClick,
  ...props 
}) => {
  const baseClass = variants[variant] || variants.default;
  
  const CardElement = animate ? motion.div : 'div';
  
  const animationProps = animate ? {
    whileHover: { y: -5, transition: { duration: 0.2 } },
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  } : {};

  return (
    <CardElement 
      className={`${baseClass} p-6 ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      {...animationProps}
      {...props}
    >
      {children}
    </CardElement>
  );
};
