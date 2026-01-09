// ============================================
// Maintenance Management Page
// ============================================

"use client";

import { useState } from "react";
import { getMaintenanceRequests } from "@/lib/db/maintenance";
import { MaintenanceCard } from "@/components/operations/MaintenanceCard";
import { MaintenanceStatus, MaintenancePriority, MaintenanceCategory } from "@/types";

export default function MaintenancePage() {
  const [statusFilter, setStatusFilter] = useState<MaintenanceStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<MaintenancePriority | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<MaintenanceCategory | "all">("all");

  // Get maintenance requests
  let requests = getMaintenanceRequests();

  // Apply filters
  if (statusFilter !== "all") {
    requests = requests.filter((r) => r.status === statusFilter);
  }
  if (priorityFilter !== "all") {
    requests = requests.filter((r) => r.priority === priorityFilter);
  }
  if (categoryFilter !== "all") {
    requests = requests.filter((r) => r.category === categoryFilter);
  }

  // Sort by priority and date
  const priorityWeight = { urgent: 4, high: 3, medium: 2, low: 1 };
  requests.sort((a, b) => {
    const priorityDiff = priorityWeight[b.priority] - priorityWeight[a.priority];
    if (priorityDiff !== 0) return priorityDiff;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const statusOptions: { value: MaintenanceStatus | "all"; label: string }[] = [
    { value: "all", label: "All Status" },
    { value: "reported", label: "Reported" },
    { value: "scheduled", label: "Scheduled" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const priorityOptions: { value: MaintenancePriority | "all"; label: string }[] = [
    { value: "all", label: "All Priorities" },
    { value: "urgent", label: "Urgent" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];

  const categoryOptions: { value: MaintenanceCategory | "all"; label: string }[] = [
    { value: "all", label: "All Categories" },
    { value: "plumbing", label: "Plumbing" },
    { value: "electrical", label: "Electrical" },
    { value: "hvac", label: "HVAC" },
    { value: "appliance", label: "Appliance" },
    { value: "structural", label: "Structural" },
    { value: "cosmetic", label: "Cosmetic" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">
            Maintenance Requests
          </h1>
          <p className="text-gray-400">
            Track and manage maintenance issues
          </p>
        </div>
        <button className="btn-primary px-6 py-3 rounded-lg font-medium">
          + Report Issue
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Total",
            value: requests.length,
            color: "text-white",
          },
          {
            label: "Urgent",
            value: requests.filter((r) => r.priority === "urgent").length,
            color: "text-red-400",
          },
          {
            label: "In Progress",
            value: requests.filter((r) => r.status === "in_progress").length,
            color: "text-amber-400",
          },
          {
            label: "Completed",
            value: requests.filter((r) => r.status === "completed").length,
            color: "text-teal-400",
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
            <label className="block text-sm text-gray-400 mb-2">Priority</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as any)}
              className="w-full input-themed px-4 py-2 rounded-lg"
            >
              {priorityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as any)}
              className="w-full input-themed px-4 py-2 rounded-lg"
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Maintenance Requests List */}
      {requests.length === 0 ? (
        <div className="card-default p-12 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No maintenance requests found
          </h3>
          <p className="text-gray-400 mb-6">
            No requests match your current filters
          </p>
          <button
            onClick={() => {
              setStatusFilter("all");
              setPriorityFilter("all");
              setCategoryFilter("all");
            }}
            className="btn-primary px-6 py-2 rounded-lg"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Urgent items highlighted */}
          {requests.filter((r) => r.priority === "urgent" && r.status !== "completed").length >
            0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-red-400 text-lg">⚠️</span>
                <h2 className="text-lg font-semibold text-white">Urgent Issues</h2>
                <div className="flex-1 h-px bg-red-500/30" />
              </div>
              <div className="space-y-3">
                {requests
                  .filter((r) => r.priority === "urgent" && r.status !== "completed")
                  .map((request) => (
                    <MaintenanceCard
                      key={request.id}
                      maintenance={request}
                      unitName={`Unit ${request.unit_id.split("-")[1]}`}
                    />
                  ))}
              </div>
            </div>
          )}

          {/* Active items */}
          {requests.filter(
            (r) => r.priority !== "urgent" && r.status !== "completed" && r.status !== "cancelled"
          ).length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-lg font-semibold text-white">Active Requests</h2>
                <div className="flex-1 h-px bg-gray-700" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {requests
                  .filter(
                    (r) =>
                      r.priority !== "urgent" &&
                      r.status !== "completed" &&
                      r.status !== "cancelled"
                  )
                  .map((request) => (
                    <MaintenanceCard
                      key={request.id}
                      maintenance={request}
                      unitName={`Unit ${request.unit_id.split("-")[1]}`}
                    />
                  ))}
              </div>
            </div>
          )}

          {/* Completed items */}
          {requests.filter((r) => r.status === "completed").length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-lg font-semibold text-white">Completed</h2>
                <div className="flex-1 h-px bg-gray-700" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {requests
                  .filter((r) => r.status === "completed")
                  .map((request) => (
                    <MaintenanceCard
                      key={request.id}
                      maintenance={request}
                      unitName={`Unit ${request.unit_id.split("-")[1]}`}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
