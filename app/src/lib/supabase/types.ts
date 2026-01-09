// ============================================
// NILA ESTATE MANAGEMENT - TYPE EXPORTS
// Re-export generated types for consistency
// ============================================

export type { Database } from './database.types';

// Convenience type aliases for NILA tables
import type { Database } from './database.types';

type PublicSchema = Database['public'];
type NilaTables = PublicSchema['Tables'];

// Row types (what you get from SELECT)
export type NilaOwner = NilaTables['nila_owners']['Row'];
export type NilaProperty = NilaTables['nila_properties']['Row'];
export type NilaUnit = NilaTables['nila_units']['Row'];
export type NilaBooking = NilaTables['nila_bookings']['Row'];
export type NilaPayment = NilaTables['nila_payments']['Row'];
export type NilaMaintenanceTask = NilaTables['nila_maintenance_tasks']['Row'];
export type NilaMaintenanceReport = NilaTables['nila_maintenance_reports']['Row'];
export type NilaOwnerPayout = NilaTables['nila_owner_payouts']['Row'];
export type NilaExpense = NilaTables['nila_expenses']['Row'];

// Insert types (what you provide for INSERT)
export type NilaOwnerInsert = NilaTables['nila_owners']['Insert'];
export type NilaPropertyInsert = NilaTables['nila_properties']['Insert'];
export type NilaUnitInsert = NilaTables['nila_units']['Insert'];
export type NilaBookingInsert = NilaTables['nila_bookings']['Insert'];
export type NilaPaymentInsert = NilaTables['nila_payments']['Insert'];
export type NilaMaintenanceTaskInsert = NilaTables['nila_maintenance_tasks']['Insert'];
export type NilaMaintenanceReportInsert = NilaTables['nila_maintenance_reports']['Insert'];
export type NilaOwnerPayoutInsert = NilaTables['nila_owner_payouts']['Insert'];
export type NilaExpenseInsert = NilaTables['nila_expenses']['Insert'];

// Update types (what you provide for UPDATE)
export type NilaOwnerUpdate = NilaTables['nila_owners']['Update'];
export type NilaPropertyUpdate = NilaTables['nila_properties']['Update'];
export type NilaUnitUpdate = NilaTables['nila_units']['Update'];
export type NilaBookingUpdate = NilaTables['nila_bookings']['Update'];
export type NilaPaymentUpdate = NilaTables['nila_payments']['Update'];
export type NilaMaintenanceTaskUpdate = NilaTables['nila_maintenance_tasks']['Update'];
export type NilaMaintenanceReportUpdate = NilaTables['nila_maintenance_reports']['Update'];
export type NilaOwnerPayoutUpdate = NilaTables['nila_owner_payouts']['Update'];
export type NilaExpenseUpdate = NilaTables['nila_expenses']['Update'];

// Enum-like types from the database constraints
export type BookingStatus = NilaBooking['status'];
export type BookingSource = NilaBooking['source'];
export type BookingType = NilaBooking['booking_type'];
export type DepositStatus = NilaBooking['deposit_status'];
export type ContractStatus = NilaBooking['contract_status'];
export type PaymentStatus = NilaBooking['payment_status'];
export type PaymentMethod = NilaPayment['method'];
export type PaymentType = NilaPayment['payment_type'];
export type PropertyType = NilaProperty['type'];
export type UnitStatus = NilaUnit['status'];
export type MaintenanceTaskStatus = NilaMaintenanceTask['status'];
export type MaintenanceTaskPriority = NilaMaintenanceTask['priority'];
export type MaintenanceTaskCategory = NilaMaintenanceTask['category'];
export type ExpenseCategory = NilaExpense['category'];
export type OwnerPayoutStatus = NilaOwnerPayout['status'];
