// ============================================
// BOOKING CONFIRMATION LOGIC
// Helper functions to check booking confirmation requirements
// and auto-update booking status when all conditions are met
// ============================================

import { NilaBooking, NilaPayment } from "./types";

export interface BookingConfirmationRequirements {
  paymentsComplete: boolean;
  documentsComplete: boolean;
  contractComplete: boolean;
  allRequirementsMet: boolean;
  missingRequirements: string[];
}

/**
 * Check if all payment requirements are met for a booking
 */
export function checkPaymentRequirements(
  booking: NilaBooking,
  payments: NilaPayment[]
): {
  complete: boolean;
  details: {
    securityDepositPaid: number;
    securityDepositRequired: number;
    rentPaid: number;
    rentRequired: number;
    totalPaid: number;
    totalRequired: number;
  };
} {
  const isLongTerm = booking.booking_type === "long_term";

  // Calculate totals by payment type
  const securityDepositPaid = payments
    .filter((p) => p.payment_type === "security_deposit")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const rentPaid = payments
    .filter((p) => p.payment_type === "rent")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const totalPaid = payments.reduce((sum, p) => sum + Number(p.amount), 0);

  const securityDepositRequired = Number(booking.security_deposit || 0);
  const monthlyRateRequired = Number(booking.monthly_rate || 0);
  const totalRequired = Number(booking.total);

  let complete = false;

  if (isLongTerm) {
    // Long-term: Need security deposit + first month rent
    complete =
      securityDepositPaid >= securityDepositRequired &&
      rentPaid >= monthlyRateRequired;
  } else {
    // Short-term: Need full payment
    complete = totalPaid >= totalRequired;
  }

  return {
    complete,
    details: {
      securityDepositPaid,
      securityDepositRequired,
      rentPaid,
      rentRequired: monthlyRateRequired,
      totalPaid,
      totalRequired: isLongTerm
        ? securityDepositRequired + monthlyRateRequired
        : totalRequired,
    },
  };
}

/**
 * Check if all document requirements are met for a booking
 */
export function checkDocumentRequirements(booking: NilaBooking): {
  complete: boolean;
  hasPassport: boolean;
  hasId: boolean;
} {
  const isLongTerm = booking.booking_type === "long_term";

  // Documents only required for long-term bookings
  if (!isLongTerm) {
    return {
      complete: true,
      hasPassport: false,
      hasId: false,
    };
  }

  const hasPassport = Boolean(booking.guest_passport_url);
  const hasId = Boolean(booking.guest_id_url);

  // At least one document is required (passport OR ID)
  const complete = hasPassport || hasId;

  return {
    complete,
    hasPassport,
    hasId,
  };
}

/**
 * Check if contract requirements are met for a booking
 */
export function checkContractRequirements(booking: NilaBooking): {
  complete: boolean;
  status: string;
} {
  const complete = booking.contract_status === "signed";

  return {
    complete,
    status: booking.contract_status || "not_needed",
  };
}

/**
 * Check all confirmation requirements for a booking
 */
export function checkBookingConfirmationRequirements(
  booking: NilaBooking,
  payments: NilaPayment[]
): BookingConfirmationRequirements {
  const paymentCheck = checkPaymentRequirements(booking, payments);
  const documentCheck = checkDocumentRequirements(booking);
  const contractCheck = checkContractRequirements(booking);

  const missingRequirements: string[] = [];

  if (!paymentCheck.complete) {
    const { details } = paymentCheck;
    if (booking.booking_type === "long_term") {
      if (details.securityDepositPaid < details.securityDepositRequired) {
        missingRequirements.push(
          `Depósito de seguridad (pendiente: ${details.securityDepositRequired - details.securityDepositPaid})`
        );
      }
      if (details.rentPaid < details.rentRequired) {
        missingRequirements.push(
          `Primer mes de renta (pendiente: ${details.rentRequired - details.rentPaid})`
        );
      }
    } else {
      missingRequirements.push(
        `Pago completo (pendiente: ${details.totalRequired - details.totalPaid})`
      );
    }
  }

  if (!documentCheck.complete) {
    missingRequirements.push("Pasaporte o ID del huésped");
  }

  if (!contractCheck.complete) {
    missingRequirements.push("Contrato firmado");
  }

  const allRequirementsMet =
    paymentCheck.complete && documentCheck.complete && contractCheck.complete;

  return {
    paymentsComplete: paymentCheck.complete,
    documentsComplete: documentCheck.complete,
    contractComplete: contractCheck.complete,
    allRequirementsMet,
    missingRequirements,
  };
}

/**
 * Determine if a booking should be auto-confirmed
 * Returns true if all requirements are met and booking is still pending
 */
export function shouldAutoConfirmBooking(
  booking: NilaBooking,
  payments: NilaPayment[]
): boolean {
  // Only auto-confirm if booking is in pending status
  if (booking.status !== "pending") {
    return false;
  }

  const requirements = checkBookingConfirmationRequirements(booking, payments);
  return requirements.allRequirementsMet;
}

/**
 * Get a user-friendly status message for booking confirmation progress
 */
export function getBookingConfirmationStatusMessage(
  booking: NilaBooking,
  payments: NilaPayment[]
): string {
  const requirements = checkBookingConfirmationRequirements(booking, payments);

  if (requirements.allRequirementsMet) {
    return booking.status === "confirmed"
      ? "Reservación confirmada"
      : "Listo para confirmar - todos los requisitos completados";
  }

  if (requirements.missingRequirements.length === 1) {
    return `Falta: ${requirements.missingRequirements[0]}`;
  }

  return `Faltan ${requirements.missingRequirements.length} requisitos`;
}

/**
 * Calculate completion percentage for booking confirmation
 */
export function calculateBookingConfirmationProgress(
  booking: NilaBooking,
  payments: NilaPayment[]
): number {
  const requirements = checkBookingConfirmationRequirements(booking, payments);

  let completed = 0;
  let total = 3; // payments, documents, contract

  if (requirements.paymentsComplete) completed++;
  if (requirements.documentsComplete) completed++;
  if (requirements.contractComplete) completed++;

  return Math.round((completed / total) * 100);
}
