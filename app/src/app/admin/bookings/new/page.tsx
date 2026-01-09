// ============================================
// NEW BOOKING PAGE
// Create a new booking
// ============================================

import { BookingForm } from "@/components/bookings/BookingForm";

export default function NewBookingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-white mb-2">
          Create New Booking
        </h1>
        <p className="text-gray-400">
          Add a new booking to the system
        </p>
      </div>

      <BookingForm mode="create" />
    </div>
  );
}
