import type { BookingStatus, EquipmentStatus, Status, BorrowStatus } from '../types';

// Status utility functions
export const getStatusColor = (status: BookingStatus | EquipmentStatus | Status | BorrowStatus | string): string => {
  const statusLower = status.toLowerCase();
  
  // Equipment status colors
  if (statusLower === 'available') return 'bg-green-100 text-green-800';
  if (statusLower === 'in use') return 'bg-blue-100 text-blue-800';
  if (statusLower === 'maintenance') return 'bg-yellow-100 text-yellow-800';
  if (statusLower === 'broken') return 'bg-red-100 text-red-800';
  
  // Booking status colors
  if (statusLower === 'confirmed') return 'bg-green-100 text-green-800';
  if (statusLower === 'pending') return 'bg-yellow-100 text-yellow-800';
  if (statusLower === 'cancelled') return 'bg-red-100 text-red-800';
  if (statusLower === 'completed') return 'bg-blue-100 text-blue-800';
  if (statusLower === 'in progress') return 'bg-purple-100 text-purple-800';
  
  // User status colors
  if (statusLower === 'active') return 'bg-green-100 text-green-800';
  if (statusLower === 'inactive') return 'bg-gray-100 text-gray-800';
  if (statusLower === 'suspended') return 'bg-red-100 text-red-800';
  
  // Borrow status colors
  if (statusLower === 'returned') return 'bg-blue-100 text-blue-800';
  if (statusLower === 'overdue') return 'bg-red-100 text-red-800';
  if (statusLower === 'lost') return 'bg-gray-100 text-gray-800';
  
  // Default color
  return 'bg-gray-100 text-gray-800';
};

// Date utility functions
export const formatDate = (dateString: string, options?: Intl.DateTimeFormatOptions): string => {
  const date = new Date(dateString);
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  
  return date.toLocaleDateString('en-US', options || defaultOptions);
};

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatTime = (timeString: string): string => {
  return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};

export const calculateDuration = (startTime: string, endTime: string): string => {
  const start = new Date(`2000-01-01T${startTime}`);
  const end = new Date(`2000-01-01T${endTime}`);
  const diffMs = end.getTime() - start.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);
  
  if (diffHours < 1) {
    const diffMinutes = Math.round(diffMs / (1000 * 60));
    return `${diffMinutes} minutes`;
  }
  
  return `${diffHours} hours`;
};

// Search and filter utilities
export const filterBySearchTerm = <T>(
  items: T[], 
  searchTerm: string, 
  searchFields: (keyof T)[]
): T[] => {
  if (!searchTerm.trim()) return items;
  
  const term = searchTerm.toLowerCase();
  return items.filter(item =>
    searchFields.some(field => {
      const value = item[field];
      return value && value.toString().toLowerCase().includes(term);
    })
  );
};

export const filterByStatus = <T extends { status: string }>(
  items: T[], 
  statusFilter: string
): T[] => {
  if (statusFilter === 'All') return items;
  return items.filter(item => item.status === statusFilter);
};

// Array utilities
export const groupBy = <T>(array: T[], keyGetter: (item: T) => string): Record<string, T[]> => {
  return array.reduce((groups, item) => {
    const key = keyGetter(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {} as Record<string, T[]>);
};

export const sortBy = <T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

// Validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

// Number formatting utilities
export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};