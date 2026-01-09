// ============================================
// Priority Badge Component
// ============================================

import { MaintenancePriority } from "@/types";

interface PriorityBadgeProps {
  priority: MaintenancePriority;
  size?: "sm" | "md";
}

const priorityConfig: Record<
  MaintenancePriority,
  { label: string; className: string }
> = {
  low: {
    label: "Low",
    className: "badge-success",
  },
  medium: {
    label: "Medium",
    className: "badge-warning",
  },
  high: {
    label: "High",
    className: "badge-gold",
  },
  urgent: {
    label: "Urgent",
    className: "badge-error",
  },
};

export function PriorityBadge({ priority, size = "md" }: PriorityBadgeProps) {
  const config = priorityConfig[priority];
  const sizeClass = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1";

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${config.className} ${sizeClass}`}
    >
      {config.label}
    </span>
  );
}
