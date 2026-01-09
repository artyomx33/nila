"use client";

import { useState } from "react";
import { CalendarTimeline } from "@/components/calendar";
import { getAllBookings } from "@/lib/db/bookings";
import { getAllUnits } from "@/lib/db/units";
import { Booking } from "@/types";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"month" | "week">("month");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Get units and bookings
  const units = getAllUnits().map((u) => ({ id: u.id, name: u.name }));
  const allBookings = getAllBookings();

  // Calculate date range based on view mode
  const getDateRange = () => {
    const start = new Date(currentDate);
    const end = new Date(currentDate);

    if (viewMode === "month") {
      start.setDate(1);
      end.setMonth(end.getMonth() + 1);
      end.setDate(0);
    } else {
      // Week view
      const dayOfWeek = start.getDay();
      start.setDate(start.getDate() - dayOfWeek);
      end.setDate(start.getDate() + 6);
    }

    return { start, end };
  };

  const { start: startDate, end: endDate } = getDateRange();

  // Filter bookings for the current view
  const visibleBookings = allBookings.filter((booking) => {
    const checkIn = new Date(booking.check_in);
    const checkOut = new Date(booking.check_out);
    return (
      (checkIn >= startDate && checkIn <= endDate) ||
      (checkOut >= startDate && checkOut <= endDate) ||
      (checkIn <= startDate && checkOut >= endDate)
    );
  });

  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "month") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setDate(newDate.getDate() - 7);
    }
    setCurrentDate(newDate);
  };

  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "month") {
      newDate.setMonth(newDate.getMonth() + 1);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
  };

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Calendario</h1>
            <p className="text-sm text-gray-500 mt-1">
              Vista de reservaciones por unidad
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View toggle */}
            <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
              <button
                onClick={() => setViewMode("month")}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  viewMode === "month"
                    ? "bg-teal-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Mes
              </button>
              <button
                onClick={() => setViewMode("week")}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  viewMode === "week"
                    ? "bg-teal-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Semana
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={goToPrevious}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              ← Anterior
            </button>
            <button
              onClick={goToToday}
              className="px-4 py-2 text-sm font-medium text-teal-600 bg-teal-50 border border-teal-200 rounded-lg hover:bg-teal-100 transition-colors"
            >
              Hoy
            </button>
            <button
              onClick={goToNext}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Siguiente →
            </button>
          </div>

          <div className="text-lg font-semibold text-gray-900">
            {currentMonth} {currentYear}
          </div>
        </div>
      </div>

      {/* Calendar */}
      <CalendarTimeline
        units={units}
        bookings={visibleBookings}
        startDate={startDate}
        endDate={endDate}
        onBookingClick={handleBookingClick}
      />

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedBooking(null)}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedBooking.guest.name}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Reservación #{selectedBooking.id}
                </p>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {/* Guest info */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Información del Huésped
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Email:</span>
                    <span className="ml-2 text-gray-900">
                      {selectedBooking.guest.email}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Teléfono:</span>
                    <span className="ml-2 text-gray-900">
                      {selectedBooking.guest.phone}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Nacionalidad:</span>
                    <span className="ml-2 text-gray-900">
                      {selectedBooking.guest.nationality}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Huéspedes:</span>
                    <span className="ml-2 text-gray-900">
                      {selectedBooking.guest.guests_count}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stay details */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Detalles de la Estadía
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Check-in:</span>
                    <span className="ml-2 text-gray-900">
                      {new Date(selectedBooking.check_in).toLocaleDateString(
                        "es-MX"
                      )}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Check-out:</span>
                    <span className="ml-2 text-gray-900">
                      {new Date(selectedBooking.check_out).toLocaleDateString(
                        "es-MX"
                      )}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Noches:</span>
                    <span className="ml-2 text-gray-900">
                      {selectedBooking.pricing.nights}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Fuente:</span>
                    <span className="ml-2 text-gray-900 capitalize">
                      {selectedBooking.source === "booking"
                        ? "Booking.com"
                        : selectedBooking.source}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Desglose de Precios
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      {selectedBooking.pricing.nights} noches × $
                      {selectedBooking.pricing.nightly_rate.toLocaleString()}
                    </span>
                    <span className="text-gray-900">
                      ${selectedBooking.pricing.subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tarifa de limpieza</span>
                    <span className="text-gray-900">
                      ${selectedBooking.pricing.cleaning_fee.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Impuestos</span>
                    <span className="text-gray-900">
                      ${selectedBooking.pricing.taxes.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200 font-semibold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">
                      ${selectedBooking.pricing.total.toLocaleString()}{" "}
                      {selectedBooking.pricing.currency}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status badges */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    selectedBooking.status === "confirmed"
                      ? "bg-teal-100 text-teal-800"
                      : selectedBooking.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : selectedBooking.status === "checked_in"
                      ? "bg-blue-100 text-blue-800"
                      : selectedBooking.status === "checked_out"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedBooking.status === "confirmed"
                    ? "Confirmada"
                    : selectedBooking.status === "pending"
                    ? "Pendiente"
                    : selectedBooking.status === "checked_in"
                    ? "Check-in hecho"
                    : selectedBooking.status === "checked_out"
                    ? "Check-out hecho"
                    : "Cancelada"}
                </span>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    selectedBooking.payment_status === "paid"
                      ? "bg-green-100 text-green-800"
                      : selectedBooking.payment_status === "partial"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedBooking.payment_status === "paid"
                    ? "Pagado"
                    : selectedBooking.payment_status === "partial"
                    ? "Pago parcial"
                    : "Pendiente de pago"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
