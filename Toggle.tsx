import React from 'react';
import { motion } from 'framer-motion';

interface ToggleProps {
  isOn: boolean;
  onToggle: () => void;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  isOn,
  onToggle,
  label,
  disabled = false,
  size = 'md',
  className = '',
}) => {
  const sizes = {
    sm: {
      toggle: 'w-8 h-4',
      circle: 'w-3 h-3',
      translateX: 16,
    },
    md: {
      toggle: 'w-11 h-6',
      circle: 'w-5 h-5',
      translateX: 20,
    },
    lg: {
      toggle: 'w-14 h-7',
      circle: 'w-6 h-6',
      translateX: 28,
    },
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center ${className}`}>
      {label && (
        <span className="mr-3 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
      )}
      <motion.button
        type="button"
        className={`
          ${currentSize.toggle} 
          ${isOn ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'} 
          rounded-full p-0.5 
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        `}
        onClick={() => !disabled && onToggle()}
        aria-pressed={isOn}
        aria-label={label || 'Toggle'}
        disabled={disabled}
      >
        <motion.div
          className={`${currentSize.circle} bg-white rounded-full shadow-md`}
          animate={{
            x: isOn ? currentSize.translateX : 0,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </motion.button>
    </div>
  );
};
