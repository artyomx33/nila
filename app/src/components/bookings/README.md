# Booking Confirmation Flow

This module provides components and logic for tracking and auto-confirming bookings based on payment, document, and contract status.

## Features

- **Payment Tracking**: Track security deposits, rent payments, and total payments
- **Document Verification**: Verify passport/ID uploads for long-term bookings
- **Contract Status**: Track contract signing status
- **Visual Progress**: Show completion percentage and checklist
- **Auto-Confirmation**: Automatically confirm bookings when all requirements are met

## Components

### BookingStatusTracker

Visual component that displays a checklist of booking confirmation requirements.

**Props:**
- `booking: NilaBooking` - The booking to track
- `payments: NilaPayment[]` - Array of payments for this booking
- `onRefresh?: () => void` - Optional callback when refresh is clicked

**Example:**
```tsx
import { BookingStatusTracker } from "@/components/bookings";
import { getBookingWithDetails, getPaymentsByBooking } from "@/lib/supabase/queries";

// In your component
const booking = await getBookingWithDetails(bookingId);
const payments = await getPaymentsByBooking(bookingId);

<BookingStatusTracker
  booking={booking}
  payments={payments}
  onRefresh={() => router.refresh()}
/>
```

## Hooks

### useBookingConfirmation

React hook for managing booking confirmation state and auto-updating.

**Options:**
- `booking: NilaBooking` - The booking to track
- `payments: NilaPayment[]` - Array of payments for this booking
- `autoConfirm?: boolean` - Whether to automatically confirm when requirements are met (default: false)
- `onConfirmed?: () => void` - Callback when booking is auto-confirmed

**Returns:**
- `requirements: BookingConfirmationRequirements` - Detailed requirements status
- `statusMessage: string` - User-friendly status message
- `progress: number` - Completion percentage (0-100)
- `canConfirm: boolean` - Whether booking can be confirmed
- `isConfirming: boolean` - Whether confirmation is in progress
- `error: string | null` - Error message if confirmation failed
- `confirmBooking: () => Promise<void>` - Manual confirmation function
- `refresh: () => void` - Refresh requirements calculation

**Example:**
```tsx
import { useBookingConfirmation } from "@/hooks/useBookingConfirmation";

function BookingDetail({ booking, payments }) {
  const {
    requirements,
    progress,
    canConfirm,
    confirmBooking,
    isConfirming,
    error,
  } = useBookingConfirmation({
    booking,
    payments,
    autoConfirm: true, // Auto-confirm when ready
    onConfirmed: () => {
      console.log("Booking confirmed!");
      router.refresh();
    },
  });

  return (
    <div>
      <BookingStatusTracker
        booking={booking}
        payments={payments}
      />

      {canConfirm && (
        <button
          onClick={confirmBooking}
          disabled={isConfirming}
        >
          {isConfirming ? "Confirmando..." : "Confirmar Reservación"}
        </button>
      )}

      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}
```

## Helper Functions

### checkBookingConfirmationRequirements

Check all confirmation requirements for a booking.

```tsx
import { checkBookingConfirmationRequirements } from "@/lib/supabase/booking-confirmation";

const requirements = checkBookingConfirmationRequirements(booking, payments);

console.log(requirements);
// {
//   paymentsComplete: true,
//   documentsComplete: true,
//   contractComplete: false,
//   allRequirementsMet: false,
//   missingRequirements: ["Contrato firmado"]
// }
```

### shouldAutoConfirmBooking

Determine if a booking should be auto-confirmed.

```tsx
import { shouldAutoConfirmBooking } from "@/lib/supabase/booking-confirmation";

const shouldConfirm = shouldAutoConfirmBooking(booking, payments);
// Returns true if all requirements met and status is "pending"
```

### calculateBookingConfirmationProgress

Calculate completion percentage.

```tsx
import { calculateBookingConfirmationProgress } from "@/lib/supabase/booking-confirmation";

const progress = calculateBookingConfirmationProgress(booking, payments);
// Returns number 0-100
```

## Payment Queries

### getBookingPaymentSummary

Get a summary of all payments by type.

```tsx
import { getBookingPaymentSummary } from "@/lib/supabase/queries";

const summary = await getBookingPaymentSummary(bookingId);

console.log(summary);
// {
//   total: 45000,
//   security_deposit: 15000,
//   rent: 30000,
//   reservation_deposit: 0,
//   cleaning: 0,
//   utilities: 0,
//   other: 0
// }
```

### getTotalPaymentsByType

Get total amount paid for a specific payment type.

```tsx
import { getTotalPaymentsByType } from "@/lib/supabase/queries";

const depositPaid = await getTotalPaymentsByType(bookingId, "security_deposit");
// Returns number
```

