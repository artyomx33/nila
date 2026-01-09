// ============================================
// NILA ESTATE MANAGEMENT - SUPABASE EXPORTS
// Centralized exports for Supabase functionality
// ============================================

export { supabase, isSupabaseConfigured } from './client';
export * from './queries';
export type { Database } from './types';

// Booking Confirmation Logic
export {
  checkBookingConfirmationRequirements,
  checkPaymentRequirements,
  checkDocumentRequirements,
  checkContractRequirements,
  shouldAutoConfirmBooking,
  getBookingConfirmationStatusMessage,
  calculateBookingConfirmationProgress,
  type BookingConfirmationRequirements,
} from './booking-confirmation';
export type {
  // Row types
  NilaOwner,
  NilaProperty,
  NilaUnit,
  NilaBooking,
  NilaPayment,
  NilaMaintenanceTask,
  NilaMaintenanceReport,
  NilaOwnerPayout,
  NilaExpense,
  // Insert types
  NilaOwnerInsert,
  NilaPropertyInsert,
  NilaUnitInsert,
  NilaBookingInsert,
  NilaPaymentInsert,
  NilaMaintenanceTaskInsert,
  NilaMaintenanceReportInsert,
  NilaOwnerPayoutInsert,
  NilaExpenseInsert,
  // Update types
  NilaOwnerUpdate,
  NilaPropertyUpdate,
  NilaUnitUpdate,
  NilaBookingUpdate,
  NilaPaymentUpdate,
  NilaMaintenanceTaskUpdate,
  NilaMaintenanceReportUpdate,
  NilaOwnerPayoutUpdate,
  NilaExpenseUpdate,
  // Enum types
  BookingStatus,
  BookingSource,
  BookingType,
  DepositStatus,
  ContractStatus,
  PaymentStatus,
  PaymentMethod,
  PaymentType,
  PropertyType,
  UnitStatus,
  MaintenanceTaskStatus,
  MaintenanceTaskPriority,
  MaintenanceTaskCategory,
  ExpenseCategory,
  OwnerPayoutStatus,
} from './types';
