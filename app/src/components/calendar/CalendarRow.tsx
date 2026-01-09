"use client";

import { Booking } from "@/types";
import { BookingBlock } from "./BookingBlock";

interface CalendarRowProps {
  unitId: string;
  unitName: string;
  bookings: Booking[];
  dates: Date[];
  onBookingClick: (booking: Booking) => void;
}

export function CalendarRow({
  unitId,
  unitName,
  bookings,
  dates,
  onBookingClick,
}: CalendarRowProps) {
  // Calculate booking positions
  const bookingBlocks = bookings.map((booking) => {
    const checkIn = new Date(booking.check_in);
    const checkOut = new Date(booking.check_out);

    // Find start position
    let startCol = 0;
    for (let i = 0; i < dates.length; i++) {
      if (dates[i].toDateString() === checkIn.toDateString()) {
        startCol = i;
        break;
      }
      // If check-in is before the calendar range, start at 0
      if (dates[i] > checkIn && i === 0) {
        startCol = 0;
        break;
      }
    }

    // Calculate span
    let spanCols = 0;
    for (let i = startCol; i < dates.length; i++) {
      const currentDate = dates[i];
      if (currentDate >= checkOut) break;
      spanCols++;
    }

    // Ensure minimum width
    if (spanCols === 0) spanCols = 1;

    return {
      booking,
      startCol: startCol / dates.length,
      spanCols: spanCols / dates.length,
    };
  });

  return (
    <div className="flex border-b border-gray-200 hover:bg-gray-50/50 transition-colors">
      {/* Unit name */}
      <div className="w-48 flex-shrink-0 border-r border-gray-200 px-4 py-3">
        <div className="text-sm font-medium text-gray-900">{unitName}</div>
      </div>

      {/* Calendar grid */}
      <div className="flex-1 flex relative min-h-[60px]">
        {dates.map((date, index) => {
          const isToday = date.toDateString() === new Date().toDateString();
          const isWeekend = date.getDay() === 0 || date.getDay() === 6;

          return (
            <div
              key={index}
              className={`
                flex-1 min-w-[60px] border-r border-gray-200
                ${isToday ? "bg-teal-50/30" : isWeekend ? "bg-gray-50/30" : ""}
              `}
            />
          );
        })}

        {/* Booking blocks */}
        {bookingBlocks.map(({ booking, startCol, spanCols }) => (
          <BookingBlock
            key={booking.id}
            booking={booking}
            startCol={startCol}
            spanCols={spanCols}
            onClick={onBookingClick}
          />
        ))}
      </div>
    </div>
  );
}
