"use client";

import { useState, useEffect } from "react";
import { Booking } from "@/types";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarRow } from "./CalendarRow";

interface Unit {
  id: string;
  name: string;
}

interface CalendarTimelineProps {
  units: Unit[];
  bookings: Booking[];
  startDate: Date;
  endDate: Date;
  onBookingClick: (booking: Booking) => void;
}

export function CalendarTimeline({
  units,
  bookings,
  startDate,
  endDate,
  onBookingClick,
}: CalendarTimelineProps) {
  const [dates, setDates] = useState<Date[]>([]);

  useEffect(() => {
    // Generate array of dates between startDate and endDate
    const dateArray: Date[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setDates(dateArray);
  }, [startDate, endDate]);

  // Group bookings by unit
  const bookingsByUnit = units.reduce((acc, unit) => {
    acc[unit.id] = bookings.filter((b) => b.unit_id === unit.id);
    return acc;
  }, {} as Record<string, Booking[]>);

  if (dates.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Cargando calendario...
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <CalendarHeader dates={dates} />

      <div className="overflow-auto max-h-[600px]">
        {units.map((unit) => (
          <CalendarRow
            key={unit.id}
            unitId={unit.id}
            unitName={unit.name}
            bookings={bookingsByUnit[unit.id] || []}
            dates={dates}
            onBookingClick={onBookingClick}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-3 flex items-center gap-6">
        <div className="text-xs font-medium text-gray-500">Fuente:</div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-teal-500 border border-teal-600" />
          <span className="text-xs text-gray-700">Directo</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-orange-400 border border-orange-500" />
          <span className="text-xs text-gray-700">Airbnb</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-500 border border-blue-600" />
          <span className="text-xs text-gray-700">Booking.com</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-purple-500 border border-purple-600" />
          <span className="text-xs text-gray-700">Propietario</span>
        </div>
      </div>
    </div>
  );
}
