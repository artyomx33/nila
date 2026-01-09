// ============================================
// Cleaning Status Badge Component
// ============================================

import { CleaningStatus } from "@/types";

interface CleaningStatusBadgeProps {
  status: CleaningStatus;
  size?: "sm" | "md";
}

const statusConfig: Record<
  CleaningStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Pending",
    className: "badge-muted",
  },
  assigned: {
    label: "Assigned",
    className: "badge-teal",
  },
  in_progress: {
    label: "In Progress",
    className: "badge-warning",
  },
  completed: {
    label: "Completed",
    className: "badge-success",
  },
  verified: {
    label: "Verified",
    className: "badge-teal",
  },
};

export function CleaningStatusBadge({ status, size = "md" }: CleaningStatusBadgeProps) {
  const config = statusConfig[status];
  const sizeClass = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1";

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${config.className} ${sizeClass}`}
    >
      {config.label}
    </span>
  );
}
