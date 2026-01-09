// ============================================
// Cleaning Detail Page
// ============================================

"use client";

import { use, useState } from "react";
import { useCleaningsStore } from "@/lib/stores/cleanings-store";
import { getActiveCleaners } from "@/lib/db/cleaners";
import { CleaningStatusBadge } from "@/components/operations/CleaningStatusBadge";
import { CleaningChecklist } from "@/components/operations/CleaningChecklist";
import Link from "next/link";
import { ChecklistItem, Cleaner } from "@/types";

export default function CleaningDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { getCleaning, updateChecklist, startCleaning, completeCleaning, verifyCleaning, assignCleaner } = useCleaningsStore();
  const cleaning = getCleaning(id);

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedCleanerId, setSelectedCleanerId] = useState<string>("");
  const availableCleaners = getActiveCleaners();

  if (!cleaning) {
    return (
      <div className="card-default p-12 text-center">
        <div className="text-6xl mb-4">❌</div>
        <h2 className="text-2xl font-bold text-white mb-2">Cleaning Not Found</h2>
        <p className="text-gray-400 mb-6">
          The cleaning task you're looking for doesn't exist.
        </p>
        <Link
          href="/admin/operations/cleaning"
          className="btn-primary px-6 py-3 rounded-lg inline-block"
        >
          Back to Schedule
        </Link>
      </div>
    );
  }

  const cleaner = cleaning.cleaner_id ? availableCleaners.find(c => c.id === cleaning.cleaner_id) : null;
  const scheduledDate = new Date(cleaning.scheduled_date);

  const typeLabels = {
    turnover: "Turnover Cleaning",
    deep: "Deep Cleaning",
    maintenance: "Maintenance Cleaning",
    inspection: "Inspection",
  };

  const handleChecklistUpdate = (items: ChecklistItem[]) => {
    updateChecklist(id, items);
  };

  const handleStartCleaning = () => {
    startCleaning(id);
  };

  const handleCompleteCleaning = () => {
    completeCleaning(id);
  };

  const handleVerifyCleaning = () => {
    verifyCleaning(id);
  };

  const handleAssignCleaner = () => {
    if (selectedCleanerId) {
      assignCleaner(id, selectedCleanerId);
      setShowAssignModal(false);
      setSelectedCleanerId("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/admin/operations/cleaning"
          className="text-sm text-teal-400 hover:text-teal-300 mb-2 inline-block"
        >
          ← Back to Schedule
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold text-white mb-2">
              Unit {cleaning.unit_id.split("-")[1]} - {typeLabels[cleaning.type]}
            </h1>
            <p className="text-gray-400">
              Scheduled for{" "}
              {scheduledDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}{" "}
              at{" "}
              {scheduledDate.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
          </div>
          <CleaningStatusBadge status={cleaning.status} />
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Unit Info */}
        <div className="card-default p-4">
          <div className="text-sm text-gray-400 mb-2">Unit</div>
          <div className="text-xl font-semibold text-white">
            Unit {cleaning.unit_id.split("-")[1]}
          </div>
          {cleaning.booking_id && (
            <div className="text-sm text-gray-400 mt-2">
              Booking: {cleaning.booking_id}
            </div>
          )}
        </div>

        {/* Assigned Cleaner */}
        <div className="card-default p-4">
          <div className="text-sm text-gray-400 mb-2">Assigned To</div>
          {cleaner ? (
            <div>
              <div className="text-xl font-semibold text-white">{cleaner.name}</div>
              <div className="text-sm text-gray-400 mt-1">{cleaner.phone}</div>
            </div>
          ) : (
            <div>
              <div className="text-xl font-semibold text-amber-500">Unassigned</div>
              <button
                onClick={() => setShowAssignModal(true)}
                className="text-sm text-teal-400 hover:text-teal-300 mt-2"
              >
                Assign Cleaner →
              </button>
            </div>
          )}
        </div>

        {/* Timing */}
        <div className="card-default p-4">
          <div className="text-sm text-gray-400 mb-2">Duration</div>
          {cleaning.started_at && cleaning.completed_at ? (
            <div>
              <div className="text-xl font-semibold text-white">
                {Math.round(
                  (new Date(cleaning.completed_at).getTime() -
                    new Date(cleaning.started_at).getTime()) /
                    (1000 * 60)
                )}{" "}
                minutes
              </div>
              <div className="text-sm text-gray-400 mt-1">
                Started at{" "}
                {new Date(cleaning.started_at).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </div>
            </div>
          ) : cleaning.started_at ? (
            <div>
              <div className="text-xl font-semibold text-amber-500">In Progress</div>
              <div className="text-sm text-gray-400 mt-1">
                Started at{" "}
                {new Date(cleaning.started_at).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </div>
            </div>
          ) : (
            <div className="text-xl font-semibold text-gray-500">Not Started</div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        {cleaning.status === "pending" || cleaning.status === "assigned" ? (
          <button
            onClick={handleStartCleaning}
            className="btn-primary px-6 py-3 rounded-lg font-medium"
          >
            Start Cleaning
          </button>
        ) : null}

        {cleaning.status === "in_progress" ? (
          <button
            onClick={handleCompleteCleaning}
            className="btn-primary px-6 py-3 rounded-lg font-medium"
          >
            Mark as Completed
          </button>
        ) : null}

        {cleaning.status === "completed" ? (
          <button
            onClick={handleVerifyCleaning}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Verify Cleaning
          </button>
        ) : null}

        {cleaning.status === "verified" ? (
          <div className="badge-success px-6 py-3 rounded-lg font-medium">
            ✓ Verified
          </div>
        ) : null}

        <button
          onClick={() => setShowAssignModal(true)}
          className="btn-ghost px-6 py-3 rounded-lg font-medium"
        >
          {cleaning.cleaner_id ? 'Reassign' : 'Assign Cleaner'}
        </button>
      </div>

      {/* Checklist */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">
          Cleaning Checklist
        </h2>
        <CleaningChecklist
          items={cleaning.checklist}
          onUpdate={handleChecklistUpdate}
          readonly={cleaning.status === "verified"}
        />
      </div>

      {/* Notes Section */}
      <div className="card-default p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Notes</h3>
        {cleaning.notes ? (
          <p className="text-gray-300">{cleaning.notes}</p>
        ) : (
          <p className="text-gray-500 italic">No notes added yet</p>
        )}
        <button className="mt-4 text-sm text-teal-400 hover:text-teal-300">
          + Add Note
        </button>
      </div>

      {/* Photos */}
      {cleaning.photos.length > 0 && (
        <div className="card-default p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Photos</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cleaning.photos.map((photo, idx) => (
              <div
                key={idx}
                className="aspect-square rounded-lg bg-gray-800 overflow-hidden"
              >
                <div className="w-full h-full flex items-center justify-center text-gray-600">
                  📷
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="card-default p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Timeline</h3>
        <div className="space-y-4">
          {[
            {
              label: "Created",
              date: cleaning.created_at,
              icon: "📝",
            },
            cleaning.started_at && {
              label: "Started",
              date: cleaning.started_at,
              icon: "▶️",
            },
            cleaning.completed_at && {
              label: "Completed",
              date: cleaning.completed_at,
              icon: "✅",
            },
            cleaning.verified_at && {
              label: "Verified",
              date: cleaning.verified_at,
              icon: "✓",
            },
          ]
            .filter(Boolean)
            .map((event: any, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="text-2xl">{event.icon}</div>
                <div className="flex-1">
                  <div className="font-medium text-white">{event.label}</div>
                  <div className="text-sm text-gray-400">
                    {new Date(event.date).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Assign Cleaner Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-white mb-4">
              {cleaning.cleaner_id ? 'Reassign Cleaner' : 'Assign Cleaner'}
            </h3>
            <p className="text-gray-400 mb-4">
              Select a cleaner for this cleaning task
            </p>
            <select
              value={selectedCleanerId}
              onChange={(e) => setSelectedCleanerId(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 mb-6"
            >
              <option value="">Select a cleaner...</option>
              {availableCleaners.map((cleaner) => (
                <option key={cleaner.id} value={cleaner.id}>
                  {cleaner.name} - {cleaner.phone} (Rating: {cleaner.rating}/5)
                </option>
              ))}
            </select>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setShowAssignModal(false);
                  setSelectedCleanerId("");
                }}
                className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignCleaner}
                disabled={!selectedCleanerId}
                className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
