// ============================================
// Cleaning Checklist Component
// ============================================

"use client";

import { useState } from "react";
import { ChecklistItem } from "@/types";

interface CleaningChecklistProps {
  items: ChecklistItem[];
  onUpdate?: (items: ChecklistItem[]) => void;
  readonly?: boolean;
}

export function CleaningChecklist({
  items,
  onUpdate,
  readonly = false,
}: CleaningChecklistProps) {
  const [checklistItems, setChecklistItems] = useState(items);

  const toggleItem = (itemId: string) => {
    if (readonly) return;

    const updatedItems = checklistItems.map((item) =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    setChecklistItems(updatedItems);
    onUpdate?.(updatedItems);
  };

  // Group items by room/area
  const groupedItems = checklistItems.reduce((acc, item) => {
    const room = item.label.split(" - ")[0];
    if (!acc[room]) {
      acc[room] = [];
    }
    acc[room].push(item);
    return acc;
  }, {} as Record<string, ChecklistItem[]>);

  const completedCount = checklistItems.filter((item) => item.completed).length;
  const totalCount = checklistItems.length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="card-default p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-white">Checklist Progress</h3>
          <span className="text-2xl font-bold text-teal-400">{progress}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-teal-600 to-teal-400 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-sm text-gray-400 mt-2">
          {completedCount} of {totalCount} items completed
        </div>
      </div>

      {/* Checklist items grouped by room */}
      <div className="space-y-6">
        {Object.entries(groupedItems).map(([room, roomItems]) => {
          const roomCompleted = roomItems.filter((item) => item.completed).length;
          const roomTotal = roomItems.length;
          const roomProgress = Math.round((roomCompleted / roomTotal) * 100);

          return (
            <div key={room} className="card-default p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">{room}</h4>
                <span className="text-sm text-gray-400">
                  {roomCompleted}/{roomTotal}
                </span>
              </div>

              {/* Room progress */}
              <div className="w-full bg-gray-700 rounded-full h-1.5 mb-4">
                <div
                  className="bg-teal-500 h-1.5 rounded-full transition-all"
                  style={{ width: `${roomProgress}%` }}
                />
              </div>

              {/* Items */}
              <div className="space-y-2">
                {roomItems.map((item) => (
                  <label
                    key={item.id}
                    className={`flex items-start gap-3 p-3 rounded-lg transition-colors cursor-pointer ${
                      item.completed
                        ? "bg-teal-500/10 border border-teal-500/30"
                        : "bg-gray-800/50 hover:bg-gray-800 border border-transparent"
                    } ${readonly ? "cursor-default" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleItem(item.id)}
                      disabled={readonly}
                      className="mt-0.5 w-5 h-5 rounded border-gray-600 text-teal-600 focus:ring-teal-500 focus:ring-offset-gray-900 cursor-pointer disabled:cursor-default"
                    />
                    <div className="flex-1">
                      <span
                        className={`text-sm ${
                          item.completed
                            ? "text-gray-300 line-through"
                            : "text-white"
                        }`}
                      >
                        {item.label.split(" - ")[1] || item.label}
                      </span>
                      {item.notes && (
                        <p className="text-xs text-gray-400 mt-1">{item.notes}</p>
                      )}
                      {item.photo_url && (
                        <div className="mt-2">
                          <img
                            src={item.photo_url}
                            alt="Checklist item"
                            className="rounded-lg max-w-xs"
                          />
                        </div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {!readonly && (
        <div className="card-default p-4 border-2 border-dashed border-gray-700">
          <div className="text-center text-gray-400">
            <svg
              className="w-8 h-8 mx-auto mb-2 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="text-sm">Upload photos for documentation</p>
            <button className="mt-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-white transition-colors">
              Choose Files
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
