// ============================================
// Cleaning Status Badge Component
// ============================================

"use client";

import { CleaningStatus } from "@/types";
import { useTranslations } from "next-intl";

interface CleaningStatusBadgeProps {
  status: CleaningStatus;
  size?: "sm" | "md";
}

const statusClassNames: Record<CleaningStatus, string> = {
  pending: "badge-muted",
  assigned: "badge-teal",
  in_progress: "badge-warning",
  completed: "badge-success",
  verified: "badge-teal",
};

export function CleaningStatusBadge({ status, size = "md" }: CleaningStatusBadgeProps) {
  const t = useTranslations("operations");

  const statusLabels: Record<CleaningStatus, string> = {
    pending: t("pending"),
    assigned: t("assigned"),
    in_progress: t("inProgress"),
    completed: t("completed"),
    verified: t("verified"),
  };

  const className = statusClassNames[status];
  const label = statusLabels[status];
  const sizeClass = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1";

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${className} ${sizeClass}`}
    >
      {label}
    </span>
  );
}
