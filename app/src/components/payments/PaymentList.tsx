// ============================================
// PAYMENT LIST COMPONENT
// Display all payments for a booking
// ============================================

"use client";

import { useTranslations } from "next-intl";
import { Payment } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";

interface PaymentListProps {
  payments: Payment[];
  onDeletePayment?: (paymentId: string) => void;
}

export function PaymentList({ payments, onDeletePayment }: PaymentListProps) {
  const t = useTranslations("payments");
  const tc = useTranslations("common");

  const PAYMENT_TYPE_LABELS: Record<Payment["payment_type"], string> = {
    reservation_deposit: t("reservationDeposit"),
    security_deposit: t("securityDeposit"),
    rent: t("rent"),
    cleaning: t("cleaning"),
    utilities: t("utilities"),
    damage: t("damage"),
    refund: t("refund"),
    other: t("other"),
  };

  const PAYMENT_METHOD_LABELS: Record<Payment["method"], string> = {
    cash: t("cash"),
    card: t("card"),
    transfer: t("transfer"),
    paypal: t("paypal"),
    stripe: t("stripe"),
    other: t("other"),
  };

  if (payments.length === 0) {
    return (
      <div className="text-center py-8">
        <svg
          className="mx-auto h-12 w-12 text-zinc-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-zinc-400">
          {t("noPayments")}
        </h3>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {payments.map((payment) => (
        <div
          key={payment.id}
          className="bg-charcoal-800/40 border border-charcoal-700 rounded-lg p-4 hover:bg-charcoal-800/60 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`px-2 py-0.5 rounded text-xs font-medium ${
                    payment.payment_type === "refund"
                      ? "bg-red-50 text-red-700 border border-red-200"
                      : "bg-teal-50 text-teal-700 border border-teal-200"
                  }`}
                >
                  {PAYMENT_TYPE_LABELS[payment.payment_type]}
                </span>
                <span className="px-2 py-0.5 rounded text-xs bg-charcoal-700 text-zinc-300 border border-charcoal-600">
                  {PAYMENT_METHOD_LABELS[payment.method]}
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-2">
                <span
                  className={`text-lg font-semibold ${
                    payment.payment_type === "refund"
                      ? "text-red-400"
                      : "text-white"
                  }`}
                >
                  {payment.payment_type === "refund" ? "-" : ""}
                  {formatCurrency(payment.amount, payment.currency)}
                </span>
              </div>

              <div className="text-xs text-zinc-500 space-y-1">
                <div className="flex items-center gap-1">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{formatDate(payment.paid_at)}</span>
                </div>

                {payment.reference && (
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    <span className="text-zinc-400">
                      {t("reference")}: {payment.reference}
                    </span>
                  </div>
                )}

                {payment.notes && (
                  <div className="mt-2 text-zinc-400 text-xs bg-charcoal-900/50 p-2 rounded">
                    {payment.notes}
                  </div>
                )}
              </div>
            </div>

            {onDeletePayment && (
              <button
                onClick={() => onDeletePayment(payment.id)}
                className="ml-2 p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-50/10 rounded transition-colors"
                title={tc("delete")}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PaymentList;
