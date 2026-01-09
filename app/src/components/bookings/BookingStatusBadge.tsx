"use client";

import { useTranslations } from "next-intl";
import { BookingStatus } from "@/types";

interface BookingStatusBadgeProps {
  status: BookingStatus;
}

const statusConfig: Record<BookingStatus, { key: string; className: string }> = {
  pending: {
    key: "pending",
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  confirmed: {
    key: "confirmed",
    className: "bg-teal-100 text-teal-800 border-teal-200",
  },
  checked_in: {
    key: "checkedIn",
    className: "bg-blue-100 text-blue-800 border-blue-200",
  },
  checked_out: {
    key: "checkedOut",
    className: "bg-gray-100 text-gray-800 border-gray-200",
  },
  cancelled: {
    key: "cancelled",
    className: "bg-red-100 text-red-800 border-red-200",
  },
};

export function BookingStatusBadge({ status }: BookingStatusBadgeProps) {
  const t = useTranslations("bookings");
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className}`}
    >
      {t(config.key)}
    </span>
  );
}
