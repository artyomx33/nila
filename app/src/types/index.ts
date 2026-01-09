// ============================================
// NILA ESTATE MANAGEMENT - TYPE DEFINITIONS
// Agent 1: Foundation types
// ============================================

// USER & AUTHENTICATION
// ============================================

export type UserRole = "admin" | "owner" | "booker";

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  role: UserRole;
  avatar_url?: string | null;
  created_at: Date;
}

// UNITS (PROPERTIES)
// ============================================

export type UnitType = "apartment" | "condo" | "villa" | "studio" | "penthouse";
export type UnitStatus = "available" | "occupied" | "maintenance" | "unavailable";
export type RentalType = "short" | "long" | "both";

export interface UnitPricing {
  base: number; // Base nightly rate (MXN)
  high_season: number; // High season rate (MXN)
  low_season: number; // Low season rate (MXN)
  cleaning_fee: number; // One-time cleaning fee (MXN)
  currency: "MXN" | "USD";
}

export interface Unit {
  id: string;
  name: string;
  type: UnitType;
  bedrooms: number;
  bathrooms: number;
  floor: number;
  neighborhood: string;
  owner_id: string;
  amenities: string[];
  is_smart: boolean; // Smart home features enabled
  rental_type: RentalType;
  pricing: UnitPricing;
  photos: string[]; // Array of photo URLs
  guide: string | null; // Guest guide content
  platform_urls: {
    airbnb?: string | null;
    booking?: string | null;
  };
  status: UnitStatus;
  created_at: Date;
  updated_at?: Date;
}

// BOOKINGS
// ============================================

export type BookingStatus = "pending" | "confirmed" | "checked_in" | "checked_out" | "cancelled";
export type BookingSource = "direct" | "airbnb" | "booking" | "owner";
export type PaymentStatus = "pending" | "partial" | "paid" | "refunded";

export interface GuestInfo {
  name: string;
  email: string;
  phone: string;
  nationality: string;
  guests_count: number;
  notes?: string;
}

export interface BookingPricing {
  nightly_rate: number;
  nights: number;
  subtotal: number;
  cleaning_fee: number;
  taxes: number;
  total: number;
  currency: "MXN" | "USD";
}

export interface Booking {
  id: string;
  unit_id: string;
  guest: GuestInfo;
  check_in: Date;
  check_out: Date;
  source: BookingSource;
  status: BookingStatus;
  pricing: BookingPricing;
  payment_status: PaymentStatus;
  contract_url?: string | null;
  contract_signed_at?: Date | null;
  notes?: string | null;
  created_at: Date;
  updated_at?: Date;
}

// CLEANING OPERATIONS
// ============================================

export type CleaningType = "turnover" | "deep" | "maintenance" | "inspection";
export type CleaningStatus = "pending" | "assigned" | "in_progress" | "completed" | "verified";

export interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
  photo_url?: string | null;
  notes?: string | null;
}

export interface Cleaning {
  id: string;
  unit_id: string;
  booking_id?: string | null;
  scheduled_date: Date;
  cleaner_id?: string | null;
  type: CleaningType;
  status: CleaningStatus;
  checklist: ChecklistItem[];
  photos: string[];
  notes?: string | null;
  started_at?: Date | null;
  completed_at?: Date | null;
  verified_at?: Date | null;
  created_at: Date;
}

// CLEANERS (STAFF)
// ============================================

export type CleanerStatus = "active" | "inactive" | "on_leave";

export interface Cleaner {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  status: CleanerStatus;
  assigned_cleanings?: number; // Count of current assignments
  completed_cleanings?: number; // Historical count
  rating?: number; // Average rating out of 5
  created_at: Date;
}

// MAINTENANCE
// ============================================

export type MaintenanceStatus = "reported" | "scheduled" | "in_progress" | "completed" | "cancelled";
export type MaintenancePriority = "low" | "medium" | "high" | "urgent";
export type MaintenanceCategory =
  | "plumbing"
  | "electrical"
  | "hvac"
  | "appliance"
  | "structural"
  | "cosmetic"
  | "other";

export interface MaintenanceRequest {
  id: string;
  unit_id: string;
  category: MaintenanceCategory;
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  title: string;
  description: string;
  reported_by: string; // User ID
  assigned_to?: string | null; // Contractor name/ID
  photos: string[];
  cost?: number | null;
  currency?: "MXN" | "USD";
  scheduled_date?: Date | null;
  completed_at?: Date | null;
  notes?: string | null;
  created_at: Date;
  updated_at?: Date;
}

// EXPENSES
// ============================================

export type ExpenseCategory =
  | "cleaning"
  | "maintenance"
  | "utilities"
  | "supplies"
  | "marketing"
  | "commission"
  | "tax"
  | "other";

export interface Expense {
  id: string;
  unit_id?: string | null; // Can be property-specific or general
  category: ExpenseCategory;
  amount: number;
  currency: "MXN" | "USD";
  description: string;
  receipt_url?: string | null;
  date: Date;
  created_by: string; // User ID
  created_at: Date;
}

// OWNERS
// ============================================

export interface Owner {
  id: string;
  user_id?: string | null; // If they have portal access
  name: string;
  email: string;
  phone: string;
  address?: string | null;
  tax_id?: string | null; // RFC in Mexico
  bank_account?: string | null;
  commission_rate: number; // Percentage (e.g., 15 = 15%)
  units: string[]; // Array of unit IDs
  created_at: Date;
}

// DASHBOARD STATS
// ============================================

export interface DashboardStats {
  total_units: number;
  active_bookings: number;
  occupancy_rate: number; // Percentage
  monthly_revenue: number;
  currency: "MXN" | "USD";
}

export interface TodayActivity {
  check_ins: Booking[];
  check_outs: Booking[];
  cleanings: Cleaning[];
  maintenance_alerts: MaintenanceRequest[];
}

// UI & UTILITY TYPES
// ============================================

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  badge?: number | string;
  children?: NavItem[];
}

export type SortDirection = "asc" | "desc";

export interface TableColumn<T = any> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
}

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

// PAYMENTS
// ============================================

export type PaymentType =
  | "reservation_deposit"
  | "security_deposit"
  | "rent"
  | "cleaning"
  | "utilities"
  | "damage"
  | "refund"
  | "other";

export type PaymentMethod = "cash" | "card" | "transfer" | "paypal" | "stripe" | "other";

export interface Payment {
  id: string;
  booking_id: string;
  amount: number;
  currency: "MXN" | "USD";
  payment_type: PaymentType;
  method: PaymentMethod;
  reference?: string | null;
  notes?: string | null;
  paid_at: Date;
  created_at: Date;
}
