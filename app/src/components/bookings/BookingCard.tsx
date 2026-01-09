"use client";

import { useTranslations } from "next-intl";
import { Booking } from "@/types";
import { formatDateRange, formatCurrency } from "@/lib/utils";
import { BookingStatusBadge } from "./BookingStatusBadge";
import { BookingSourceBadge } from "./BookingSourceBadge";

interface BookingCardProps {
  booking: Booking;
  unitName?: string;
  onClick?: () => void;
}

export function BookingCard({ booking, unitName, onClick }: BookingCardProps) {
  const t = useTranslations("bookings");
  const tCommon = useTranslations("common");

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow ${
        onClick ? "cursor-pointer" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            {booking.guest.name}
          </h3>
          {unitName && (
            <p className="text-sm text-gray-500 mt-0.5">{unitName}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <BookingSourceBadge source={booking.source} />
        </div>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center text-sm text-gray-600">
          <svg
            className="w-4 h-4 mr-2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{formatDateRange(booking.check_in, booking.check_out)}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <svg
            className="w-4 h-4 mr-2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span>{booking.guest.guests_count} {t("guests")}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <svg
            className="w-4 h-4 mr-2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span>{booking.guest.email}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <BookingStatusBadge status={booking.status} />
        <div className="text-right">
          <div className="text-xs text-gray-500">{tCommon("total")}</div>
          <div className="text-base font-semibold text-gray-900">
            {formatCurrency(booking.pricing.total, booking.pricing.currency)}
          </div>
        </div>
      </div>
    </div>
  );
}
