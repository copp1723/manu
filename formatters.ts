import { format, formatDistance, formatRelative, isDate } from 'date-fns';

// Date formatting utilities
export const formatDate = (date: Date | string | number, formatString: string = 'MMM dd, yyyy'): string => {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  if (!isDate(dateObj) || isNaN(dateObj.getTime())) {
    console.error('Invalid date provided to formatDate:', date);
    return 'Invalid date';
  }
  return format(dateObj, formatString);
};

export const formatRelativeTime = (date: Date | string | number, baseDate: Date = new Date()): string => {
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  if (!isDate(dateObj) || isNaN(dateObj.getTime())) {
    console.error('Invalid date provided to formatRelativeTime:', date);
    return 'Invalid date';
  }
  return formatDistance(dateObj, baseDate, { addSuffix: true });
};

// Number formatting utilities
export const formatNumber = (num: number, options: Intl.NumberFormatOptions = {}): string => {
  return new Intl.NumberFormat('en-US', options).format(num);
};

export const formatCurrency = (amount: number, currency: string = 'USD', options: Intl.NumberFormatOptions = {}): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  }).format(amount);
};

export const formatPercentage = (value: number, options: Intl.NumberFormatOptions = {}): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
    ...options,
  }).format(value / 100);
};

// String formatting utilities
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

export const capitalizeFirstLetter = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};
