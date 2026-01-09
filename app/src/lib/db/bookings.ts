// ============================================
// NILA ESTATE MANAGEMENT - BOOKINGS DATABASE
// Agent 3: Bookings & Calendar module
// ============================================

import { Booking, BookingStatus, BookingSource, PaymentStatus } from "@/types";
import { generateId } from "@/lib/utils";

// MOCK BOOKINGS DATA
// ============================================

export const mockBookings: Booking[] = [
  {
    id: "booking-1",
    unit_id: "unit-1",
    guest: {
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 555 123 4567",
      nationality: "USA",
      guests_count: 2,
      notes: "Anniversary trip",
    },
    check_in: new Date("2026-01-15"),
    check_out: new Date("2026-01-22"),
    source: "direct",
    status: "confirmed",
    pricing: {
      nightly_rate: 2500,
      nights: 7,
      subtotal: 17500,
      cleaning_fee: 800,
      taxes: 2790,
      total: 21090,
      currency: "MXN",
    },
    payment_status: "paid",
    contract_url: "/contracts/booking-1.pdf",
    contract_signed_at: new Date("2026-01-10"),
    notes: "Guest requested early check-in",
    created_at: new Date("2026-01-05"),
  },
  {
    id: "booking-2",
    unit_id: "unit-2",
    guest: {
      name: "Maria Garcia",
      email: "maria.garcia@example.com",
      phone: "+52 998 765 4321",
      nationality: "Mexico",
      guests_count: 4,
    },
    check_in: new Date("2026-01-18"),
    check_out: new Date("2026-01-25"),
    source: "airbnb",
    status: "confirmed",
    pricing: {
      nightly_rate: 3000,
      nights: 7,
      subtotal: 21000,
      cleaning_fee: 1000,
      taxes: 3520,
      total: 25520,
      currency: "MXN",
    },
    payment_status: "paid",
    created_at: new Date("2026-01-08"),
  },
  {
    id: "booking-3",
    unit_id: "unit-1",
    guest: {
      name: "Pierre Dubois",
      email: "pierre.dubois@example.com",
      phone: "+33 1 23 45 67 89",
      nationality: "France",
      guests_count: 2,
      notes: "Honeymoon",
    },
    check_in: new Date("2026-01-25"),
    check_out: new Date("2026-02-01"),
    source: "booking",
    status: "confirmed",
    pricing: {
      nightly_rate: 2500,
      nights: 7,
      subtotal: 17500,
      cleaning_fee: 800,
      taxes: 2790,
      total: 21090,
      currency: "MXN",
    },
    payment_status: "partial",
    created_at: new Date("2026-01-12"),
  },
  {
    id: "booking-4",
    unit_id: "unit-3",
    guest: {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+1 555 987 6543",
      nationality: "Canada",
      guests_count: 3,
    },
    check_in: new Date("2026-02-01"),
    check_out: new Date("2026-02-08"),
    source: "direct",
    status: "pending",
    pricing: {
      nightly_rate: 2800,
      nights: 7,
      subtotal: 19600,
      cleaning_fee: 900,
      taxes: 3200,
      total: 23700,
      currency: "MXN",
    },
    payment_status: "pending",
    created_at: new Date("2026-01-14"),
  },
  {
    id: "booking-5",
    unit_id: "unit-2",
    guest: {
      name: "Carlos Mendez",
      email: "carlos.mendez@example.com",
      phone: "+52 998 555 1234",
      nationality: "Mexico",
      guests_count: 2,
    },
    check_in: new Date("2026-01-10"),
    check_out: new Date("2026-01-14"),
    source: "airbnb",
    status: "checked_out",
    pricing: {
      nightly_rate: 3000,
      nights: 4,
      subtotal: 12000,
      cleaning_fee: 1000,
      taxes: 2080,
      total: 15080,
      currency: "MXN",
    },
    payment_status: "paid",
    created_at: new Date("2025-12-28"),
  },
  {
    id: "booking-6",
    unit_id: "unit-4",
    guest: {
      name: "Anna Schmidt",
      email: "anna.schmidt@example.com",
      phone: "+49 30 12345678",
      nationality: "Germany",
      guests_count: 2,
    },
    check_in: new Date("2026-02-05"),
    check_out: new Date("2026-02-12"),
    source: "booking",
    status: "confirmed",
    pricing: {
      nightly_rate: 3200,
      nights: 7,
      subtotal: 22400,
      cleaning_fee: 1000,
      taxes: 3744,
      total: 27144,
      currency: "MXN",
    },
    payment_status: "paid",
    created_at: new Date("2026-01-15"),
  },
  {
    id: "booking-7",
    unit_id: "unit-1",
    guest: {
      name: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "+1 555 246 8135",
      nationality: "USA",
      guests_count: 4,
    },
    check_in: new Date("2026-02-10"),
    check_out: new Date("2026-02-17"),
    source: "direct",
    status: "confirmed",
    pricing: {
      nightly_rate: 2500,
      nights: 7,
      subtotal: 17500,
      cleaning_fee: 800,
      taxes: 2790,
      total: 21090,
      currency: "MXN",
    },
    payment_status: "paid",
    contract_url: "/contracts/booking-7.pdf",
    contract_signed_at: new Date("2026-02-05"),
    created_at: new Date("2026-01-20"),
  },
  {
    id: "booking-8",
    unit_id: "unit-5",
    guest: {
      name: "Elena Rodriguez",
      email: "elena.rodriguez@example.com",
      phone: "+34 91 123 4567",
      nationality: "Spain",
      guests_count: 2,
    },
    check_in: new Date("2026-01-20"),
    check_out: new Date("2026-01-27"),
    source: "airbnb",
    status: "checked_in",
    pricing: {
      nightly_rate: 2700,
      nights: 7,
      subtotal: 18900,
      cleaning_fee: 850,
      taxes: 3120,
      total: 22870,
      currency: "MXN",
    },
    payment_status: "paid",
    created_at: new Date("2026-01-10"),
  },
  {
    id: "booking-9",
    unit_id: "unit-3",
    guest: {
      name: "Thomas Anderson",
      email: "thomas.a@example.com",
      phone: "+1 555 369 2580",
      nationality: "USA",
      guests_count: 3,
    },
    check_in: new Date("2026-01-28"),
    check_out: new Date("2026-02-04"),
    source: "booking",
    status: "confirmed",
    pricing: {
      nightly_rate: 2800,
      nights: 7,
      subtotal: 19600,
      cleaning_fee: 900,
      taxes: 3200,
      total: 23700,
      currency: "MXN",
    },
    payment_status: "paid",
    created_at: new Date("2026-01-18"),
  },
  {
    id: "booking-10",
    unit_id: "unit-2",
    guest: {
      name: "Yuki Tanaka",
      email: "yuki.tanaka@example.com",
      phone: "+81 3 1234 5678",
      nationality: "Japan",
      guests_count: 2,
    },
    check_in: new Date("2026-02-15"),
    check_out: new Date("2026-02-22"),
    source: "direct",
    status: "confirmed",
    pricing: {
      nightly_rate: 3000,
      nights: 7,
      subtotal: 21000,
      cleaning_fee: 1000,
      taxes: 3520,
      total: 25520,
      currency: "MXN",
    },
    payment_status: "paid",
    contract_url: "/contracts/booking-10.pdf",
    contract_signed_at: new Date("2026-02-10"),
    created_at: new Date("2026-02-01"),
  },
];

