"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { getBookingById, updateBooking } from "@/lib/db/bookings";
import { getUnitById } from "@/lib/db/units";
import {
  getPaymentsByBooking,
  getTotalPaidForBooking,
  createPayment,
  deletePayment,
} from "@/lib/db/payments";
import { BookingStatusBadge, BookingSourceBadge, ContractStatusBadge } from "@/components/bookings";
import { PaymentList, AddPaymentForm, PaymentSummary } from "@/components/payments";
import { formatCurrency, formatDate, formatDateRange } from "@/lib/utils";
import { Payment } from "@/types";

export default function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const t = useTranslations("bookings");
  const tPayments = useTranslations("payments");
  const tContract = useTranslations("contract");
  const { id } = use(params);
  const booking = getBookingById(id);

  const [payments, setPayments] = useState<Payment[]>([]);
  const [totalPaid, setTotalPaid] = useState(0);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  useEffect(() => {
    if (booking) {
      loadPayments();
    }
  }, [booking]);

  const loadPayments = () => {
    const bookingPayments = getPaymentsByBooking(id);
    setPayments(bookingPayments);
    setTotalPaid(getTotalPaidForBooking(id));
  };

  if (!booking) {
    return (
      <div className="min-h-screen bg-charcoal-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            {t("bookingNotFound")}
          </h2>
          <p className="text-zinc-500 mb-4">
            {t("bookingNotFoundDescription")}
          </p>
          <button
            onClick={() => router.push("/admin/bookings")}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
          >
            {t("backToBookings")}
          </button>
        </div>
      </div>
    );
  }

  const unit = getUnitById(booking.unit_id);

  const handleStatusChange = (newStatus: string) => {
    updateBooking(booking.id, { status: newStatus as any });
    router.refresh();
  };

  const handleAddPayment = (payment: Omit<Payment, "id" | "created_at">) => {
    createPayment(payment);
    loadPayments();
    setShowPaymentForm(false);
  };

  const handleDeletePayment = (paymentId: string) => {
    if (confirm(t("deletePaymentConfirm"))) {
      deletePayment(paymentId);
      loadPayments();
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-950 p-6">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.push("/admin/bookings")}
          className="text-sm text-zinc-400 hover:text-white mb-4 flex items-center"
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
          {t("backToBookings")}
        </button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {booking.guest.name}
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              {t("bookingDetails")} #{booking.id}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <BookingSourceBadge source={booking.source} />
            <BookingStatusBadge status={booking.status} />
            <ContractStatusBadge status={(booking as any).contract_status} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main content */}
        <div className="col-span-2 space-y-6">
          {/* Guest Information */}
          <div className="bg-charcoal-800/60 border border-charcoal-700 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              {t("guestInfo")}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-zinc-300">
                  {t("fullName")}
                </label>
                <p className="text-white mt-1">{booking.guest.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-300">
                  {t("guestEmail")}
                </label>
                <p className="text-white mt-1">{booking.guest.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-300">
                  {t("guestPhone")}
                </label>
                <p className="text-white mt-1">{booking.guest.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-300">
                  {t("nationality")}
                </label>
                <p className="text-white mt-1">
                  {booking.guest.nationality}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-300">
                  {t("guestsCount")}
                </label>
                <p className="text-white mt-1">
                  {booking.guest.guests_count}
                </p>
              </div>
              {booking.guest.notes && (
                <div className="col-span-2">
                  <label className="text-sm font-medium text-zinc-300">
                    {t("guestNotes")}
                  </label>
                  <p className="text-white mt-1">{booking.guest.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Stay Details */}
          <div className="bg-charcoal-800/60 border border-charcoal-700 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              {t("stayDetails")}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-zinc-300">
                  {t("unit")}
                </label>
                <p className="text-white mt-1">{unit?.name || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-300">
                  {t("duration")}
                </label>
                <p className="text-white mt-1">
                  {booking.pricing.nights} {booking.pricing.nights !== 1 ? t("nightPlural") : t("night")}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-300">
                  {t("checkIn")}
                </label>
                <p className="text-white mt-1">
                  {formatDate(booking.check_in)}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-300">
                  {t("checkOut")}
                </label>
                <p className="text-white mt-1">
                  {formatDate(booking.check_out)}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-300">
                  {t("bookingSource")}
                </label>
                <p className="text-white mt-1 capitalize">
                  {booking.source === "booking"
                    ? t("bookingCom")
                    : booking.source === "airbnb"
                    ? t("airbnb")
                    : booking.source === "direct"
                    ? t("direct")
                    : t("owner")}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-300">
                  {t("creationDate")}
                </label>
                <p className="text-white mt-1">
                  {formatDate(booking.created_at)}
                </p>
              </div>
            </div>

            {booking.notes && (
              <div className="mt-4 pt-4 border-t border-charcoal-700">
                <label className="text-sm font-medium text-zinc-300">
                  {t("bookingNotes")}
                </label>
                <p className="text-white mt-1">{booking.notes}</p>
              </div>
            )}
          </div>

          {/* Pricing Breakdown */}
          <div className="bg-charcoal-800/60 border border-charcoal-700 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              {t("pricingBreakdown")}
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between text-zinc-300">
                <span>
                  {booking.pricing.nights} {booking.pricing.nights !== 1 ? t("nightPlural") : t("night")} x{" "}
                  {formatCurrency(
                    booking.pricing.nightly_rate,
                    booking.pricing.currency
                  )}
                </span>
                <span>
                  {formatCurrency(
                    booking.pricing.subtotal,
                    booking.pricing.currency
                  )}
                </span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>{t("cleaningFee")}</span>
                <span>
                  {formatCurrency(
                    booking.pricing.cleaning_fee,
                    booking.pricing.currency
                  )}
                </span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>{t("taxesAndFees")}</span>
                <span>
                  {formatCurrency(
                    booking.pricing.taxes,
                    booking.pricing.currency
                  )}
                </span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-white pt-3 border-t border-charcoal-700">
                <span>{tPayments("totalDue")}</span>
                <span>
                  {formatCurrency(
                    booking.pricing.total,
                    booking.pricing.currency
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Payments Section */}
          <div className="bg-charcoal-800/60 border border-charcoal-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">{tPayments("title")}</h2>
              <button
                onClick={() => setShowPaymentForm(true)}
                className="px-3 py-1.5 bg-teal-600 text-white text-sm rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-1.5"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                {tPayments("addPayment")}
              </button>
            </div>

            <PaymentList
              payments={payments}
              onDeletePayment={handleDeletePayment}
            />
          </div>

          {/* Contract Information */}
          {(booking as any).booking_type === "long_term" && (
            <div className="bg-charcoal-800/60 border border-charcoal-700 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4">
                {t("rentalContract")}
              </h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400">{t("contractStatus")}</p>
                  <p className="text-white mt-1">
                    {(booking as any).contract_status === "signed" ? (
                      <span className="text-green-600 font-medium">
                        {tContract("signed")}{booking.contract_signed_at && ` on ${formatDate(booking.contract_signed_at)}`}
                      </span>
                    ) : (booking as any).contract_status === "sent" ? (
                      <span className="text-yellow-600 font-medium">
                        {t("sentForSignature")}
                      </span>
                    ) : (booking as any).contract_status === "draft" ? (
                      <span className="text-zinc-400 font-medium">
                        {tContract("draft")}
                      </span>
                    ) : (
                      <span className="text-zinc-500 font-medium">
                        {tContract("notNeeded")}
                      </span>
                    )}
                  </p>
                </div>
                <button
                  onClick={() => router.push(`/admin/bookings/${booking.id}/contract`)}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  {tContract("viewContract")}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Payment Summary */}
          <PaymentSummary
            totalDue={booking.pricing.total}
            totalPaid={totalPaid}
            currency={booking.pricing.currency}
            paymentCount={payments.length}
          />

          {/* Quick Actions */}
          <div className="bg-charcoal-800/60 border border-charcoal-700 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-zinc-300 mb-3">
              {t("quickActions")}
            </h3>
            <div className="space-y-2">
              {booking.status === "pending" && (
                <button
                  onClick={() => handleStatusChange("confirmed")}
                  className="w-full px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-sm font-medium"
                >
                  {t("confirmBooking")}
                </button>
              )}
              {booking.status === "confirmed" && (
                <button
                  onClick={() => handleStatusChange("checked_in")}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                >
                  {t("markCheckIn")}
                </button>
              )}
              {booking.status === "checked_in" && (
                <button
                  onClick={() => handleStatusChange("checked_out")}
                  className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
                >
                  {t("markCheckOut")}
                </button>
              )}
              <button className="w-full px-4 py-2 bg-charcoal-700 text-zinc-300 rounded-lg hover:bg-charcoal-600 transition-colors text-sm font-medium">
                {t("sendEmail")}
              </button>
              <button className="w-full px-4 py-2 bg-charcoal-700 text-zinc-300 rounded-lg hover:bg-charcoal-600 transition-colors text-sm font-medium">
                {t("generateInvoice")}
              </button>
              {booking.status !== "cancelled" && (
                <button
                  onClick={() => handleStatusChange("cancelled")}
                  className="w-full px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                >
                  {t("cancelBooking")}
                </button>
              )}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-charcoal-800/60 border border-charcoal-700 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-zinc-300 mb-4">
              {t("timeline")}
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-teal-500" />
                <div>
                  <p className="text-sm font-medium text-white">
                    {t("bookingCreated")}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">
                    {formatDate(booking.created_at)}
                  </p>
                </div>
              </div>
              {booking.contract_signed_at && (
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-green-500" />
                  <div>
                    <p className="text-sm font-medium text-white">
                      {t("contractSigned")}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      {formatDate(booking.contract_signed_at)}
                    </p>
                  </div>
                </div>
              )}
              {booking.status === "cancelled" && (
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-red-500" />
                  <div>
                    <p className="text-sm font-medium text-white">
                      {t("bookingCancelled")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Payment Modal */}
      {showPaymentForm && (
        <AddPaymentForm
          bookingId={booking.id}
          totalDue={booking.pricing.total}
          currency={booking.pricing.currency}
          onSubmit={handleAddPayment}
          onCancel={() => setShowPaymentForm(false)}
        />
      )}
    </div>
  );
}
