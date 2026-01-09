"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { getUnitById } from "@/lib/db/units";
import { createBooking } from "@/lib/db/bookings";
import { formatCurrency, calculateNights } from "@/lib/utils";

export default function BookingRequestPage({
  params,
}: {
  params: { unitId: string };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("booker");
  const unit = getUnitById(params.unitId);

  // Get params from URL
  const checkInParam = searchParams.get("checkIn") || "";
  const checkOutParam = searchParams.get("checkOut") || "";
  const guestsParam = searchParams.get("guests") || "2";

  // Form state
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestNationality, setGuestNationality] = useState("");
  const [checkIn, setCheckIn] = useState(checkInParam);
  const [checkOut, setCheckOut] = useState(checkOutParam);
  const [guests, setGuests] = useState(Number(guestsParam));
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!unit) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t("unitNotFound")}
        </h2>
        <button
          onClick={() => router.push("/booker/browse")}
          className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
        >
          {t("backToSearch")}
        </button>
      </div>
    );
  }

  // Calculate pricing
  const nights = checkIn && checkOut ? calculateNights(checkIn, checkOut) : 0;
  const nightlyRate = unit.pricing.base;
  const subtotal = nights * nightlyRate;
  const cleaningFee = unit.pricing.cleaning_fee;
  const taxes = Math.round((subtotal + cleaningFee) * 0.16); // 16% tax
  const total = subtotal + cleaningFee + taxes;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create booking
      const booking = createBooking({
        unit_id: unit.id,
        guest: {
          name: guestName,
          email: guestEmail,
          phone: guestPhone,
          nationality: guestNationality,
          guests_count: guests,
          notes: notes || undefined,
        },
        check_in: new Date(checkIn),
        check_out: new Date(checkOut),
        source: "direct",
        status: "pending",
        pricing: {
          nightly_rate: nightlyRate,
          nights,
          subtotal,
          cleaning_fee: cleaningFee,
          taxes,
          total,
          currency: unit.pricing.currency,
        },
        payment_status: "pending",
      });

      // Redirect to confirmation
      router.push(`/booker/confirmation?bookingId=${booking.id}`);
    } catch (error) {
      console.error("Error creating booking:", error);
      alert(t("errorCreatingBooking"));
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    guestName &&
    guestEmail &&
    guestPhone &&
    guestNationality &&
    checkIn &&
    checkOut &&
    guests > 0;

  return (
    <div>
      <button
        onClick={() => router.push("/booker/browse")}
        className="text-sm text-gray-600 hover:text-gray-900 mb-4 flex items-center"
      >
        <svg
          className="w-4 h-4 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        {t("backToSearch")}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {t("requestBooking")}
            </h1>
            <p className="text-gray-600 mb-6">
              {t("completeDetails", { unitName: unit.name })}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Guest Information */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  {t("guestInformation")}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("fullName")} *
                    </label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder={t("fullNamePlaceholder")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("email")} *
                    </label>
                    <input
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder={t("emailPlaceholder")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("phone")} *
                    </label>
                    <input
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder={t("phonePlaceholder")}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("nationality")} *
                    </label>
                    <input
                      type="text"
                      value={guestNationality}
                      onChange={(e) => setGuestNationality(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder={t("nationalityPlaceholder")}
                    />
                  </div>
                </div>
              </div>

              {/* Stay Details */}
              <div className="pt-6 border-t border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  {t("stayDetails")}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("checkIn")} *
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("checkOut")} *
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      required
                      min={checkIn || new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("numberOfGuests")} *
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? t("guestSingular") : t("guestPlural")}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="pt-6 border-t border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("additionalNotes")}
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder={t("additionalNotesPlaceholder")}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${
                    !isFormValid || isSubmitting
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-teal-500 hover:bg-teal-600"
                  }`}
                >
                  {isSubmitting ? t("submitting") : t("submitRequest")}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Summary Sidebar */}
        <div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {t("bookingSummary")}
            </h2>

            {/* Unit Info */}
            <div className="mb-4 pb-4 border-b border-gray-200">
              <div className="h-32 bg-gradient-to-br from-teal-100 to-blue-100 rounded-lg mb-3 flex items-center justify-center">
                <span className="text-4xl">🏠</span>
              </div>
              <h3 className="font-semibold text-gray-900">{unit.name}</h3>
              <p className="text-sm text-gray-600 capitalize">{unit.type}</p>
              <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                <span>{unit.bedrooms} {t("bedrooms")}</span>
                <span>•</span>
                <span>{unit.bathrooms} {t("bathrooms")}</span>
              </div>
            </div>

            {/* Stay details */}
            {checkIn && checkOut && (
              <>
                <div className="mb-4 pb-4 border-b border-gray-200 text-sm">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">{t("checkIn")}</span>
                    <span className="text-gray-900 font-medium">
                      {new Date(checkIn).toLocaleDateString("es-MX")}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">{t("checkOut")}</span>
                    <span className="text-gray-900 font-medium">
                      {new Date(checkOut).toLocaleDateString("es-MX")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t("guests")}</span>
                    <span className="text-gray-900 font-medium">{guests}</span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="mb-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {nights} {nights === 1 ? t("nightSingular") : t("nightPlural")} ×{" "}
                      {formatCurrency(nightlyRate, unit.pricing.currency)}
                    </span>
                    <span className="text-gray-900">
                      {formatCurrency(subtotal, unit.pricing.currency)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t("cleaningFee")}</span>
                    <span className="text-gray-900">
                      {formatCurrency(cleaningFee, unit.pricing.currency)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t("taxes")}</span>
                    <span className="text-gray-900">
                      {formatCurrency(taxes, unit.pricing.currency)}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">
                      {t("total")}
                    </span>
                    <span className="text-2xl font-bold text-teal-600">
                      {formatCurrency(total, unit.pricing.currency)}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
