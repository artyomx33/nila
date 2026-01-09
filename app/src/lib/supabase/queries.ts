// ============================================
// NILA ESTATE MANAGEMENT - DATA ACCESS LAYER
// Supabase queries for all NILA entities
// ============================================

import { supabase } from './client';
import type {
  NilaUnit,
  NilaUnitInsert,
  NilaUnitUpdate,
  NilaProperty,
  NilaPropertyInsert,
  NilaPropertyUpdate,
  NilaBooking,
  NilaBookingInsert,
  NilaBookingUpdate,
  NilaPayment,
  NilaPaymentInsert,
  NilaOwner,
  NilaOwnerInsert,
  NilaOwnerUpdate,
  NilaMaintenanceTask,
  NilaMaintenanceTaskInsert,
  NilaMaintenanceTaskUpdate,
  NilaMaintenanceReport,
  NilaMaintenanceReportInsert,
  NilaMaintenanceReportUpdate,
  NilaOwnerPayout,
  NilaOwnerPayoutInsert,
  NilaOwnerPayoutUpdate,
  NilaExpense,
  NilaExpenseInsert,
} from './types';

// ============================================
// PROPERTIES
// ============================================

export async function getProperties(filters?: { is_active?: boolean }) {
  let query = supabase.from('nila_properties').select('*');

  if (filters?.is_active !== undefined) {
    query = query.eq('is_active', filters.is_active);
  }

  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) throw error;
  return data as NilaProperty[];
}

export async function getPropertyById(id: string) {
  const { data, error } = await supabase
    .from('nila_properties')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as NilaProperty;
}

export async function getPropertyBySlug(slug: string) {
  const { data, error } = await supabase
    .from('nila_properties')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data as NilaProperty;
}

export async function createProperty(propertyData: NilaPropertyInsert) {
  const { data, error } = await supabase
    .from('nila_properties')
    .insert([propertyData])
    .select()
    .single();

  if (error) throw error;
  return data as NilaProperty;
}

export async function updateProperty(id: string, updates: NilaPropertyUpdate) {
  const { data, error } = await supabase
    .from('nila_properties')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as NilaProperty;
}

export async function deleteProperty(id: string) {
  const { error } = await supabase.from('nila_properties').delete().eq('id', id);
  if (error) throw error;
  return true;
}

// ============================================
// UNITS
// ============================================

export async function getUnits(filters?: {
  status?: NilaUnit['status'];
  property_id?: string;
  owner_id?: string;
  is_active?: boolean;
}) {
  let query = supabase.from('nila_units').select('*');

  if (filters) {
    if (filters.status) query = query.eq('status', filters.status);
    if (filters.property_id) query = query.eq('property_id', filters.property_id);
    if (filters.owner_id) query = query.eq('owner_id', filters.owner_id);
    if (filters.is_active !== undefined) query = query.eq('is_active', filters.is_active);
  }

  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) throw error;
  return data as NilaUnit[];
}

export async function getUnitById(id: string) {
  const { data, error } = await supabase
    .from('nila_units')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as NilaUnit;
}

