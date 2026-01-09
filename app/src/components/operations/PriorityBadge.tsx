// ============================================
// Priority Badge Component
// ============================================

"use client";

import { MaintenancePriority } from "@/types";
import { useTranslations } from "next-intl";

interface PriorityBadgeProps {
  priority: MaintenancePriority;
  size?: "sm" | "md";
}

const priorityClassNames: Record<MaintenancePriority, string> = {
  low: "badge-success",
  medium: "badge-warning",
  high: "badge-gold",
  urgent: "badge-error",
};

export function PriorityBadge({ priority, size = "md" }: PriorityBadgeProps) {
  const t = useTranslations("operations");

  const priorityLabels: Record<MaintenancePriority, string> = {
    low: t("low"),
    medium: t("medium"),
    high: t("high"),
    urgent: t("urgent"),
  };

  const className = priorityClassNames[priority];
  const label = priorityLabels[priority];
  const sizeClass = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1";

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${className} ${sizeClass}`}
    >
      {label}
    </span>
  );
}
