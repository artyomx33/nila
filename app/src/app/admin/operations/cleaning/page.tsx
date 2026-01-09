// ============================================
// Cleaning Schedule Page
// ============================================

"use client";

import { useState } from "react";
import { getCleanings, getTodayCleanings, getUpcomingCleanings } from "@/lib/db/cleanings";
import { CleaningCard } from "@/components/operations/CleaningCard";
import { CleaningStatus, CleaningType } from "@/types";

type FilterView = "today" | "week" | "upcoming" | "all";

export default function CleaningSchedulePage() {
  const [filterView, setFilterView] = useState<FilterView>("today");
  const [statusFilter, setStatusFilter] = useState<CleaningStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<CleaningType | "all">("all");

  // Get cleanings based on view
  let cleanings = getCleanings();
  if (filterView === "today") {
    cleanings = getTodayCleanings();
  } else if (filterView === "week") {
    cleanings = getUpcomingCleanings(7);
  } else if (filterView === "upcoming") {
    cleanings = getUpcomingCleanings(30);
  }

  // Apply filters
  if (statusFilter !== "all") {
    cleanings = cleanings.filter((c) => c.status === statusFilter);
  }
  if (typeFilter !== "all") {
    cleanings = cleanings.filter((c) => c.type === typeFilter);
  }

  // Sort by scheduled date
  cleanings.sort(
    (a, b) =>
      new Date(a.scheduled_date).getTime() - new Date(b.scheduled_date).getTime()
  );

  // Group by date
  const groupedByDate = cleanings.reduce((acc, cleaning) => {
    const date = new Date(cleaning.scheduled_date).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(cleaning);
    return acc;
  }, {} as Record<string, typeof cleanings>);

  const viewTabs: { id: FilterView; label: string }[] = [
    { id: "today", label: "Today" },
    { id: "week", label: "This Week" },
    { id: "upcoming", label: "Upcoming" },
    { id: "all", label: "All" },
  ];

  const statusOptions: { value: CleaningStatus | "all"; label: string }[] = [
    { value: "all", label: "All Status" },
    { value: "pending", label: "Pending" },
    { value: "assigned", label: "Assigned" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "verified", label: "Verified" },
  ];

  const typeOptions: { value: CleaningType | "all"; label: string }[] = [
    { value: "all", label: "All Types" },
    { value: "turnover", label: "Turnover" },
    { value: "deep", label: "Deep Clean" },
    { value: "maintenance", label: "Maintenance" },
    { value: "inspection", label: "Inspection" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">
            Cleaning Schedule
          </h1>
          <p className="text-gray-400">
            Manage and track all cleaning tasks
          </p>
        </div>
        <button className="btn-primary px-6 py-3 rounded-lg font-medium">
          + Schedule Cleaning
        </button>
      </div>

      {/* View Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
        {viewTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterView(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filterView === tab.id
                ? "bg-teal-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="card-default p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label className="block text-sm text-gray-400 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full input-themed px-4 py-2 rounded-lg"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm text-gray-400 mb-2">Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="w-full input-themed px-4 py-2 rounded-lg"
            >
              {typeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm text-gray-400 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search by unit or cleaner..."
              className="w-full input-themed px-4 py-2 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Total",
            value: cleanings.length,
            color: "text-white",
          },
          {
            label: "Pending",
            value: cleanings.filter((c) => c.status === "pending").length,
            color: "text-gray-400",
          },
          {
            label: "In Progress",
            value: cleanings.filter((c) => c.status === "in_progress").length,
            color: "text-amber-400",
          },
          {
            label: "Completed",
            value: cleanings.filter((c) => c.status === "completed" || c.status === "verified").length,
            color: "text-teal-400",
          },
        ].map((stat) => (
          <div key={stat.label} className="card-default p-4">
            <div className="text-sm text-gray-400">{stat.label}</div>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Cleanings List */}
      {Object.keys(groupedByDate).length === 0 ? (
        <div className="card-default p-12 text-center">
          <div className="text-6xl mb-4">🧹</div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No cleanings found
          </h3>
          <p className="text-gray-400 mb-6">
            No cleanings match your current filters
          </p>
          <button
            onClick={() => {
              setFilterView("all");
              setStatusFilter("all");
              setTypeFilter("all");
            }}
            className="btn-primary px-6 py-2 rounded-lg"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedByDate).map(([date, dateCleanings]) => {
            const dateObj = new Date(date);
            const isToday = new Date().toDateString() === date;
            const isTomorrow =
              new Date(Date.now() + 86400000).toDateString() === date;

            return (
              <div key={date}>
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-lg font-semibold text-white">
                    {isToday
                      ? "Today"
                      : isTomorrow
                      ? "Tomorrow"
                      : dateObj.toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })}
                  </h2>
                  <div className="flex-1 h-px bg-gray-700" />
                  <span className="badge-muted text-xs px-2 py-1 rounded-full">
                    {dateCleanings.length} {dateCleanings.length === 1 ? "cleaning" : "cleanings"}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {dateCleanings.map((cleaning) => (
                    <CleaningCard
                      key={cleaning.id}
                      cleaning={cleaning}
                      unitName={`Unit ${cleaning.unit_id.split("-")[1]}`}
                      cleanerName={
                        cleaning.cleaner_id
                          ? `Cleaner ${cleaning.cleaner_id.split("-")[1]}`
                          : undefined
                      }
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
