import type { BaseEntity, BorrowStatus, EquipmentCondition } from './common';

// Borrow record interface
export interface BorrowRecord extends BaseEntity {
  equipmentId: number;
  equipmentName: string;
  equipmentType: string;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  status: BorrowStatus;
  purpose: string;
  labLocation: string;
  approvedBy: string;
  usageHours?: number;
  condition: EquipmentCondition;
  notes?: string;
}