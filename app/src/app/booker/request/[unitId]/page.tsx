"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
          Unidad no encontrada
        </h2>
        <button
          onClick={() => router.push("/booker/browse")}
          className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
        >
          Volver a buscar
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
      alert("Hubo un error al crear la reservación. Por favor intenta de nuevo.");
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
        Volver a buscar
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Solicita tu Reservación
            </h1>
            <p className="text-gray-600 mb-6">
              Completa tus datos para solicitar la reservación de {unit.name}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Guest Information */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Información del Huésped
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Juan Pérez"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="juan@ejemplo.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="+52 998 123 4567"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nacionalidad *
                    </label>
                    <input
                      type="text"
                      value={guestNationality}
                      onChange={(e) => setGuestNationality(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="México"
                    />
                  </div>
                </div>
              </div>

              {/* Stay Details */}
              <div className="pt-6 border-t border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Detalles de la Estadía
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Llegada *
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
                      Salida *
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
                      Número de huéspedes *
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "huésped" : "huéspedes"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="pt-6 border-t border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notas adicionales (opcional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Alguna petición especial o información adicional..."
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
                  {isSubmitting ? "Enviando..." : "Solicitar Reservación"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Summary Sidebar */}
        <div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Resumen de Reservación
            </h2>

            {/* Unit Info */}
            <div className="mb-4 pb-4 border-b border-gray-200">
              <div className="h-32 bg-gradient-to-br from-teal-100 to-blue-100 rounded-lg mb-3 flex items-center justify-center">
                <span className="text-4xl">🏠</span>
              </div>
              <h3 className="font-semibold text-gray-900">{unit.name}</h3>
              <p className="text-sm text-gray-600 capitalize">{unit.type}</p>
              <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                <span>{unit.bedrooms} rec</span>
                <span>•</span>
                <span>{unit.bathrooms} baños</span>
              </div>
            </div>

            {/* Stay details */}
            {checkIn && checkOut && (
              <>
                <div className="mb-4 pb-4 border-b border-gray-200 text-sm">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Llegada</span>
                    <span className="text-gray-900 font-medium">
                      {new Date(checkIn).toLocaleDateString("es-MX")}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Salida</span>
                    <span className="text-gray-900 font-medium">
                      {new Date(checkOut).toLocaleDateString("es-MX")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Huéspedes</span>
                    <span className="text-gray-900 font-medium">{guests}</span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="mb-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {nights} {nights === 1 ? "noche" : "noches"} ×{" "}
                      {formatCurrency(nightlyRate, unit.pricing.currency)}
                    </span>
                    <span className="text-gray-900">
                      {formatCurrency(subtotal, unit.pricing.currency)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tarifa de limpieza</span>
                    <span className="text-gray-900">
                      {formatCurrency(cleaningFee, unit.pricing.currency)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Impuestos (16%)</span>
                    <span className="text-gray-900">
                      {formatCurrency(taxes, unit.pricing.currency)}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">
                      Total
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
