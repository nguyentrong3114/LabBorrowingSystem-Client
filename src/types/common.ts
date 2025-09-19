// Common status types
export type Status = 'Active' | 'Inactive' | 'Suspended';
export type EquipmentStatus = 'Available' | 'In Use' | 'Maintenance' | 'Broken';
export type BookingStatus = 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed' | 'In Progress';
export type BorrowStatus = 'Active' | 'Returned' | 'Overdue' | 'Lost';
export type UserRole = 'Admin' | 'Lab Manager' | 'Faculty' | 'Student' | 'Researcher';
export type LabCondition = 'Excellent' | 'Good' | 'Fair' | 'Needs Cleaning' | 'Damaged';
export type EquipmentCondition = 'Good' | 'Fair' | 'Damaged';

// Base entity interface
export interface BaseEntity {
  id: number;
  createdAt?: string;
  updatedAt?: string;
}

// Common contact information
export interface ContactInfo {
  email: string;
  phone: string;
  name: string;
}

// Time range interface
export interface TimeRange {
  startTime: string;
  endTime: string;
  duration?: string;
}

// Address/Location interface
export interface LocationInfo {
  location: string;
  building?: string;
  room?: string;
  floor?: string;
}