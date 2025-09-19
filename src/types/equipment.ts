import type { BaseEntity, EquipmentStatus } from './common';

// Equipment interface
export interface Equipment extends BaseEntity {
  name: string;
  category: string;
  status: EquipmentStatus;
  location: string;
  serialNumber: string;
  purchaseDate: string;
  lastMaintenance: string;
  description?: string;
  manufacturer?: string;
  model?: string;
  specifications?: Record<string, any>;
}

// Maintenance records
export interface MaintenanceRecord extends BaseEntity {
  equipmentId: number;
  equipmentName: string;
  type: 'Preventive' | 'Corrective' | 'Emergency';
  description: string;
  performedBy: string;
  cost: number;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  scheduledDate: string;
  completedDate?: string;
  notes?: string;
}

// Maintenance schedule
export interface MaintenanceSchedule extends BaseEntity {
  equipmentId: number;
  equipmentName: string;
  type: 'Preventive' | 'Corrective' | 'Emergency';
  description: string;
  assignedTo: string;
  scheduledDate: string;
  estimatedDuration: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Scheduled' | 'In Progress' | 'Completed';
}

// Equipment usage data
export interface UsageData {
  date: string;
  hours: number;
  bookings: number;
}

export interface UserUsageData {
  userName: string;
  department: string;
  totalHours: number;
  bookings: number;
}

// Equipment form data
export interface EquipmentFormData {
  name: string;
  category: string;
  status: EquipmentStatus;
  location: string;
  serialNumber: string;
  purchaseDate: string;
  lastMaintenance: string;
  description?: string;
  manufacturer?: string;
  model?: string;
}