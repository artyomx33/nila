// ============================================
// NILA ESTATE MANAGEMENT - PAYMENTS DATABASE
// Payment recording and tracking module
// ============================================

import { Payment, PaymentType, PaymentMethod } from "@/types";
import { generateId } from "@/lib/utils";

// MOCK PAYMENTS DATA
// ============================================

export const mockPayments: Payment[] = [
  {
    id: "payment-1",
    booking_id: "booking-1",
    amount: 21090,
    currency: "MXN",
    payment_type: "reservation_deposit",
    method: "transfer",
    reference: "TXN123456789",
    paid_at: new Date("2026-01-10"),
    created_at: new Date("2026-01-10"),
  },
  {
    id: "payment-2",
    booking_id: "booking-2",
    amount: 25520,
    currency: "MXN",
    payment_type: "reservation_deposit",
    method: "card",
    reference: "AIRBNB-2026-01-08",
    paid_at: new Date("2026-01-08"),
    created_at: new Date("2026-01-08"),
  },
  {
    id: "payment-3",
    booking_id: "booking-3",
    amount: 10000,
    currency: "MXN",
    payment_type: "reservation_deposit",
    method: "transfer",
    paid_at: new Date("2026-01-12"),
    created_at: new Date("2026-01-12"),
  },
  {
    id: "payment-4",
    booking_id: "booking-5",
    amount: 15080,
    currency: "MXN",
    payment_type: "reservation_deposit",
    method: "card",
    reference: "AIRBNB-2025-12-28",
    paid_at: new Date("2025-12-28"),
    created_at: new Date("2025-12-28"),
  },
  {
    id: "payment-5",
    booking_id: "booking-6",
    amount: 27144,
    currency: "MXN",
    payment_type: "reservation_deposit",
    method: "card",
    reference: "BOOKING-2026-01-15",
    paid_at: new Date("2026-01-15"),
    created_at: new Date("2026-01-15"),
  },
  {
    id: "payment-6",
    booking_id: "booking-7",
    amount: 21090,
    currency: "MXN",
    payment_type: "reservation_deposit",
    method: "transfer",
    reference: "TXN987654321",
    paid_at: new Date("2026-02-05"),
    created_at: new Date("2026-02-05"),
  },
  {
    id: "payment-7",
    booking_id: "booking-8",
    amount: 22870,
    currency: "MXN",
    payment_type: "reservation_deposit",
    method: "card",
    reference: "AIRBNB-2026-01-10",
    paid_at: new Date("2026-01-10"),
    created_at: new Date("2026-01-10"),
  },
  {
    id: "payment-8",
    booking_id: "booking-9",
    amount: 23700,
    currency: "MXN",
    payment_type: "reservation_deposit",
    method: "card",
    reference: "BOOKING-2026-01-18",
    paid_at: new Date("2026-01-18"),
    created_at: new Date("2026-01-18"),
  },
  {
    id: "payment-9",
    booking_id: "booking-10",
    amount: 25520,
    currency: "MXN",
    payment_type: "reservation_deposit",
    method: "transfer",
    reference: "TXN456789123",
    paid_at: new Date("2026-02-10"),
    created_at: new Date("2026-02-10"),
  },
];

// DATABASE FUNCTIONS
// ============================================

// In-memory storage (simulating database)
let payments = [...mockPayments];

/**
 * Get all payments
 */
export function getAllPayments(): Payment[] {
  return payments;
}

/**
 * Get payment by ID
 */
export function getPaymentById(id: string): Payment | undefined {
  return payments.find((p) => p.id === id);
}

/**
 * Get payments by booking ID
 */
export function getPaymentsByBooking(bookingId: string): Payment[] {
  return payments
    .filter((p) => p.booking_id === bookingId)
    .sort((a, b) => b.paid_at.getTime() - a.paid_at.getTime());
}

/**
 * Get payments by type
 */
export function getPaymentsByType(type: PaymentType): Payment[] {
  return payments.filter((p) => p.payment_type === type);
}

/**
 * Get payments by method
 */
export function getPaymentsByMethod(method: PaymentMethod): Payment[] {
  return payments.filter((p) => p.method === method);
}

/**
 * Get payments in date range
 */
export function getPaymentsInRange(startDate: Date, endDate: Date): Payment[] {
  return payments.filter(
    (p) => p.paid_at >= startDate && p.paid_at <= endDate
  );
}

/**
 * Calculate total paid for a booking
 */
export function getTotalPaidForBooking(bookingId: string): number {
  return payments
    .filter((p) => p.booking_id === bookingId)
    .reduce((total, payment) => {
      // Handle refunds as negative amounts
      if (payment.payment_type === "refund") {
        return total - payment.amount;
      }
      return total + payment.amount;
    }, 0);
}

/**
 * Create a new payment
 */
export function createPayment(
  paymentData: Omit<Payment, "id" | "created_at">
): Payment {
  const newPayment: Payment = {
    ...paymentData,
    id: `payment-${generateId()}`,
    created_at: new Date(),
  };
  payments.push(newPayment);
  return newPayment;
}

/**
 * Update a payment
 */
export function updatePayment(
  id: string,
  updates: Partial<Omit<Payment, "id" | "created_at" | "booking_id">>
): Payment | undefined {
  const index = payments.findIndex((p) => p.id === id);
  if (index === -1) return undefined;

  payments[index] = {
    ...payments[index],
    ...updates,
  };
  return payments[index];
}

/**
 * Delete a payment
 */
export function deletePayment(id: string): boolean {
  const index = payments.findIndex((p) => p.id === id);
  if (index === -1) return false;

  payments.splice(index, 1);
  return true;
}

/**
 * Get payment summary for a booking
 */
export function getPaymentSummary(bookingId: string): {
  total_paid: number;
  payment_count: number;
  last_payment_date: Date | null;
  payments_by_type: Record<PaymentType, number>;
} {
  const bookingPayments = getPaymentsByBooking(bookingId);

  const total_paid = getTotalPaidForBooking(bookingId);

  const payments_by_type: Record<PaymentType, number> = {
    reservation_deposit: 0,
    security_deposit: 0,
    rent: 0,
    cleaning: 0,
    utilities: 0,
    damage: 0,
    refund: 0,
    other: 0,
  };

  bookingPayments.forEach((payment) => {
    payments_by_type[payment.payment_type] += payment.amount;
  });

  return {
    total_paid,
    payment_count: bookingPayments.length,
    last_payment_date: bookingPayments.length > 0 ? bookingPayments[0].paid_at : null,
    payments_by_type,
  };
}

/**
 * Reset payments to mock data (for testing)
 */
export function resetPayments(): void {
  payments = [...mockPayments];
}
