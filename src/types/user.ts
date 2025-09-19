import type { BaseEntity, ContactInfo, UserRole, Status } from './common';

// User interface
export interface User extends BaseEntity, ContactInfo {
  department: string;
  role: UserRole;
  status: Status;
  joinDate: string;
  lastLogin: string;
  permissions: string[];
}

// Student specific information
export interface StudentInfo extends BaseEntity, ContactInfo {
  department: string;
  studentId: string;
  year: number;
  program: string;
  status: Status;
  joinDate: string;
  totalBorrows: number;
  activeBorrows: number;
  overdueItems: number;
  averageUsageHours: number;
}

// User profile information
export interface UserProfile extends ContactInfo {
  department: string;
  role: string;
}

// Form data interfaces
export interface UserFormData extends ContactInfo {
  department: string;
  role: UserRole;
  status: Status;
  permissions: string[];
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface FormErrors {
  [key: string]: string;
}