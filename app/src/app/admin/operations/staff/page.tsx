// ============================================
// Staff Management Page
// ============================================

"use client";

import { useState } from "react";
import { getCleaners } from "@/lib/db/cleaners";
import { StaffCard } from "@/components/operations/StaffCard";
import { CleanerStatus } from "@/types";

export default function StaffPage() {
  const [statusFilter, setStatusFilter] = useState<CleanerStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Get cleaners
  let cleaners = getCleaners();

  // Apply filters
  if (statusFilter !== "all") {
    cleaners = cleaners.filter((c) => c.status === statusFilter);
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    cleaners = cleaners.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.phone.includes(query) ||
        c.email?.toLowerCase().includes(query)
    );
  }

  // Sort by rating and completed cleanings
  cleaners.sort((a, b) => {
    if (a.status === "active" && b.status !== "active") return -1;
    if (a.status !== "active" && b.status === "active") return 1;
    const ratingDiff = (b.rating || 0) - (a.rating || 0);
    if (ratingDiff !== 0) return ratingDiff;
    return (b.completed_cleanings || 0) - (a.completed_cleanings || 0);
  });

  const statusOptions: { value: CleanerStatus | "all"; label: string }[] = [
    { value: "all", label: "All Staff" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "on_leave", label: "On Leave" },
  ];

  const activeStaff = cleaners.filter((c) => c.status === "active");
  const totalAssignments = activeStaff.reduce(
    (sum, c) => sum + (c.assigned_cleanings || 0),
    0
  );
  const avgRating =
    activeStaff.length > 0
      ? (
          activeStaff.reduce((sum, c) => sum + (c.rating || 0), 0) /
          activeStaff.length
        ).toFixed(1)
      : "0.0";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">
            Staff Management
          </h1>
          <p className="text-gray-400">
            Manage cleaning staff and assignments
          </p>
        </div>
        <button className="btn-primary px-6 py-3 rounded-lg font-medium">
          + Add Staff Member
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Total Staff",
            value: cleaners.length,
            color: "text-white",
          },
          {
            label: "Active",
            value: activeStaff.length,
            color: "text-teal-400",
          },
          {
            label: "Active Assignments",
            value: totalAssignments,
            color: "text-amber-400",
          },
          {
            label: "Avg Rating",
            value: avgRating,
            color: "text-gold-400",
          },
        ].map((stat) => (
          <div key={stat.label} className="card-default p-4">
            <div className="text-sm text-gray-400">{stat.label}</div>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card-default p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
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

          <div>
            <label className="block text-sm text-gray-400 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search by name, phone, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full input-themed px-4 py-2 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Staff List */}
      {cleaners.length === 0 ? (
        <div className="card-default p-12 text-center">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No staff members found
          </h3>
          <p className="text-gray-400 mb-6">
            {searchQuery || statusFilter !== "all"
              ? "No staff match your current filters"
              : "Add your first staff member to get started"}
          </p>
          <button
            onClick={() => {
              setStatusFilter("all");
              setSearchQuery("");
            }}
            className="btn-primary px-6 py-2 rounded-lg"
          >
            {searchQuery || statusFilter !== "all" ? "Reset Filters" : "Add Staff Member"}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Active Staff */}
          {cleaners.filter((c) => c.status === "active").length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-lg font-semibold text-white">Active Staff</h2>
                <div className="flex-1 h-px bg-gray-700" />
                <span className="badge-teal text-xs px-2 py-1 rounded-full">
                  {cleaners.filter((c) => c.status === "active").length} members
                </span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {cleaners
                  .filter((c) => c.status === "active")
                  .map((cleaner) => (
                    <StaffCard key={cleaner.id} cleaner={cleaner} />
                  ))}
              </div>
            </div>
          )}

          {/* On Leave */}
          {cleaners.filter((c) => c.status === "on_leave").length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-lg font-semibold text-white">On Leave</h2>
                <div className="flex-1 h-px bg-gray-700" />
                <span className="badge-warning text-xs px-2 py-1 rounded-full">
                  {cleaners.filter((c) => c.status === "on_leave").length} members
                </span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {cleaners
                  .filter((c) => c.status === "on_leave")
                  .map((cleaner) => (
                    <StaffCard key={cleaner.id} cleaner={cleaner} />
                  ))}
              </div>
            </div>
          )}

          {/* Inactive */}
          {cleaners.filter((c) => c.status === "inactive").length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-lg font-semibold text-white">Inactive</h2>
                <div className="flex-1 h-px bg-gray-700" />
                <span className="badge-muted text-xs px-2 py-1 rounded-full">
                  {cleaners.filter((c) => c.status === "inactive").length} members
                </span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {cleaners
                  .filter((c) => c.status === "inactive")
                  .map((cleaner) => (
                    <StaffCard key={cleaner.id} cleaner={cleaner} />
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
