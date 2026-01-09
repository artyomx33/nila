"use client";

import { Booking, BookingSource } from "@/types";
import { formatDateRange } from "@/lib/utils";

interface BookingBlockProps {
  booking: Booking;
  startCol: number;
  spanCols: number;
  onClick: (booking: Booking) => void;
}

const sourceColors: Record<BookingSource, string> = {
  direct: "bg-teal-500/80 hover:bg-teal-500 border-teal-600",
  airbnb: "bg-orange-400/80 hover:bg-orange-400 border-orange-500",
  booking: "bg-blue-500/80 hover:bg-blue-500 border-blue-600",
  owner: "bg-purple-500/80 hover:bg-purple-500 border-purple-600",
};

export function BookingBlock({
  booking,
  startCol,
  spanCols,
  onClick,
}: BookingBlockProps) {
  const colorClass = sourceColors[booking.source];

  return (
    <button
      onClick={() => onClick(booking)}
      className={`
        absolute top-1 bottom-1 rounded-md border
        ${colorClass}
        text-white text-xs font-medium
        overflow-hidden cursor-pointer
        transition-all duration-200
        hover:scale-[1.02] hover:shadow-md
        hover:z-10
      `}
      style={{
        left: `${startCol * 100}%`,
        width: `${spanCols * 100}%`,
      }}
      title={`${booking.guest.name} - ${formatDateRange(
        booking.check_in,
        booking.check_out
      )}`}
    >
      <div className="px-2 py-1 truncate">
        <div className="font-semibold truncate">{booking.guest.name}</div>
        {spanCols > 2 && (
          <div className="text-[10px] opacity-90 truncate">
            {formatDateRange(booking.check_in, booking.check_out)}
          </div>
        )}
      </div>
    </button>
  );
}