// DATABASE FUNCTIONS
// ============================================

// In-memory storage (simulating database)
let bookings = [...mockBookings];

/**
 * Get all bookings
 */
export function getAllBookings(): Booking[] {
  return bookings;
}

/**
 * Get booking by ID
 */
export function getBookingById(id: string): Booking | undefined {
  return bookings.find((b) => b.id === id);
}

/**
 * Get bookings by unit ID
 */
export function getBookingsByUnit(unitId: string): Booking[] {
  return bookings.filter((b) => b.unit_id === unitId);
}

/**
 * Get bookings by status
 */
export function getBookingsByStatus(status: BookingStatus): Booking[] {
  return bookings.filter((b) => b.status === status);
}

/**
 * Get bookings by source
 */
export function getBookingsBySource(source: BookingSource): Booking[] {
  return bookings.filter((b) => b.source === source);
}

/**
 * Get bookings in date range
 */
export function getBookingsInRange(startDate: Date, endDate: Date): Booking[] {
  return bookings.filter(
    (b) =>
      (b.check_in >= startDate && b.check_in <= endDate) ||
      (b.check_out >= startDate && b.check_out <= endDate) ||
      (b.check_in <= startDate && b.check_out >= endDate)
  );
}

/**
 * Get bookings for a specific month
 */
