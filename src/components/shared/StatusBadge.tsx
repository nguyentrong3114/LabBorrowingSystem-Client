import React from 'react';
import type { BookingStatus, EquipmentStatus, Status, BorrowStatus } from '../../types';

interface StatusBadgeProps {
  status: BookingStatus | EquipmentStatus | Status | BorrowStatus | string;
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  variant = 'default', 
  size = 'sm',
  className = '' 
}) => {
  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    
    // Equipment status colors
    if (statusLower === 'available') return 'bg-green-100 text-green-800 border-green-200';
    if (statusLower === 'in use') return 'bg-blue-100 text-blue-800 border-blue-200';
    if (statusLower === 'maintenance') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (statusLower === 'broken') return 'bg-red-100 text-red-800 border-red-200';
    
    // Booking status colors
    if (statusLower === 'confirmed') return 'bg-green-100 text-green-800 border-green-200';
    if (statusLower === 'pending') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (statusLower === 'cancelled') return 'bg-red-100 text-red-800 border-red-200';
    if (statusLower === 'completed') return 'bg-blue-100 text-blue-800 border-blue-200';
    if (statusLower === 'in progress') return 'bg-purple-100 text-purple-800 border-purple-200';
    
    // User status colors
    if (statusLower === 'active') return 'bg-green-100 text-green-800 border-green-200';
    if (statusLower === 'inactive') return 'bg-gray-100 text-gray-800 border-gray-200';
    if (statusLower === 'suspended') return 'bg-red-100 text-red-800 border-red-200';
    
    // Borrow status colors
    if (statusLower === 'returned') return 'bg-blue-100 text-blue-800 border-blue-200';
    if (statusLower === 'overdue') return 'bg-red-100 text-red-800 border-red-200';
    if (statusLower === 'lost') return 'bg-gray-100 text-gray-800 border-gray-200';
    
    // Default color
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'sm': return 'px-2 py-1 text-xs';
      case 'md': return 'px-3 py-1.5 text-sm';
      case 'lg': return 'px-4 py-2 text-base';
      default: return 'px-2 py-1 text-xs';
    }
  };

  const baseClasses = 'inline-flex items-center rounded-full font-medium';
  const sizeClasses = getSizeClasses(size);
  const colorClasses = getStatusColor(status);
  const borderClasses = variant === 'outline' ? 'border' : '';

  return (
    <span className={`${baseClasses} ${sizeClasses} ${colorClasses} ${borderClasses} ${className}`}>
      {status}
    </span>
  );
};