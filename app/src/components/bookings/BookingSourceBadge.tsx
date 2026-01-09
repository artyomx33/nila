import { BookingSource } from "@/types";

interface BookingSourceBadgeProps {
  source: BookingSource;
}

const sourceConfig: Record<
  BookingSource,
  { label: string; className: string }
> = {
  direct: {
    label: "Directo",
    className: "bg-teal-100 text-teal-800 border-teal-200",
  },
  airbnb: {
    label: "Airbnb",
    className: "bg-orange-100 text-orange-800 border-orange-200",
  },
  booking: {
    label: "Booking.com",
    className: "bg-blue-100 text-blue-800 border-blue-200",
  },
  owner: {
    label: "Propietario",
    className: "bg-purple-100 text-purple-800 border-purple-200",
  },
};

export function BookingSourceBadge({ source }: BookingSourceBadgeProps) {
  const config = sourceConfig[source];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className}`}
    >
      {config.label}
    </span>
  );
}
