import type { BaseEntity, BookingStatus, TimeRange, LocationInfo, LabCondition } from './common';
import type { UserProfile } from './user';

// Basic booking interface
export interface Booking extends BaseEntity, TimeRange {
  labName: string;
  bookedBy: string;
  date: string;
  purpose: string;
  status: BookingStatus;
  participants: number;
}

// Detailed booking information
export interface BookingDetails extends BaseEntity, TimeRange {
  labName: string;
  labLocation: string;
  labCapacity: number;
  bookedBy: UserProfile;
  bookingDate: string;
  purpose: string;
  description: string;
  status: BookingStatus;
  participants: number;
  equipmentRequested: string[];
  specialRequirements: string;
  approvedBy?: string;
  approvedAt?: string;
  rejectedReason?: string;
  notes: string;
  attachments: string[];
  checkInTime?: string;
  checkOutTime?: string;
  actualParticipants?: number;
  equipmentUsed: string[];
  labConditionBefore: LabCondition;
  labConditionAfter?: LabCondition;
  additionalCharges?: number;
  recurringPattern?: string;
}

// Activity log
export interface ActivityLog extends BaseEntity {
  action: string;
  performedBy: string;
  timestamp: string;
  details: string;
}

// Equipment booking
export interface EquipmentBooking extends BaseEntity, TimeRange {
  equipmentId: number;
  equipmentName: string;
  equipmentType: string;
  userId: number;
  userName: string;
  userEmail: string;
  purpose: string;
  status: BookingStatus;
  approvedBy?: string;
  approvedAt?: string;
  notes?: string;
  labLocation: string;
  checkInTime?: string;
  checkOutTime?: string;
}

// Form data interfaces
export interface BookingFormData extends TimeRange {
  labId: number;
  date: string;
  purpose: string;
  participants: number;
  specialRequirements?: string;
  equipmentNeeded: string[];
  recurringPattern?: string;
}

// Lab interface
export interface Lab extends BaseEntity, LocationInfo {
  name: string;
  capacity: number;
  equipment: string[];
  status: 'Available' | 'Occupied' | 'Maintenance' | 'Closed';
  features: string[];
}

// Lab form data
export interface LabFormData extends LocationInfo {
  name: string;
  capacity: number;
  equipment: string[];
  status: 'Available' | 'Occupied' | 'Maintenance' | 'Closed';
  features: string[];
}