export function getBookingsForMonth(year: number, month: number): Booking[] {
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);
  return getBookingsInRange(startDate, endDate);
}

/**
 * Search bookings by guest name or email
 */
export function searchBookings(query: string): Booking[] {
  const lowerQuery = query.toLowerCase();
  return bookings.filter(
    (b) =>
      b.guest.name.toLowerCase().includes(lowerQuery) ||
      b.guest.email.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Create a new booking
 */
export function createBooking(
  bookingData: Omit<Booking, "id" | "created_at">
): Booking {
  const newBooking: Booking = {
    ...bookingData,
    id: `booking-${generateId()}`,
    created_at: new Date(),
  };
  bookings.push(newBooking);
  return newBooking;
}

/**
 * Update a booking
 */
export function updateBooking(
  id: string,
  updates: Partial<Omit<Booking, "id" | "created_at">>
): Booking | undefined {
  const index = bookings.findIndex((b) => b.id === id);
  if (index === -1) return undefined;

  bookings[index] = {
    ...bookings[index],
    ...updates,
    updated_at: new Date(),
  };
  return bookings[index];
}

/**
 * Delete a booking
 */
export function deleteBooking(id: string): boolean {
  const index = bookings.findIndex((b) => b.id === id);
  if (index === -1) return false;

  bookings.splice(index, 1);
  return true;
}

/**
 * Cancel a booking
 */
export function cancelBooking(id: string): Booking | undefined {
  return updateBooking(id, { status: "cancelled" });
}

/**
 * Check unit availability for date range
 */
export function isUnitAvailable(
  unitId: string,
  checkIn: Date,
  checkOut: Date,
  excludeBookingId?: string
): boolean {
  const conflictingBookings = bookings.filter(
    (b) =>
      b.unit_id === unitId &&
      b.id !== excludeBookingId &&
      b.status !== "cancelled" &&
      b.status !== "checked_out" &&
      ((checkIn >= b.check_in && checkIn < b.check_out) ||
        (checkOut > b.check_in && checkOut <= b.check_out) ||
        (checkIn <= b.check_in && checkOut >= b.check_out))
  );

  return conflictingBookings.length === 0;
}

/**
 * Get upcoming check-ins (next 7 days)
 */
export function getUpcomingCheckIns(): Booking[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekFromNow = new Date(today);
  weekFromNow.setDate(weekFromNow.getDate() + 7);

  return bookings.filter(
    (b) =>
      b.status === "confirmed" &&
      b.check_in >= today &&
      b.check_in <= weekFromNow
  );
}

/**
 * Get upcoming check-outs (next 7 days)
 */
export function getUpcomingCheckOuts(): Booking[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekFromNow = new Date(today);
  weekFromNow.setDate(weekFromNow.getDate() + 7);

  return bookings.filter(
    (b) =>
      (b.status === "confirmed" || b.status === "checked_in") &&
      b.check_out >= today &&
      b.check_out <= weekFromNow
  );
}

/**
 * Get today's check-ins
 */
export function getTodayCheckIns(): Booking[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return bookings.filter(
    (b) =>
      b.status === "confirmed" &&
      b.check_in >= today &&
      b.check_in < tomorrow
  );
}

/**
 * Get today's check-outs
 */
export function getTodayCheckOuts(): Booking[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return bookings.filter(
    (b) =>
      (b.status === "confirmed" || b.status === "checked_in") &&
      b.check_out >= today &&
      b.check_out < tomorrow
  );
}

/**
 * Get active bookings (currently checked in)
 */
export function getActiveBookings(): Booking[] {
  return bookings.filter((b) => b.status === "checked_in");
}

/**
 * Update contract status
 */
export function updateContractStatus(
  id: string,
  status: "not_needed" | "draft" | "sent" | "signed"
): Booking | undefined {
  const updates: any = {
    contract_status: status,
  };

  // If marking as signed, add signed timestamp
  if (status === "signed") {
    updates.contract_signed_at = new Date();
  }

  return updateBooking(id, updates);
}

/**
 * Reset bookings to mock data (for testing)
 */
export function resetBookings(): void {
  bookings = [...mockBookings];
}
