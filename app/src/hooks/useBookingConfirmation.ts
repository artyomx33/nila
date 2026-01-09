// ============================================
// USE BOOKING CONFIRMATION HOOK
// React hook for managing booking confirmation state
// Automatically updates booking status when requirements are met
// ============================================

import { useEffect, useState, useCallback } from "react";
import { NilaBooking, NilaPayment } from "@/lib/supabase/types";
import {
  checkBookingConfirmationRequirements,
  shouldAutoConfirmBooking,
  getBookingConfirmationStatusMessage,
  calculateBookingConfirmationProgress,
  type BookingConfirmationRequirements,
} from "@/lib/supabase/booking-confirmation";
import { updateBooking } from "@/lib/supabase/queries";

interface UseBookingConfirmationOptions {
  booking: NilaBooking;
  payments: NilaPayment[];
  autoConfirm?: boolean; // Whether to automatically confirm when requirements are met
  onConfirmed?: () => void; // Callback when booking is auto-confirmed
}

interface UseBookingConfirmationReturn {
  requirements: BookingConfirmationRequirements;
  statusMessage: string;
  progress: number;
  canConfirm: boolean;
  isConfirming: boolean;
  error: string | null;
  confirmBooking: () => Promise<void>;
  refresh: () => void;
}

/**
 * Hook to manage booking confirmation state and auto-update
 *
 * Usage:
 * ```tsx
 * const { requirements, progress, canConfirm, confirmBooking } = useBookingConfirmation({
 *   booking,
 *   payments,
 *   autoConfirm: true, // Auto-confirm when all requirements met
 *   onConfirmed: () => router.refresh(),
 * });
 * ```
 */
export function useBookingConfirmation({
  booking,
  payments,
  autoConfirm = false,
  onConfirmed,
}: UseBookingConfirmationOptions): UseBookingConfirmationReturn {
  const [isConfirming, setIsConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasAutoConfirmed, setHasAutoConfirmed] = useState(false);

  // Calculate requirements
  const requirements = checkBookingConfirmationRequirements(booking, payments);
  const statusMessage = getBookingConfirmationStatusMessage(booking, payments);
  const progress = calculateBookingConfirmationProgress(booking, payments);
  const canConfirm = shouldAutoConfirmBooking(booking, payments);

  // Manual confirmation function
  const confirmBooking = useCallback(async () => {
    if (!canConfirm) {
      setError("No se puede confirmar: faltan requisitos");
      return;
    }

    setIsConfirming(true);
    setError(null);

    try {
      await updateBooking(booking.id, {
        status: "confirmed",
      });

      if (onConfirmed) {
        onConfirmed();
      }
    } catch (err) {
      console.error("Error confirming booking:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Error al confirmar la reservación"
      );
    } finally {
      setIsConfirming(false);
    }
  }, [booking.id, canConfirm, onConfirmed]);

  // Auto-confirm effect
  useEffect(() => {
    // Only auto-confirm if:
    // 1. autoConfirm is enabled
    // 2. We haven't already auto-confirmed
    // 3. Booking can be confirmed
    // 4. Not already confirming
    if (autoConfirm && !hasAutoConfirmed && canConfirm && !isConfirming) {
      setHasAutoConfirmed(true);
      confirmBooking();
    }
  }, [autoConfirm, hasAutoConfirmed, canConfirm, isConfirming, confirmBooking]);

  // Reset auto-confirm flag if booking status changes back to pending
  useEffect(() => {
    if (booking.status === "pending" && hasAutoConfirmed) {
      setHasAutoConfirmed(false);
    }
  }, [booking.status, hasAutoConfirmed]);

  // Refresh function to recalculate requirements
  const refresh = useCallback(() => {
    // Trigger re-calculation by resetting error
    setError(null);
  }, []);

  return {
    requirements,
    statusMessage,
    progress,
    canConfirm,
    isConfirming,
    error,
    confirmBooking,
    refresh,
  };
}
