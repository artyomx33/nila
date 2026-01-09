"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { getBookingById, updateContractStatus } from "@/lib/db/bookings";
import { getUnitById } from "@/lib/db/units";
import { ContractView } from "@/components/bookings/ContractView";

export default function ContractPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const booking = getBookingById(id);

  if (!booking) {
    return (
      <div className="min-h-screen bg-charcoal-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Booking Not Found
          </h2>
          <p className="text-zinc-500 mb-4">
            The booking you are looking for does not exist.
          </p>
          <button
            onClick={() => router.push("/admin/bookings")}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
          >
            Back to Bookings
          </button>
        </div>
      </div>
    );
  }

  const unit = getUnitById(booking.unit_id);

  if (!unit) {
    return (
      <div className="min-h-screen bg-charcoal-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Unit Not Found
          </h2>
          <p className="text-zinc-500 mb-4">
            The unit for this booking could not be found.
          </p>
          <button
            onClick={() => router.push("/admin/bookings")}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
          >
            Back to Bookings
          </button>
        </div>
      </div>
    );
  }

  // Check if this is a long-term booking
  const isLongTerm = (booking as any).booking_type === "long_term";

  if (!isLongTerm) {
    return (
      <div className="min-h-screen bg-charcoal-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Contract Not Available
          </h2>
          <p className="text-zinc-500 mb-4">
            Contracts are only available for long-term bookings.
          </p>
          <button
            onClick={() => router.push(`/admin/bookings/${id}`)}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
          >
            Back to Booking
          </button>
        </div>
      </div>
    );
  }

  const handleMarkAsSent = () => {
    updateContractStatus(id, "sent");
    router.refresh();
  };

  const handleMarkAsSigned = () => {
    updateContractStatus(id, "signed");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-charcoal-950 p-6">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.push(`/admin/bookings/${id}`)}
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
          Back to Booking Details
        </button>
      </div>

      {/* Contract View */}
      <div className="max-w-4xl mx-auto">
        <ContractView
          booking={booking as any}
          unit={unit}
          onMarkAsSent={handleMarkAsSent}
          onMarkAsSigned={handleMarkAsSigned}
        />
      </div>
    </div>
  );
}
