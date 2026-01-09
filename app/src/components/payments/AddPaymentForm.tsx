// ============================================
// ADD PAYMENT FORM COMPONENT
// Modal form to record new payments
// ============================================

"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Payment, PaymentType, PaymentMethod } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

interface AddPaymentFormProps {
  bookingId: string;
  totalDue: number;
  currency: "MXN" | "USD";
  onSubmit: (payment: Omit<Payment, "id" | "created_at">) => void;
  onCancel: () => void;
}

export function AddPaymentForm({
  bookingId,
  totalDue,
  currency,
  onSubmit,
  onCancel,
}: AddPaymentFormProps) {
  const t = useTranslations("payments");
  const tc = useTranslations("common");

  const PAYMENT_TYPE_OPTIONS = [
    { value: "reservation_deposit", label: t("reservationDeposit") },
    { value: "security_deposit", label: t("securityDeposit") },
    { value: "rent", label: t("rent") },
    { value: "cleaning", label: t("cleaning") },
    { value: "utilities", label: t("utilities") },
    { value: "damage", label: t("damage") },
    { value: "refund", label: t("refund") },
    { value: "other", label: t("other") },
  ];

  const PAYMENT_METHOD_OPTIONS = [
    { value: "transfer", label: t("transfer") },
    { value: "cash", label: t("cash") },
    { value: "card", label: t("card") },
    { value: "paypal", label: t("paypal") },
    { value: "stripe", label: t("stripe") },
    { value: "other", label: t("other") },
  ];

  const [formData, setFormData] = useState({
    amount: "",
    payment_type: "reservation_deposit" as PaymentType,
    method: "transfer" as PaymentMethod,
    reference: "",
    notes: "",
    paid_at: new Date().toISOString().split("T")[0], // Today's date in YYYY-MM-DD
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: Record<string, string> = {};

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = t("amountRequired");
    }

    if (!formData.paid_at) {
      newErrors.paid_at = t("dateRequired");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Create payment object
    const payment: Omit<Payment, "id" | "created_at"> = {
      booking_id: bookingId,
      amount: parseFloat(formData.amount),
      currency,
      payment_type: formData.payment_type,
      method: formData.method,
      reference: formData.reference || null,
      notes: formData.notes || null,
      paid_at: new Date(formData.paid_at),
    };

    onSubmit(payment);
  };

  const handleQuickAmount = (percentage: number) => {
    const amount = (totalDue * percentage).toFixed(2);
    setFormData({ ...formData, amount });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-charcoal-900 border border-charcoal-700 rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-charcoal-900 border-b border-charcoal-700 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            {t("addPayment")}
          </h2>
          <button
            onClick={onCancel}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Amount with Quick Buttons */}
          <div>
            <Input
              label={t("amount")}
              type="number"
              step="0.01"
              min="0"
              required
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              error={errors.amount}
              placeholder="0.00"
            />
            {totalDue > 0 && (
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickAmount(0.5)}
                  className="px-2 py-1 text-xs bg-charcoal-800 text-zinc-300 rounded hover:bg-charcoal-700 transition-colors"
                >
                  50% ({(totalDue * 0.5).toFixed(2)})
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickAmount(1)}
                  className="px-2 py-1 text-xs bg-teal-600/20 text-teal-400 rounded hover:bg-teal-600/30 transition-colors"
                >
                  {tc("total")} ({totalDue.toFixed(2)})
                </button>
              </div>
            )}
          </div>

          {/* Payment Type */}
          <Select
            label={t("type")}
            required
            value={formData.payment_type}
            onChange={(e) =>
              setFormData({
                ...formData,
                payment_type: e.target.value as PaymentType,
              })
            }
            options={PAYMENT_TYPE_OPTIONS}
          />

          {/* Payment Method */}
          <Select
            label={t("method")}
            required
            value={formData.method}
            onChange={(e) =>
              setFormData({
                ...formData,
                method: e.target.value as PaymentMethod,
              })
            }
            options={PAYMENT_METHOD_OPTIONS}
          />

          {/* Payment Date */}
          <Input
            label={t("paidAt")}
            type="date"
            required
            value={formData.paid_at}
            onChange={(e) =>
              setFormData({ ...formData, paid_at: e.target.value })
            }
            error={errors.paid_at}
          />

          {/* Reference */}
          <Input
            label={t("reference")}
            type="text"
            value={formData.reference}
            onChange={(e) =>
              setFormData({ ...formData, reference: e.target.value })
            }
            placeholder={t("referencePlaceholder")}
            hint={t("referenceHint")}
          />

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">
              {t("notes")}
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder={t("notesPlaceholder")}
              rows={3}
              className="input-themed w-full px-3 py-2 rounded-lg text-sm resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={onCancel}>
              {tc("cancel")}
            </Button>
            <Button type="submit" variant="primary" className="flex-1">
              {t("addPayment")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPaymentForm;
