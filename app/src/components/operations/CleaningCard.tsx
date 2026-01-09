// ============================================
// Cleaning Card Component
// ============================================

"use client";

import { Cleaning } from "@/types";
import { CleaningStatusBadge } from "./CleaningStatusBadge";
import Link from "next/link";

interface CleaningCardProps {
  cleaning: Cleaning;
  unitName?: string;
  cleanerName?: string;
}

export function CleaningCard({ cleaning, unitName, cleanerName }: CleaningCardProps) {
  const scheduledDate = new Date(cleaning.scheduled_date);
  const isToday = new Date().toDateString() === scheduledDate.toDateString();

  const typeLabels = {
    turnover: "Turnover",
    deep: "Deep Clean",
    maintenance: "Maintenance",
    inspection: "Inspection",
  };

  const completedItems = cleaning.checklist.filter((item) => item.completed).length;
  const totalItems = cleaning.checklist.length;
  const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <Link href={`/admin/operations/cleaning/${cleaning.id}`}>
      <div className="card-default card-interactive p-4 hover:cursor-pointer">
        <div className="flex items-start justify-between gap-3">
          {/* Left side - Main info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-white text-lg">
                {unitName || `Unit ${cleaning.unit_id}`}
              </h3>
              <span className="badge-muted text-xs px-2 py-0.5 rounded-full">
                {typeLabels[cleaning.type]}
              </span>
            </div>

            <div className="space-y-1 text-sm text-gray-400">
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
                  {scheduledDate.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                  {" at "}
                  {scheduledDate.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </span>
                {isToday && (
                  <span className="badge-warning text-xs px-2 py-0.5 rounded-full ml-1">
                    Today
                  </span>
                )}
              </div>

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
                <span>
                  {cleanerName || cleaning.cleaner_id || (
                    <span className="text-amber-500">Unassigned</span>
                  )}
                </span>
              </div>

              {cleaning.status === "in_progress" && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-teal-500 h-2 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right side - Status */}
          <div className="flex flex-col items-end gap-2">
            <CleaningStatusBadge status={cleaning.status} />
          </div>
        </div>

        {cleaning.notes && (
          <div className="mt-3 pt-3 border-t border-gray-700">
            <p className="text-sm text-gray-400 line-clamp-1">{cleaning.notes}</p>
          </div>
        )}
      </div>
    </Link>
  );
}
