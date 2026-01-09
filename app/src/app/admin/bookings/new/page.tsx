// ============================================
// NEW BOOKING PAGE
// Create a new booking
// ============================================

import { getTranslations } from "next-intl/server";
import { BookingForm } from "@/components/bookings/BookingForm";

export default async function NewBookingPage() {
  const t = await getTranslations("bookings");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-white mb-2">
          {t("createNewBooking")}
        </h1>
        <p className="text-gray-400">
          {t("addNewBookingDescription")}
        </p>
      </div>

      <BookingForm mode="create" />
    </div>
  );
}
