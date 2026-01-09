"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { BookingCard } from "@/components/bookings";
import { getAllBookings } from "@/lib/db/bookings";
import { getAllUnits } from "@/lib/db/units";
import { Booking, BookingStatus, BookingSource } from "@/types";

export default function BookingsPage() {
  const router = useRouter();
  const t = useTranslations("bookings");
  const tCommon = useTranslations("common");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">("all");
  const [sourceFilter, setSourceFilter] = useState<BookingSource | "all">("all");
  const [sortBy, setSortBy] = useState<"check_in" | "created_at">("check_in");

  // Get bookings and units
  const allBookings = getAllBookings();
  const units = getAllUnits();

  // Create a map of unit names
  const unitNames = units.reduce((acc, unit) => {
    acc[unit.id] = unit.name;
    return acc;
  }, {} as Record<string, string>);

  // Filter and sort bookings
  let filteredBookings = allBookings;

  // Search filter
  if (searchQuery) {
    const lowerQuery = searchQuery.toLowerCase();
    filteredBookings = filteredBookings.filter(
      (b) =>
        b.guest.name.toLowerCase().includes(lowerQuery) ||
        b.guest.email.toLowerCase().includes(lowerQuery) ||
        unitNames[b.unit_id]?.toLowerCase().includes(lowerQuery)
    );
  }

  // Status filter
  if (statusFilter !== "all") {
    filteredBookings = filteredBookings.filter(
      (b) => b.status === statusFilter
    );
  }

  // Source filter
  if (sourceFilter !== "all") {
    filteredBookings = filteredBookings.filter(
      (b) => b.source === sourceFilter
    );
  }

  // Sort
  filteredBookings.sort((a, b) => {
    if (sortBy === "check_in") {
      return new Date(a.check_in).getTime() - new Date(b.check_in).getTime();
    } else {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
  });

  // Calculate stats
  const stats = {
    total: allBookings.length,
    pending: allBookings.filter((b) => b.status === "pending").length,
    confirmed: allBookings.filter((b) => b.status === "confirmed").length,
    checked_in: allBookings.filter((b) => b.status === "checked_in").length,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
            <p className="text-sm text-gray-500 mt-1">
              {t("subtitle")}
            </p>
          </div>

          <button
            onClick={() => router.push("/admin/calendar")}
            className="px-4 py-2 bg-teal-500 text-white text-sm font-medium rounded-lg hover:bg-teal-600 transition-colors"
          >
            {t("viewCalendar")}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-sm text-gray-500">{tCommon("total")}</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              {stats.total}
            </div>
          </div>
          <div className="bg-white border border-yellow-200 rounded-lg p-4">
            <div className="text-sm text-yellow-600">{t("pending")}</div>
            <div className="text-2xl font-bold text-yellow-700 mt-1">
              {stats.pending}
            </div>
          </div>
          <div className="bg-white border border-teal-200 rounded-lg p-4">
            <div className="text-sm text-teal-600">{t("confirmed")}</div>
            <div className="text-2xl font-bold text-teal-700 mt-1">
              {stats.confirmed}
            </div>
          </div>
          <div className="bg-white border border-blue-200 rounded-lg p-4">
            <div className="text-sm text-blue-600">{t("checkIn")}</div>
            <div className="text-2xl font-bold text-blue-700 mt-1">
              {stats.checked_in}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-4 gap-4">
            {/* Search */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {tCommon("search")}
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            {/* Status filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {tCommon("status")}
              </label>
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as BookingStatus | "all")
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="all">{t("allStatuses")}</option>
                <option value="pending">{t("pending")}</option>
                <option value="confirmed">{t("confirmed")}</option>
                <option value="checked_in">{t("checkedIn")}</option>
                <option value="checked_out">{t("checkedOut")}</option>
                <option value="cancelled">{t("cancelled")}</option>
              </select>
            </div>

            {/* Source filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("source")}
              </label>
              <select
                value={sourceFilter}
                onChange={(e) =>
                  setSourceFilter(e.target.value as BookingSource | "all")
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="all">{t("allSources")}</option>
                <option value="direct">{t("direct")}</option>
                <option value="airbnb">{t("airbnb")}</option>
                <option value="booking">{t("bookingCom")}</option>
                <option value="owner">{t("owner")}</option>
              </select>
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-700">{t("sortBy")}:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSortBy("check_in")}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  sortBy === "check_in"
                    ? "bg-teal-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {t("arrivalDate")}
              </button>
              <button
                onClick={() => setSortBy("created_at")}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  sortBy === "created_at"
                    ? "bg-teal-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {t("createdDate")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4">
        <div className="text-sm text-gray-600">
          {filteredBookings.length === 1
            ? t("bookingsFound", { count: filteredBookings.length })
            : t("bookingsFoundPlural", { count: filteredBookings.length })}
        </div>
      </div>

      {/* Bookings grid */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <div className="text-gray-400 mb-2">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            {t("noBookings")}
          </h3>
          <p className="text-sm text-gray-500">
            {t("noBookingsDescription")}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              unitName={unitNames[booking.unit_id]}
              onClick={() => router.push(`/admin/bookings/${booking.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
