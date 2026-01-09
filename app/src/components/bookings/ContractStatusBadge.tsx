// ============================================
// CONTRACT STATUS BADGE
// Badge component for contract status display
// ============================================

"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";

type ContractStatus = "not_needed" | "draft" | "sent" | "signed";

interface ContractStatusBadgeProps {
  status: ContractStatus | null | undefined;
}

export function ContractStatusBadge({ status }: ContractStatusBadgeProps) {
  const t = useTranslations("contract");

  if (!status || status === "not_needed") {
    return null;
  }

  const statusConfig: Record<ContractStatus, { key: string; variant: "muted" | "teal" | "warning" | "success" }> = {
    not_needed: { key: "notNeeded", variant: "muted" },
    draft: { key: "draft", variant: "muted" },
    sent: { key: "sent", variant: "warning" },
    signed: { key: "signed", variant: "success" },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant}>
      {t(config.key)}
    </Badge>
  );
}