## Booking Confirmation Requirements

### Short-term Bookings

Requirements:
1. Full payment received (total >= booking.total)
2. Contract signed (contract_status === "signed")

### Long-term Bookings

Requirements:
1. Security deposit paid (total security_deposit payments >= booking.security_deposit)
2. First month rent paid (total rent payments >= booking.monthly_rate)
3. Documents uploaded (guest_passport_url OR guest_id_url exists)
4. Contract signed (contract_status === "signed")

## Auto-Confirmation Flow

When all requirements are met and the booking status is "pending":

1. Hook detects requirements are complete
2. If `autoConfirm: true`, automatically calls `updateBooking(id, { status: "confirmed" })`
3. Triggers `onConfirmed` callback
4. Updates UI to show confirmed status

## Integration Example

Complete example of integrating the booking confirmation flow into a booking detail page:

```tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BookingStatusTracker } from "@/components/bookings";
import { useBookingConfirmation } from "@/hooks/useBookingConfirmation";
import { getBookingById, getPaymentsByBooking } from "@/lib/supabase/queries";
import type { NilaBooking, NilaPayment } from "@/lib/supabase/types";

export default function BookingDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [booking, setBooking] = useState<NilaBooking | null>(null);
  const [payments, setPayments] = useState<NilaPayment[]>([]);
  const [loading, setLoading] = useState(true);

  // Load booking and payments
  useEffect(() => {
    async function loadData() {
      try {
        const [bookingData, paymentsData] = await Promise.all([
          getBookingById(params.id),
          getPaymentsByBooking(params.id),
        ]);
        setBooking(bookingData);
        setPayments(paymentsData);
      } catch (error) {
        console.error("Error loading booking:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [params.id]);

  // Use confirmation hook
  const {
    requirements,
    progress,
    canConfirm,
    confirmBooking,
    isConfirming,
    error,
  } = useBookingConfirmation({
    booking: booking!,
    payments,
    autoConfirm: false, // Manual confirmation in this example
    onConfirmed: () => {
      router.refresh();
      // Could also show a success toast here
    },
  });

  if (loading) return <div>Loading...</div>;
  if (!booking) return <div>Booking not found</div>;

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Main content */}
      <div className="col-span-2">
        {/* Booking details here */}
      </div>

      {/* Sidebar with status tracker */}
      <div className="space-y-6">
        <BookingStatusTracker
          booking={booking}
          payments={payments}
          onRefresh={() => router.refresh()}
        />

        {/* Manual confirmation button */}
        {canConfirm && booking.status === "pending" && (
          <button
            onClick={confirmBooking}
            disabled={isConfirming}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {isConfirming ? "Confirmando..." : "Confirmar Reservación"}
          </button>
        )}

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Progress summary */}
        <div className="text-sm text-gray-600">
          <p>Progreso: {progress}%</p>
          {requirements.missingRequirements.length > 0 && (
            <ul className="mt-2 space-y-1">
              {requirements.missingRequirements.map((req, i) => (
                <li key={i} className="text-red-600">• {req}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
```

## Database Schema

The booking confirmation flow relies on these database fields:

**NILA_bookings:**
- `status` - Booking status (pending, confirmed, checked_in, checked_out, cancelled)
- `booking_type` - Type of booking (short_term, long_term)
- `security_deposit` - Required security deposit amount
- `monthly_rate` - Monthly rent for long-term bookings
- `total` - Total amount for short-term bookings
- `deposit_status` - Security deposit status (pending, received, partially_returned, returned)
- `contract_status` - Contract status (not_needed, draft, sent, signed)
- `guest_passport_url` - URL to uploaded passport
- `guest_id_url` - URL to uploaded ID
- `currency` - Currency code (USD, MXN)

**NILA_payments:**
- `booking_id` - Foreign key to booking
- `amount` - Payment amount
- `currency` - Currency code
- `payment_type` - Type of payment (security_deposit, rent, reservation_deposit, cleaning, utilities, damage, refund, other)
- `method` - Payment method
- `paid_at` - Payment timestamp

## Styling

The components use Tailwind CSS classes and follow the existing design system. Key color schemes:

- **Green**: Completed items, success states
- **Yellow**: Pending items, warnings
- **Red**: Missing requirements, errors
- **Teal**: Primary actions, progress bars
- **Gray**: Default states, borders

## Future Enhancements

Potential improvements:
1. Email notifications when booking is auto-confirmed
2. Webhook support for payment integrations
3. Partial payment tracking with installment support
4. Document verification with AI (OCR for passport/ID)
5. Contract e-signature integration
6. Payment reminders and automated follow-ups
7. Multi-currency support with exchange rates
