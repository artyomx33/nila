// ============================================
// BOOKING CONFIRMATION - USAGE EXAMPLES
// Examples and test scenarios for the booking confirmation flow
// ============================================

import type { NilaBooking, NilaPayment } from "./types";

/**
 * Example test data for short-term booking confirmation
 */
export const shortTermBookingExample: NilaBooking = {
  id: "booking-123",
  unit_id: "unit-456",
  guest_name: "John Doe",
  guest_email: "john@example.com",
  guest_phone: "+1234567890",
  guest_nationality: "USA",
  guests_count: 2,
  check_in: "2026-02-01",
  check_out: "2026-02-05",
  source: "direct",
  status: "pending",
  booking_type: "short_term",
  nightly_rate: 1500,
  subtotal: 6000,
  cleaning_fee: 500,
  taxes: 650,
  total: 7150,
  currency: "MXN",
  payment_status: "pending",
  contract_status: "sent",
  created_at: "2026-01-09T00:00:00Z",
  updated_at: "2026-01-09T00:00:00Z",
} as NilaBooking;

/**
 * Example test data for long-term booking confirmation
 */
export const longTermBookingExample: NilaBooking = {
  id: "booking-789",
  unit_id: "unit-456",
  guest_name: "Jane Smith",
  guest_email: "jane@example.com",
  guest_phone: "+1234567890",
  guest_nationality: "Canada",
  guests_count: 1,
  check_in: "2026-02-01",
  check_out: "2026-08-01",
  source: "direct",
  status: "pending",
  booking_type: "long_term",
  monthly_rate: 25000,
  security_deposit: 25000,
  total: 150000, // 6 months
  currency: "MXN",
  payment_status: "partial",
  deposit_status: "pending",
  contract_status: "sent",
  guest_passport_url: null,
  guest_id_url: null,
  created_at: "2026-01-09T00:00:00Z",
  updated_at: "2026-01-09T00:00:00Z",
} as NilaBooking;

/**
 * Example payments for short-term booking (COMPLETE)
 */
export const shortTermPaymentsComplete: NilaPayment[] = [
  {
    id: "payment-1",
    booking_id: "booking-123",
    amount: 7150,
    currency: "MXN",
    payment_type: "rent",
    method: "transfer",
    paid_at: "2026-01-09T10:00:00Z",
    created_at: "2026-01-09T10:00:00Z",
  } as NilaPayment,
];

/**
 * Example payments for short-term booking (PARTIAL)
 */
export const shortTermPaymentsPartial: NilaPayment[] = [
  {
    id: "payment-1",
    booking_id: "booking-123",
    amount: 3000,
    currency: "MXN",
    payment_type: "reservation_deposit",
    method: "card",
    paid_at: "2026-01-09T10:00:00Z",
    created_at: "2026-01-09T10:00:00Z",
  } as NilaPayment,
];

/**
 * Example payments for long-term booking (COMPLETE)
 */
export const longTermPaymentsComplete: NilaPayment[] = [
  {
    id: "payment-1",
    booking_id: "booking-789",
    amount: 25000,
    currency: "MXN",
    payment_type: "security_deposit",
    method: "transfer",
    paid_at: "2026-01-09T10:00:00Z",
    created_at: "2026-01-09T10:00:00Z",
  } as NilaPayment,
  {
    id: "payment-2",
    booking_id: "booking-789",
    amount: 25000,
    currency: "MXN",
    payment_type: "rent",
    method: "transfer",
    paid_at: "2026-01-09T11:00:00Z",
    created_at: "2026-01-09T11:00:00Z",
  } as NilaPayment,
];

/**
 * Example payments for long-term booking (PARTIAL - only deposit)
 */
export const longTermPaymentsPartial: NilaPayment[] = [
  {
    id: "payment-1",
    booking_id: "booking-789",
    amount: 25000,
    currency: "MXN",
    payment_type: "security_deposit",
    method: "transfer",
    paid_at: "2026-01-09T10:00:00Z",
    created_at: "2026-01-09T10:00:00Z",
  } as NilaPayment,
];

/**
 * Example: Check if short-term booking can be confirmed
 *
 * Required:
 * - Full payment (7150 MXN)
 * - Contract signed
 */
export function exampleShortTermCheck() {
  const booking = { ...shortTermBookingExample };
  const payments = shortTermPaymentsComplete;

  // Scenario 1: Payments complete but contract not signed
  booking.contract_status = "sent";
  // Result: Cannot confirm (missing contract)

  // Scenario 2: Payments complete and contract signed
  booking.contract_status = "signed";
  // Result: CAN CONFIRM ✓

  // Scenario 3: Partial payment and contract signed
  booking.contract_status = "signed";
  const partialPayments = shortTermPaymentsPartial;
  // Result: Cannot confirm (missing 4150 MXN)
}

/**
 * Example: Check if long-term booking can be confirmed
 *
 * Required:
 * - Security deposit paid (25000 MXN)
 * - First month rent paid (25000 MXN)
 * - Documents uploaded (passport OR ID)
 * - Contract signed
 */
export function exampleLongTermCheck() {
  const booking = { ...longTermBookingExample };
  const payments = longTermPaymentsComplete;

  // Scenario 1: All payments, no documents, no contract
  booking.guest_passport_url = null;
  booking.contract_status = "sent";
  // Result: Cannot confirm (missing documents + contract)

  // Scenario 2: All payments, documents uploaded, no contract
  booking.guest_passport_url = "https://storage.example.com/passport.jpg";
  booking.contract_status = "sent";
  // Result: Cannot confirm (missing contract)

  // Scenario 3: All payments, documents uploaded, contract signed
  booking.guest_passport_url = "https://storage.example.com/passport.jpg";
  booking.contract_status = "signed";
  // Result: CAN CONFIRM ✓

  // Scenario 4: Only deposit paid, documents uploaded, contract signed
  const partialPayments = longTermPaymentsPartial;
  booking.guest_passport_url = "https://storage.example.com/passport.jpg";
  booking.contract_status = "signed";
  // Result: Cannot confirm (missing first month rent)
}

/**
 * Example: Auto-confirmation flow
 */
export function exampleAutoConfirmFlow() {
  // Step 1: Guest creates booking
  const booking = { ...shortTermBookingExample, status: "pending" };

  // Step 2: Guest makes payment
  const payments = shortTermPaymentsComplete;

  // Step 3: Guest signs contract
  booking.contract_status = "signed";

  // Step 4: System automatically confirms booking
  // - useBookingConfirmation hook detects all requirements met
  // - Calls updateBooking(booking.id, { status: "confirmed" })
  // - Triggers onConfirmed callback
  // - Updates UI

  // Step 5: Booking is now confirmed
  booking.status = "confirmed";
}

/**
 * Example: Manual confirmation flow
 */
export function exampleManualConfirmFlow() {
  // Step 1: Admin reviews booking
  const booking = { ...shortTermBookingExample, status: "pending" };
  const payments = shortTermPaymentsComplete;
  booking.contract_status = "signed";

  // Step 2: Admin sees "Ready to confirm" notification
  // BookingStatusTracker shows 100% complete with green checkmarks

  // Step 3: Admin clicks "Confirm Booking" button
  // Component calls confirmBooking() from useBookingConfirmation hook

  // Step 4: Booking status updated to "confirmed"
  booking.status = "confirmed";
}
