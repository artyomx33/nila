// ============================================
// Staff Card Component
// ============================================

"use client";

import { Cleaner } from "@/types";
import Link from "next/link";

interface StaffCardProps {
  cleaner: Cleaner;
}

const statusConfig = {
  active: { label: "Active", className: "badge-success" },
  inactive: { label: "Inactive", className: "badge-muted" },
  on_leave: { label: "On Leave", className: "badge-warning" },
};

export function StaffCard({ cleaner }: StaffCardProps) {
  const statusInfo = statusConfig[cleaner.status];
  const initials = cleaner.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Link href={`/admin/operations/staff/${cleaner.id}`}>
      <div className="card-default card-interactive p-4 hover:cursor-pointer">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-teal-600/20 flex items-center justify-center text-teal-400 font-semibold text-lg flex-shrink-0">
            {initials}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="font-semibold text-white text-lg truncate">
                {cleaner.name}
              </h3>
              <span
                className={`${statusInfo.className} text-xs px-2 py-0.5 rounded-full whitespace-nowrap`}
              >
                {statusInfo.label}
              </span>
            </div>

            <div className="space-y-1 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="truncate">{cleaner.phone}</span>
              </div>

              {cleaner.email && (
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="truncate">{cleaner.email}</span>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-700">
              <div>
                <div className="text-xs text-gray-500">Active</div>
                <div className="text-lg font-semibold text-teal-400">
                  {cleaner.assigned_cleanings || 0}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Completed</div>
                <div className="text-lg font-semibold text-white">
                  {cleaner.completed_cleanings || 0}
                </div>
              </div>
              {cleaner.rating && (
                <div>
                  <div className="text-xs text-gray-500">Rating</div>
                  <div className="text-lg font-semibold text-amber-400 flex items-center gap-1">
                    {cleaner.rating}
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
