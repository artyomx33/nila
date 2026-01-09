// ============================================
// CONTRACT STATUS BADGE
// Badge component for contract status display
// ============================================

import { Badge } from "@/components/ui/badge";

type ContractStatus = "not_needed" | "draft" | "sent" | "signed";

interface ContractStatusBadgeProps {
  status: ContractStatus | null | undefined;
}

export function ContractStatusBadge({ status }: ContractStatusBadgeProps) {
  if (!status || status === "not_needed") {
    return null;
  }

  const statusConfig: Record<ContractStatus, { label: string; variant: "muted" | "teal" | "warning" | "success" }> = {
    not_needed: { label: "N/A", variant: "muted" },
    draft: { label: "Contract Draft", variant: "muted" },
    sent: { label: "Contract Sent", variant: "warning" },
    signed: { label: "Contract Signed", variant: "success" },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  );
}
