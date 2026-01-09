// ============================================
// BOOKING STATUS TRACKER COMPONENT
// Visual tracking of payment, documents, and contract status
// Shows progress toward booking confirmation
// ============================================

import { useMemo } from "react";
import { NilaBooking, NilaPayment } from "@/lib/supabase/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

interface BookingStatusTrackerProps {
  booking: NilaBooking;
  payments: NilaPayment[];
  onRefresh?: () => void;
}

interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
  required: boolean;
  detail?: string;
  amount?: number;
  currency?: string;
}

export function BookingStatusTracker({
  booking,
  payments,
  onRefresh,
}: BookingStatusTrackerProps) {
  // Calculate payment totals by type
  const paymentSummary = useMemo(() => {
    const securityDeposit = payments
      .filter((p) => p.payment_type === "security_deposit")
      .reduce((sum, p) => sum + Number(p.amount), 0);

    const rent = payments
      .filter((p) => p.payment_type === "rent")
      .reduce((sum, p) => sum + Number(p.amount), 0);

    const reservationDeposit = payments
      .filter((p) => p.payment_type === "reservation_deposit")
      .reduce((sum, p) => sum + Number(p.amount), 0);

    const totalPaid = payments.reduce((sum, p) => sum + Number(p.amount), 0);

    return {
      securityDeposit,
      rent,
      reservationDeposit,
      totalPaid,
    };
  }, [payments]);

  // Determine requirements based on booking type
  const isLongTerm = booking.booking_type === "long_term";
  const securityDepositRequired = Number(booking.security_deposit || 0);
  const monthlyRateRequired = Number(booking.monthly_rate || 0);
  const totalRequired = Number(booking.total);

  // Build checklist items
  const checklist: ChecklistItem[] = useMemo(() => {
    const items: ChecklistItem[] = [];

    // Payment items
    if (isLongTerm) {
      // Long-term booking requirements
      items.push({
        id: "security_deposit",
        label: "Depósito de seguridad",
        completed: paymentSummary.securityDeposit >= securityDepositRequired,
        required: true,
        detail: `${formatCurrency(paymentSummary.securityDeposit, (booking.currency as "MXN" | "USD") || "MXN")} de ${formatCurrency(securityDepositRequired, (booking.currency as "MXN" | "USD") || "MXN")}`,
        amount: paymentSummary.securityDeposit,
        currency: booking.currency,
      });

      items.push({
        id: "first_month_rent",
        label: "Primer mes de renta",
        completed: paymentSummary.rent >= monthlyRateRequired,
        required: true,
        detail: `${formatCurrency(paymentSummary.rent, (booking.currency as "MXN" | "USD") || "MXN")} de ${formatCurrency(monthlyRateRequired, (booking.currency as "MXN" | "USD") || "MXN")}`,
        amount: paymentSummary.rent,
        currency: booking.currency,
      });
    } else {
      // Short-term booking requirements
      items.push({
        id: "full_payment",
        label: "Pago completo",
        completed: paymentSummary.totalPaid >= totalRequired,
        required: true,
        detail: `${formatCurrency(paymentSummary.totalPaid, (booking.currency as "MXN" | "USD") || "MXN")} de ${formatCurrency(totalRequired, (booking.currency as "MXN" | "USD") || "MXN")}`,
        amount: paymentSummary.totalPaid,
        currency: booking.currency,
      });
    }

    // Document items (for long-term bookings)
    if (isLongTerm) {
      items.push({
        id: "passport_uploaded",
        label: "Pasaporte/ID cargado",
        completed: Boolean(booking.guest_passport_url || booking.guest_id_url),
        required: true,
        detail: booking.guest_passport_url || booking.guest_id_url
          ? "Documento cargado"
          : "Pendiente de cargar",
      });
    }

    // Contract item
    items.push({
      id: "contract_signed",
      label: "Contrato firmado",
      completed: booking.contract_status === "signed",
      required: true,
      detail:
        booking.contract_status === "signed"
          ? "Firmado"
          : booking.contract_status === "sent"
          ? "Enviado al huésped"
          : booking.contract_status === "draft"
          ? "En borrador"
          : "No iniciado",
    });

    return items;
  }, [
    isLongTerm,
    booking,
    paymentSummary,
    securityDepositRequired,
    monthlyRateRequired,
    totalRequired,
  ]);

  // Calculate completion percentage
  const requiredItems = checklist.filter((item) => item.required);
  const completedRequired = requiredItems.filter((item) => item.completed).length;
  const completionPercentage = requiredItems.length > 0
    ? Math.round((completedRequired / requiredItems.length) * 100)
    : 0;

  // Check if all requirements are met
  const allRequirementsMet = requiredItems.every((item) => item.completed);
  const canAutoConfirm = allRequirementsMet && booking.status === "pending";

  return (
    <div className="space-y-4">
      {/* Progress Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Estado de confirmación
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {isLongTerm ? "Requisitos para renta de largo plazo" : "Requisitos para reservación"}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            {completionPercentage}%
          </div>
          <div className="text-xs text-gray-500">Completado</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full transition-all duration-300 ${
            completionPercentage === 100
              ? "bg-green-600"
              : completionPercentage >= 50
              ? "bg-teal-500"
              : "bg-yellow-500"
          }`}
          style={{ width: `${completionPercentage}%` }}
        />
      </div>

      {/* Auto-confirm notification */}
      {canAutoConfirm && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0"
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
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-green-900">
                Listo para confirmar
              </h4>
              <p className="text-sm text-green-700 mt-1">
                Todos los requisitos están completos. Esta reservación puede ser confirmada.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Checklist Card */}
      <Card padding="none" className="border border-gray-200 bg-white">
        <div className="divide-y divide-gray-200">
          {checklist.map((item) => (
            <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start">
                {/* Checkbox Icon */}
                <div className="flex-shrink-0 mr-3 mt-0.5">
                  {item.completed ? (
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4
                      className={`text-sm font-medium ${
                        item.completed ? "text-gray-900" : "text-gray-700"
                      }`}
                    >
                      {item.label}
                      {item.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </h4>
                    {item.completed ? (
                      <Badge variant="success" size="sm">
                        Completado
                      </Badge>
                    ) : (
                      <Badge variant="warning" size="sm">
                        Pendiente
                      </Badge>
                    )}
                  </div>
                  {item.detail && (
                    <p
                      className={`text-sm mt-1 ${
                        item.completed ? "text-gray-600" : "text-gray-500"
                      }`}
                    >
                      {item.detail}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Payment Summary */}
      <Card padding="md" className="border border-gray-200 bg-gray-50">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          Resumen de pagos
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total pagado</span>
            <span className="font-semibold text-gray-900">
              {formatCurrency(paymentSummary.totalPaid, (booking.currency as "MXN" | "USD") || "MXN")}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total requerido</span>
            <span className="font-semibold text-gray-900">
              {formatCurrency(
                isLongTerm
                  ? securityDepositRequired + monthlyRateRequired
                  : totalRequired,
                (booking.currency as "MXN" | "USD") || "MXN"
              )}
            </span>
          </div>
          {paymentSummary.totalPaid <
            (isLongTerm
              ? securityDepositRequired + monthlyRateRequired
              : totalRequired) && (
            <div className="flex justify-between text-sm pt-2 border-t border-gray-300">
              <span className="text-red-600 font-medium">Pendiente</span>
              <span className="font-semibold text-red-600">
                {formatCurrency(
                  (isLongTerm
                    ? securityDepositRequired + monthlyRateRequired
                    : totalRequired) - paymentSummary.totalPaid,
                  booking.currency
                )}
              </span>
            </div>
          )}
        </div>

        {/* Payment count */}
        <div className="mt-3 pt-3 border-t border-gray-300">
          <p className="text-xs text-gray-500">
            {payments.length} pago{payments.length !== 1 ? "s" : ""} registrado
            {payments.length !== 1 ? "s" : ""}
          </p>
        </div>
      </Card>

      {/* Refresh button */}
      {onRefresh && (
        <button
          onClick={onRefresh}
          className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Actualizar estado
        </button>
      )}
    </div>
  );
}
