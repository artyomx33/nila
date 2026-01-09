// ============================================
// Staff Profile Page
// ============================================

"use client";

import { use } from "react";
import { getCleaner } from "@/lib/db/cleaners";
import { getCleaningsByCleaner } from "@/lib/db/cleanings";
import { CleaningCard } from "@/components/operations/CleaningCard";
import Link from "next/link";

export default function StaffProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const cleaner = getCleaner(id);
  const cleanings = getCleaningsByCleaner(id);

  if (!cleaner) {
    return (
      <div className="card-default p-12 text-center">
        <div className="text-6xl mb-4">❌</div>
        <h2 className="text-2xl font-bold text-white mb-2">Staff Not Found</h2>
        <p className="text-gray-400 mb-6">
          The staff member you're looking for doesn't exist.
        </p>
        <Link
          href="/admin/operations/staff"
          className="btn-primary px-6 py-3 rounded-lg inline-block"
        >
          Back to Staff
        </Link>
      </div>
    );
  }

  const initials = cleaner.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const statusConfig = {
    active: { label: "Active", className: "badge-success", icon: "✅" },
    inactive: { label: "Inactive", className: "badge-muted", icon: "⏸️" },
    on_leave: { label: "On Leave", className: "badge-warning", icon: "🏖️" },
  };

  const statusInfo = statusConfig[cleaner.status];

  // Categorize cleanings
  const currentAssignments = cleanings.filter(
    (c) => c.status === "assigned" || c.status === "in_progress" || c.status === "pending"
  );
  const recentCompleted = cleanings
    .filter((c) => c.status === "completed" || c.status === "verified")
    .sort((a, b) => {
      const dateA = a.completed_at ? new Date(a.completed_at).getTime() : 0;
      const dateB = b.completed_at ? new Date(b.completed_at).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/admin/operations/staff"
          className="text-sm text-teal-400 hover:text-teal-300 mb-2 inline-block"
        >
          ← Back to Staff
        </Link>
      </div>

      {/* Profile Card */}
      <div className="card-default p-6">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-teal-600/20 flex items-center justify-center text-teal-400 font-bold text-3xl flex-shrink-0">
            {initials}
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-serif font-bold text-white mb-2">
                  {cleaner.name}
                </h1>
                <div className="flex items-center gap-3">
                  <span className={`${statusInfo.className} px-3 py-1 rounded-full text-sm`}>
                    {statusInfo.icon} {statusInfo.label}
                  </span>
                  {cleaner.rating && (
                    <div className="flex items-center gap-1 text-amber-400">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-semibold">{cleaner.rating}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button className="btn-secondary px-4 py-2 rounded-lg text-sm">
                  Edit Profile
                </button>
                <button className="btn-ghost px-4 py-2 rounded-lg text-sm">
                  •••
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="icon-box icon-box-teal icon-box-md">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Phone</div>
                  <div className="text-white font-medium">{cleaner.phone}</div>
                </div>
              </div>

              {cleaner.email && (
                <div className="flex items-center gap-3">
                  <div className="icon-box icon-box-teal icon-box-md">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Email</div>
                    <div className="text-white font-medium">{cleaner.email}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="card-default p-4">
          <div className="text-sm text-gray-400 mb-1">Active Assignments</div>
          <div className="text-3xl font-bold text-amber-400">
            {cleaner.assigned_cleanings || 0}
          </div>
        </div>

        <div className="card-default p-4">
          <div className="text-sm text-gray-400 mb-1">Completed</div>
          <div className="text-3xl font-bold text-teal-400">
            {cleaner.completed_cleanings || 0}
          </div>
        </div>

        <div className="card-default p-4">
          <div className="text-sm text-gray-400 mb-1">Rating</div>
          <div className="text-3xl font-bold text-gold-400">
            {cleaner.rating || "N/A"}
          </div>
        </div>

        <div className="card-default p-4">
          <div className="text-sm text-gray-400 mb-1">Member Since</div>
          <div className="text-lg font-bold text-white">
            {new Date(cleaner.created_at).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>
      </div>

      {/* Current Assignments */}
      {currentAssignments.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Current Assignments ({currentAssignments.length})
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {currentAssignments.map((cleaning) => (
              <CleaningCard
                key={cleaning.id}
                cleaning={cleaning}
                unitName={`Unit ${cleaning.unit_id.split("-")[1]}`}
                cleanerName={cleaner.name}
              />
            ))}
          </div>
        </div>
      )}

      {/* Recent Completed */}
      {recentCompleted.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">
              Recent Completed Cleanings
            </h2>
            <Link
              href={`/admin/operations/cleaning?cleaner=${id}`}
              className="text-sm text-teal-400 hover:text-teal-300"
            >
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {recentCompleted.map((cleaning) => (
              <CleaningCard
                key={cleaning.id}
                cleaning={cleaning}
                unitName={`Unit ${cleaning.unit_id.split("-")[1]}`}
                cleanerName={cleaner.name}
              />
            ))}
          </div>
        </div>
      )}

      {/* Performance Placeholder */}
      <div className="card-default p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Performance Metrics
        </h3>
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">📊</div>
          <p>Performance metrics coming soon</p>
        </div>
      </div>
    </div>
  );
}
