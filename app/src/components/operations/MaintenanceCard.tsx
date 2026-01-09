// ============================================
// Maintenance Card Component
// ============================================

"use client";

import { MaintenanceRequest } from "@/types";
import { PriorityBadge } from "./PriorityBadge";

interface MaintenanceCardProps {
  maintenance: MaintenanceRequest;
  unitName?: string;
}

const statusConfig = {
  reported: { label: "Reported", className: "badge-muted" },
  scheduled: { label: "Scheduled", className: "badge-teal" },
  in_progress: { label: "In Progress", className: "badge-warning" },
  completed: { label: "Completed", className: "badge-success" },
  cancelled: { label: "Cancelled", className: "badge-error" },
};

const categoryIcons: Record<string, string> = {
  plumbing: "💧",
  electrical: "⚡",
  hvac: "❄️",
  appliance: "🔧",
  structural: "🏗️",
  cosmetic: "🎨",
  other: "📋",
};

export function MaintenanceCard({ maintenance, unitName }: MaintenanceCardProps) {
  const statusInfo = statusConfig[maintenance.status];
  const categoryLabel =
    maintenance.category.charAt(0).toUpperCase() + maintenance.category.slice(1);

  return (
    <div className="card-default p-4">
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-2xl flex-shrink-0">
          {categoryIcons[maintenance.category]}
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1">
              <h3 className="font-semibold text-white text-base mb-1">
                {maintenance.title}
              </h3>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="badge-muted text-xs px-2 py-0.5 rounded-full">
                  {categoryLabel}
                </span>
                <PriorityBadge priority={maintenance.priority} size="sm" />
                <span
                  className={`${statusInfo.className} text-xs px-2 py-0.5 rounded-full`}
                >
                  {statusInfo.label}
                </span>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-400 mb-3 line-clamp-2">
            {maintenance.description}
          </p>

          <div className="space-y-1 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <span>{unitName || `Unit ${maintenance.unit_id}`}</span>
            </div>

            {maintenance.assigned_to && (
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>{maintenance.assigned_to}</span>
              </div>
            )}

            {maintenance.scheduled_date && (
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>
                  Scheduled:{" "}
                  {new Date(maintenance.scheduled_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            )}

            {maintenance.cost && (
              <div className="flex items-center gap-2 text-teal-400 font-medium">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  {maintenance.currency === "MXN" ? "MX$" : "$"}
                  {maintenance.cost.toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
