export enum EmployeeRole {
  MANAGER = 'Manager',
  DEVELOPER = 'Développeur',
  DESIGNER = 'Designer',
  HR = 'RH',
  SALES = 'Commercial',
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: EmployeeRole;
  hireDate: string; // ISO Date
  salary: number; // Brut mensuel ou annuel selon convention, ici assumé brut annuel
  performanceRating: number; // 0 to 5
  department: string;
}

export enum LeaveType {
  PAID = 'Congés Payés',
  SICK = 'Maladie',
  RTT = 'RTT',
  UNPAID = 'Sans Solde',
}

export enum LeaveStatus {
  PENDING = 'En attente',
  APPROVED = 'Validé',
  REJECTED = 'Refusé',
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  status: LeaveStatus;
  reason?: string;
}

export interface ComputedHRData {
  seniorityYears: number;
  totalCost: number; // Brut * 1.45
  bonusPercentage: number;
}

export type ViewState = 'dashboard' | 'employees' | 'leaves' | 'assistant';