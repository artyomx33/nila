"use client";

import { useTranslations } from "next-intl";
import { BookingSource } from "@/types";

interface BookingSourceBadgeProps {
  source: BookingSource;
}

const sourceConfig: Record<BookingSource, { key: string; className: string }> = {
  direct: {
    key: "direct",
    className: "bg-teal-100 text-teal-800 border-teal-200",
  },
  airbnb: {
    key: "airbnb",
    className: "bg-orange-100 text-orange-800 border-orange-200",
  },
  booking: {
    key: "bookingCom",
    className: "bg-blue-100 text-blue-800 border-blue-200",
  },
  owner: {
    key: "owner",
    className: "bg-purple-100 text-purple-800 border-purple-200",
  },
};

export function BookingSourceBadge({ source }: BookingSourceBadgeProps) {
  const t = useTranslations("bookings");
  const config = sourceConfig[source];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className}`}
    >
      {t(config.key)}
    </span>
  );
}
