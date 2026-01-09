// ============================================
// PAYMENT SUMMARY COMPONENT
// Display payment summary with total paid vs total due
// ============================================

"use client";

import { useTranslations } from "next-intl";
import { formatCurrency } from "@/lib/utils";

interface PaymentSummaryProps {
  totalDue: number;
  totalPaid: number;
  currency: "MXN" | "USD";
  paymentCount: number;
}

export function PaymentSummary({
  totalDue,
  totalPaid,
  currency,
  paymentCount,
}: PaymentSummaryProps) {
  const t = useTranslations("payments");

  const remaining = totalDue - totalPaid;
  const percentPaid = totalDue > 0 ? (totalPaid / totalDue) * 100 : 0;

  const getStatusColor = () => {
    if (remaining <= 0) return "bg-green-500";
    if (percentPaid >= 50) return "bg-yellow-500";
    if (percentPaid > 0) return "bg-orange-500";
    return "bg-red-500";
  };

  const getStatusText = () => {
    if (remaining <= 0) return t("paidInFull");
    if (percentPaid >= 50) return t("partialPayment");
    if (percentPaid > 0) return t("minimalPayment");
    return t("pendingPayment");
  };

  const getStatusBgColor = () => {
    if (remaining <= 0) return "bg-green-50";
    if (percentPaid >= 50) return "bg-yellow-50";
    if (percentPaid > 0) return "bg-orange-50";
    return "bg-red-50";
  };

  const getStatusTextColor = () => {
    if (remaining <= 0) return "text-green-800";
    if (percentPaid >= 50) return "text-yellow-800";
    if (percentPaid > 0) return "text-orange-800";
    return "text-red-800";
  };

  const getStatusBorderColor = () => {
    if (remaining <= 0) return "border-green-200";
    if (percentPaid >= 50) return "border-yellow-200";
    if (percentPaid > 0) return "border-orange-200";
    return "border-red-200";
  };

  return (
    <div className="bg-charcoal-800/60 border border-charcoal-700 rounded-lg p-5">
      {/* Status Badge */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-zinc-300">
          {t("paymentSummary")}
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBgColor()} ${getStatusTextColor()} border ${getStatusBorderColor()}`}
        >
          {getStatusText()}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-zinc-500 mb-1.5">
          <span>{t("percentPaid", { percent: percentPaid.toFixed(0) })}</span>
          <span>{t("paymentsCount", { count: paymentCount })}</span>
        </div>
        <div className="h-2 bg-charcoal-900 rounded-full overflow-hidden">
          <div
            className={`h-full ${getStatusColor()} transition-all duration-500`}
            style={{ width: `${Math.min(percentPaid, 100)}%` }}
          />
        </div>
      </div>

      {/* Amount Details */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-zinc-400">{t("totalDue")}</span>
          <span className="text-base font-semibold text-white">
            {formatCurrency(totalDue, currency)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-zinc-400">{t("totalPaid")}</span>
          <span className="text-base font-semibold text-teal-400">
            {formatCurrency(totalPaid, currency)}
          </span>
        </div>

        <div className="pt-3 border-t border-charcoal-700">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-zinc-300">
              {remaining <= 0 ? t("overpayment") : t("remaining")}
            </span>
            <span
              className={`text-lg font-bold ${
                remaining <= 0
                  ? "text-green-400"
                  : remaining < totalDue * 0.5
                  ? "text-orange-400"
                  : "text-red-400"
              }`}
            >
              {formatCurrency(Math.abs(remaining), currency)}
            </span>
          </div>
        </div>
      </div>

      {/* Warning for overpayment */}
      {remaining < 0 && (
        <div className="mt-4 p-3 bg-green-50/10 border border-green-500/20 rounded-lg">
          <div className="flex items-start gap-2">
            <svg
              className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-xs text-green-400">{t("overpaymentWarning")}</p>
          </div>
        </div>
      )}

      {/* Warning for pending payment */}
      {remaining > 0 && remaining === totalDue && (
        <div className="mt-4 p-3 bg-red-50/10 border border-red-500/20 rounded-lg">
          <div className="flex items-start gap-2">
            <svg
              className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="text-xs text-red-400">{t("noPaymentsWarning")}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentSummary;