export async function getUnitsWithProperty() {
  const { data, error } = await supabase
    .from('nila_units')
    .select(`
      *,
      property:nila_properties(*),
      owner:nila_owners(*)
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createUnit(unitData: NilaUnitInsert) {
  const { data, error } = await supabase
    .from('nila_units')
    .insert([unitData])
    .select()
    .single();

  if (error) throw error;
  return data as NilaUnit;
}

export async function updateUnit(id: string, updates: NilaUnitUpdate) {
  const { data, error } = await supabase
    .from('nila_units')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as NilaUnit;
}

export async function deleteUnit(id: string) {
  const { error } = await supabase.from('nila_units').delete().eq('id', id);
  if (error) throw error;
  return true;
}

export async function getUnitStats() {
  const { data, error } = await supabase.from('nila_units').select('status');

  if (error) throw error;

  const total = data.length;
  const available = data.filter((u) => u.status === 'available').length;
  const occupied = data.filter((u) => u.status === 'occupied').length;
  const maintenance = data.filter((u) => u.status === 'maintenance').length;
  const blocked = data.filter((u) => u.status === 'blocked').length;

  return {
    total,
    available,
    occupied,
    maintenance,
    blocked,
    occupancy_rate: total > 0 ? Math.round((occupied / total) * 100) : 0,
  };
}

// ============================================
// OWNERS
// ============================================

export async function getOwners() {
  const { data, error } = await supabase
    .from('nila_owners')
    .select('*')
    .order('name', { ascending: true });

  if (error) throw error;
  return data as NilaOwner[];
}

export async function getOwnerById(id: string) {
  const { data, error } = await supabase
    .from('nila_owners')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as NilaOwner;
}

export async function getOwnerWithUnits(id: string) {
  const { data, error } = await supabase
    .from('nila_owners')
    .select(`
      *,
      units:nila_units(*)
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function createOwner(ownerData: NilaOwnerInsert) {
  const { data, error } = await supabase
    .from('nila_owners')
    .insert([ownerData])
    .select()
    .single();

  if (error) throw error;
  return data as NilaOwner;
}

export async function updateOwner(id: string, updates: NilaOwnerUpdate) {
  const { data, error } = await supabase
    .from('nila_owners')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as NilaOwner;
}

export async function deleteOwner(id: string) {
  const { error } = await supabase.from('nila_owners').delete().eq('id', id);
  if (error) throw error;
  return true;
}

// ============================================
// BOOKINGS
// ============================================

export async function getBookings(filters?: {
  status?: NilaBooking['status'];
  unit_id?: string;
  source?: NilaBooking['source'];
}) {
  let query = supabase.from('nila_bookings').select('*');

  if (filters) {
    if (filters.status) query = query.eq('status', filters.status);
    if (filters.unit_id) query = query.eq('unit_id', filters.unit_id);
    if (filters.source) query = query.eq('source', filters.source);
  }

  const { data, error } = await query.order('check_in', { ascending: false });
  if (error) throw error;
  return data as NilaBooking[];
}

export async function getBookingById(id: string) {
  const { data, error } = await supabase
    .from('nila_bookings')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as NilaBooking;
}

export async function getBookingWithDetails(id: string) {
  const { data, error } = await supabase
    .from('nila_bookings')
    .select(`
      *,
      unit:nila_units(*),
      payments:nila_payments(*)
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function getBookingsInRange(startDate: Date, endDate: Date) {
  const start = startDate.toISOString().split('T')[0];
  const end = endDate.toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('nila_bookings')
    .select('*')
    .or(`check_in.gte.${start},check_out.lte.${end}`)
    .neq('status', 'cancelled')
    .order('check_in', { ascending: true });

  if (error) throw error;
  return data as NilaBooking[];
}

export async function createBooking(bookingData: NilaBookingInsert) {
  const { data, error } = await supabase
    .from('nila_bookings')
    .insert([bookingData])
    .select()
    .single();

  if (error) throw error;
  return data as NilaBooking;
}

export async function updateBooking(id: string, updates: NilaBookingUpdate) {
  const { data, error } = await supabase
    .from('nila_bookings')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as NilaBooking;
}

export async function deleteBooking(id: string) {
  const { error } = await supabase.from('nila_bookings').delete().eq('id', id);
  if (error) throw error;
  return true;
}

export async function isUnitAvailable(
  unitId: string,
  checkIn: Date,
  checkOut: Date,
  excludeBookingId?: string
) {
  const checkInStr = checkIn.toISOString().split('T')[0];
  const checkOutStr = checkOut.toISOString().split('T')[0];

  let query = supabase
    .from('nila_bookings')
    .select('id')
    .eq('unit_id', unitId)
    .neq('status', 'cancelled')
    .or(`and(check_in.lt.${checkOutStr},check_out.gt.${checkInStr})`);

  if (excludeBookingId) {
    query = query.neq('id', excludeBookingId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data.length === 0;
}

export async function getUpcomingCheckIns(days: number = 7) {
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + days);

  const { data, error } = await supabase
    .from('nila_bookings')
    .select('*')
    .eq('status', 'confirmed')
    .gte('check_in', today.toISOString().split('T')[0])
    .lte('check_in', futureDate.toISOString().split('T')[0])
    .order('check_in', { ascending: true });

  if (error) throw error;
  return data as NilaBooking[];
}

export async function getUpcomingCheckOuts(days: number = 7) {
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + days);

  const { data, error } = await supabase
    .from('nila_bookings')
    .select('*')
    .in('status', ['confirmed', 'checked_in'])
    .gte('check_out', today.toISOString().split('T')[0])
    .lte('check_out', futureDate.toISOString().split('T')[0])
    .order('check_out', { ascending: true });

  if (error) throw error;
  return data as NilaBooking[];
}

// ============================================
// PAYMENTS
// ============================================

export async function getPaymentsByBooking(bookingId: string) {
  const { data, error } = await supabase
    .from('nila_payments')
    .select('*')
    .eq('booking_id', bookingId)
    .order('paid_at', { ascending: false });

  if (error) throw error;
  return data as NilaPayment[];
}

export async function createPayment(paymentData: NilaPaymentInsert) {
  const { data, error } = await supabase
    .from('nila_payments')
    .insert([paymentData])
    .select()
    .single();

  if (error) throw error;
  return data as NilaPayment;
}

export async function getPaymentsByType(bookingId: string, paymentType: NilaPayment['payment_type']) {
  if (!paymentType) return [];

  const { data, error } = await supabase
    .from('nila_payments')
    .select('*')
    .eq('booking_id', bookingId)
    .eq('payment_type', paymentType)
    .order('paid_at', { ascending: false });

  if (error) throw error;
  return data as NilaPayment[];
}

export async function getTotalPaymentsByType(bookingId: string, paymentType: NilaPayment['payment_type']) {
  const payments = await getPaymentsByType(bookingId, paymentType);
  return payments.reduce((sum, p) => sum + Number(p.amount), 0);
}

export async function getBookingPaymentSummary(bookingId: string) {
  const payments = await getPaymentsByBooking(bookingId);

  const summary = {
    total: 0,
    security_deposit: 0,
    rent: 0,
    reservation_deposit: 0,
    cleaning: 0,
    utilities: 0,
    other: 0,
  };

  payments.forEach((payment) => {
    const amount = Number(payment.amount);
    summary.total += amount;

    if (payment.payment_type) {
      if (payment.payment_type in summary) {
        summary[payment.payment_type as keyof typeof summary] += amount;
      } else {
        summary.other += amount;
      }
    } else {
      summary.other += amount;
    }
  });

  return summary;
}

// ============================================
// MAINTENANCE TASKS
// ============================================

export async function getMaintenanceTasks(filters?: {
  status?: NilaMaintenanceTask['status'];
  priority?: NilaMaintenanceTask['priority'];
  unit_id?: string;
  property_id?: string;
}) {
  let query = supabase.from('nila_maintenance_tasks').select('*');

  if (filters) {
    if (filters.status) query = query.eq('status', filters.status);
    if (filters.priority) query = query.eq('priority', filters.priority);
    if (filters.unit_id) query = query.eq('unit_id', filters.unit_id);
    if (filters.property_id) query = query.eq('property_id', filters.property_id);
  }

  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) throw error;
  return data as NilaMaintenanceTask[];
}

export async function getMaintenanceTaskById(id: string) {
  const { data, error } = await supabase
    .from('nila_maintenance_tasks')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as NilaMaintenanceTask;
}

export async function createMaintenanceTask(taskData: NilaMaintenanceTaskInsert) {
  const { data, error } = await supabase
    .from('nila_maintenance_tasks')
    .insert([taskData])
    .select()
    .single();

  if (error) throw error;
  return data as NilaMaintenanceTask;
}

export async function updateMaintenanceTask(id: string, updates: NilaMaintenanceTaskUpdate) {
  const { data, error } = await supabase
    .from('nila_maintenance_tasks')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as NilaMaintenanceTask;
}

export async function deleteMaintenanceTask(id: string) {
  const { error } = await supabase.from('nila_maintenance_tasks').delete().eq('id', id);
  if (error) throw error;
  return true;
}

// ============================================
// MAINTENANCE REPORTS
// ============================================

export async function getMaintenanceReports(filters?: {
  unit_id?: string;
  month?: string; // YYYY-MM-DD format (first of month)
}) {
  let query = supabase.from('nila_maintenance_reports').select('*');

  if (filters) {
    if (filters.unit_id) query = query.eq('unit_id', filters.unit_id);
    if (filters.month) query = query.eq('month', filters.month);
  }

  const { data, error } = await query.order('month', { ascending: false });
  if (error) throw error;
  return data as NilaMaintenanceReport[];
}

export async function getMaintenanceReportById(id: string) {
  const { data, error } = await supabase
    .from('nila_maintenance_reports')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as NilaMaintenanceReport;
}

export async function createMaintenanceReport(reportData: NilaMaintenanceReportInsert) {
  const { data, error } = await supabase
    .from('nila_maintenance_reports')
    .insert([reportData])
    .select()
    .single();

  if (error) throw error;
  return data as NilaMaintenanceReport;
}

export async function updateMaintenanceReport(id: string, updates: NilaMaintenanceReportUpdate) {
  const { data, error } = await supabase
    .from('nila_maintenance_reports')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as NilaMaintenanceReport;
}

// ============================================
// OWNER PAYOUTS
// ============================================

export async function getOwnerPayouts(filters?: {
  owner_id?: string;
  status?: NilaOwnerPayout['status'];
}) {
  let query = supabase.from('nila_owner_payouts').select('*');

  if (filters) {
    if (filters.owner_id) query = query.eq('owner_id', filters.owner_id);
    if (filters.status) query = query.eq('status', filters.status);
  }

  const { data, error } = await query.order('period_end', { ascending: false });
  if (error) throw error;
  return data as NilaOwnerPayout[];
}

export async function getOwnerPayoutById(id: string) {
  const { data, error } = await supabase
    .from('nila_owner_payouts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as NilaOwnerPayout;
}

export async function createOwnerPayout(payoutData: NilaOwnerPayoutInsert) {
  const { data, error } = await supabase
    .from('nila_owner_payouts')
    .insert([payoutData])
    .select()
    .single();

  if (error) throw error;
  return data as NilaOwnerPayout;
}

export async function updateOwnerPayout(id: string, updates: NilaOwnerPayoutUpdate) {
  const { data, error } = await supabase
    .from('nila_owner_payouts')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as NilaOwnerPayout;
}

// ============================================
// EXPENSES
// ============================================

export async function getExpenses(filters?: {
  unit_id?: string;
  property_id?: string;
  category?: NilaExpense['category'];
  startDate?: Date;
  endDate?: Date;
}) {
  let query = supabase.from('nila_expenses').select('*');

  if (filters) {
    if (filters.unit_id) query = query.eq('unit_id', filters.unit_id);
    if (filters.property_id) query = query.eq('property_id', filters.property_id);
    if (filters.category) query = query.eq('category', filters.category);
    if (filters.startDate) {
      query = query.gte('expense_date', filters.startDate.toISOString().split('T')[0]);
    }
    if (filters.endDate) {
      query = query.lte('expense_date', filters.endDate.toISOString().split('T')[0]);
    }
  }

  const { data, error } = await query.order('expense_date', { ascending: false });
  if (error) throw error;
  return data as NilaExpense[];
}

export async function createExpense(expenseData: NilaExpenseInsert) {
  const { data, error } = await supabase
    .from('nila_expenses')
    .insert([expenseData])
    .select()
    .single();

  if (error) throw error;
  return data as NilaExpense;
}

// ============================================
// DASHBOARD / AGGREGATES
// ============================================

export async function getDashboardStats() {
  const [unitsResult, bookingsResult, tasksResult] = await Promise.all([
    supabase.from('nila_units').select('status, is_active'),
    supabase.from('nila_bookings').select('status, total, currency'),
    supabase.from('nila_maintenance_tasks').select('status, priority'),
  ]);

  if (unitsResult.error) throw unitsResult.error;
  if (bookingsResult.error) throw bookingsResult.error;
  if (tasksResult.error) throw tasksResult.error;

  const units = unitsResult.data;
  const bookings = bookingsResult.data;
  const tasks = tasksResult.data;

  return {
    units: {
      total: units.length,
      active: units.filter((u) => u.is_active).length,
      available: units.filter((u) => u.status === 'available').length,
      occupied: units.filter((u) => u.status === 'occupied').length,
      maintenance: units.filter((u) => u.status === 'maintenance').length,
    },
    bookings: {
      total: bookings.length,
      pending: bookings.filter((b) => b.status === 'pending').length,
      confirmed: bookings.filter((b) => b.status === 'confirmed').length,
      checkedIn: bookings.filter((b) => b.status === 'checked_in').length,
      revenue: bookings
        .filter((b) => b.status !== 'cancelled')
        .reduce((sum, b) => sum + (b.total || 0), 0),
    },
    maintenance: {
      total: tasks.length,
      pending: tasks.filter((t) => t.status === 'pending').length,
      inProgress: tasks.filter((t) => t.status === 'in_progress').length,
      urgent: tasks.filter((t) => t.priority === 'urgent').length,
    },
  };
}
