// ============================================
// BOOKING FORM COMPONENT
// Create/Edit form for short-term and long-term bookings
// ============================================

"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Booking, BookingSource, PaymentStatus } from "@/types";
import { useBookingsStore } from "@/lib/stores/bookings-store";
import { useUnitsStore } from "@/lib/stores/units-store";
import { calculateNights } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface BookingFormProps {
  booking?: Booking;
  mode: "create" | "edit";
  defaultUnitId?: string;
}

type BookingType = "short_term" | "long_term";

export function BookingForm({ booking, mode, defaultUnitId }: BookingFormProps) {
  const router = useRouter();
  const { addBooking, updateBooking, isUnitAvailable } = useBookingsStore();
  const { getUnits } = useUnitsStore();
  const units = getUnits();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form state
  const [formData, setFormData] = useState({
    // Booking type
    booking_type: (booking as any)?.booking_type || ("short_term" as BookingType),
    // Unit
    unit_id: booking?.unit_id || defaultUnitId || "",
    // Guest info
    guest_name: booking?.guest.name || "",
    guest_email: booking?.guest.email || "",
    guest_phone: booking?.guest.phone || "",
    guest_nationality: booking?.guest.nationality || "",
    guest_count: booking?.guest.guests_count || 1,
    guest_notes: booking?.guest.notes || "",
    // Dates
    check_in: booking?.check_in
      ? new Date(booking.check_in).toISOString().split("T")[0]
      : "",
    check_out: booking?.check_out
      ? new Date(booking.check_out).toISOString().split("T")[0]
      : "",
    // Source
    source: booking?.source || ("direct" as BookingSource),
    // Short-term pricing
    nightly_rate: booking?.pricing.nightly_rate || 0,
    cleaning_fee: booking?.pricing.cleaning_fee || 0,
    taxes_percent: booking?.pricing.taxes
      ? Math.round((booking.pricing.taxes / booking.pricing.subtotal) * 100)
      : 16,
    // Long-term pricing
    monthly_rate: (booking as any)?.monthly_rate || 0,
    security_deposit: (booking as any)?.security_deposit || 0,
    // Utilities
    wifi_included: (booking as any)?.wifi_included ?? true,
    electricity_included: (booking as any)?.electricity_included ?? false,
    water_fee_monthly: (booking as any)?.water_fee_monthly || 0,
    // Currency & payment
    currency: booking?.pricing.currency || ("MXN" as "MXN" | "USD"),
    payment_status: booking?.payment_status || ("pending" as PaymentStatus),
    // Contract
    contract_status: (booking as any)?.contract_status || "not_needed",
    // Notes
    notes: booking?.notes || "",
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Calculate pricing based on booking type
  const pricing = useMemo(() => {
    if (!formData.check_in || !formData.check_out) return null;

    const checkIn = new Date(formData.check_in);
    const checkOut = new Date(formData.check_out);
    const nights = calculateNights(checkIn, checkOut);

    if (formData.booking_type === "long_term") {
      // Long-term: monthly rate
      const months = Math.ceil(nights / 30);
      const rentTotal = formData.monthly_rate * months;
      const waterTotal = formData.water_fee_monthly * months;
      const total = rentTotal + waterTotal + formData.security_deposit;

      return {
        nights,
        months,
        rentTotal,
        waterTotal,
        securityDeposit: formData.security_deposit,
        total,
        type: "long_term" as const,
      };
    } else {
      // Short-term: nightly rate
      const subtotal = formData.nightly_rate * nights;
      const taxes = Math.round(subtotal * (formData.taxes_percent / 100));
      const total = subtotal + formData.cleaning_fee + taxes;

      return {
        nights,
        subtotal,
        taxes,
        cleaningFee: formData.cleaning_fee,
        total,
        type: "short_term" as const,
      };
    }
  }, [formData]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.unit_id) {
      newErrors.unit_id = "Unit is required";
    }
    if (!formData.guest_name.trim()) {
      newErrors.guest_name = "Guest name is required";
    }
    if (!formData.guest_phone.trim()) {
      newErrors.guest_phone = "Guest phone is required";
    }
    if (!formData.check_in) {
      newErrors.check_in = "Check-in date is required";
    }
    if (!formData.check_out) {
      newErrors.check_out = "Check-out date is required";
    }
    if (formData.check_in && formData.check_out) {
      const checkIn = new Date(formData.check_in);
      const checkOut = new Date(formData.check_out);
      if (checkOut <= checkIn) {
        newErrors.check_out = "Check-out must be after check-in";
      }
    }

    // Pricing validation based on type
    if (formData.booking_type === "long_term") {
      if (formData.monthly_rate <= 0) {
        newErrors.monthly_rate = "Monthly rate must be greater than 0";
      }
    } else {
      if (formData.nightly_rate <= 0) {
        newErrors.nightly_rate = "Nightly rate must be greater than 0";
      }
    }

    if (formData.guest_count < 1) {
      newErrors.guest_count = "At least 1 guest is required";
    }

    // Check unit availability
    if (
      formData.unit_id &&
      formData.check_in &&
      formData.check_out &&
      !newErrors.check_out
    ) {
      const checkIn = new Date(formData.check_in);
      const checkOut = new Date(formData.check_out);
      const available = isUnitAvailable(
        formData.unit_id,
        checkIn,
        checkOut,
        booking?.id
      );
      if (!available) {
        newErrors.unit_id = "Unit is not available for these dates";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate() || !pricing) {
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingData = {
        unit_id: formData.unit_id,
        guest: {
          name: formData.guest_name,
          email: formData.guest_email,
          phone: formData.guest_phone,
          nationality: formData.guest_nationality,
          guests_count: formData.guest_count,
          notes: formData.guest_notes || undefined,
        },
        check_in: new Date(formData.check_in),
        check_out: new Date(formData.check_out),
        source: formData.source,
        status: booking?.status || ("pending" as const),
        pricing:
          pricing.type === "short_term"
            ? {
                nightly_rate: formData.nightly_rate,
                nights: pricing.nights,
                subtotal: pricing.subtotal,
                cleaning_fee: pricing.cleaningFee,
                taxes: pricing.taxes,
                total: pricing.total,
                currency: formData.currency,
              }
            : {
                nightly_rate: 0, // Not used for long-term
                nights: pricing.nights,
                subtotal: pricing.rentTotal,
                cleaning_fee: 0,
                taxes: 0,
                total: pricing.total,
                currency: formData.currency,
              },
        payment_status: formData.payment_status,
        notes: formData.notes || null,
        contract_url: booking?.contract_url,
        contract_signed_at: booking?.contract_signed_at,
        // Extended fields (cast as any for now until types are updated in @/types)
        ...(formData.booking_type === "long_term" && {
          booking_type: "long_term",
          monthly_rate: formData.monthly_rate,
          security_deposit: formData.security_deposit,
          deposit_status: "pending",
          wifi_included: formData.wifi_included,
          electricity_included: formData.electricity_included,
          water_fee_monthly: formData.water_fee_monthly,
          contract_status: "draft",
        }),
      };

      if (mode === "create") {
        const newBooking = addBooking(bookingData as any);
        router.push(`/admin/bookings/${newBooking.id}`);
      } else if (booking) {
        const updated = updateBooking(booking.id, bookingData as any);
        if (updated) {
          router.push(`/admin/bookings/${booking.id}`);
        }
      }
    } catch (error) {
      console.error("Error saving booking:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLongTerm = formData.booking_type === "long_term";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Booking Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleInputChange("booking_type", "short_term")}
              className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                !isLongTerm
                  ? "border-teal-500 bg-teal-500/10 text-white"
                  : "border-gray-700 bg-gray-800/30 text-gray-400 hover:border-gray-600"
              }`}
            >
              <div className="text-lg font-medium mb-1">Short-Term</div>
              <div className="text-sm opacity-70">
                Nightly rates, vacation rentals
              </div>
            </button>
            <button
              type="button"
              onClick={() => handleInputChange("booking_type", "long_term")}
              className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                isLongTerm
                  ? "border-teal-500 bg-teal-500/10 text-white"
                  : "border-gray-700 bg-gray-800/30 text-gray-400 hover:border-gray-600"
              }`}
            >
              <div className="text-lg font-medium mb-1">Long-Term</div>
              <div className="text-sm opacity-70">
                Monthly rates, contracts, deposits
              </div>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Guest Information */}
      <Card>
        <CardHeader>
          <CardTitle>Guest Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Guest Name *"
              value={formData.guest_name}
              onChange={(e) => handleInputChange("guest_name", e.target.value)}
              error={errors.guest_name}
              placeholder="Mela Copito"
            />
            <Input
              label="Email"
              type="email"
              value={formData.guest_email}
              onChange={(e) => handleInputChange("guest_email", e.target.value)}
              error={errors.guest_email}
              placeholder="guest@example.com"
            />
            <Input
              label="Phone *"
              type="tel"
              value={formData.guest_phone}
              onChange={(e) => handleInputChange("guest_phone", e.target.value)}
              error={errors.guest_phone}
              placeholder="+52 998 123 4567"
            />
            <Input
              label="Nationality"
              value={formData.guest_nationality}
              onChange={(e) =>
                handleInputChange("guest_nationality", e.target.value)
              }
              placeholder="Mexican"
            />
            <Input
              label="Number of Guests"
              type="number"
              value={formData.guest_count}
              onChange={(e) =>
                handleInputChange("guest_count", parseInt(e.target.value))
              }
              error={errors.guest_count}
              min="1"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Guest Notes
            </label>
            <textarea
              value={formData.guest_notes}
              onChange={(e) => handleInputChange("guest_notes", e.target.value)}
              rows={2}
              placeholder="Special requests, preferences, etc."
              className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </CardContent>
      </Card>

      {/* Booking Details */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Unit *"
              value={formData.unit_id}
              onChange={(e) => handleInputChange("unit_id", e.target.value)}
              error={errors.unit_id}
              options={[
                { value: "", label: "Select a unit..." },
                ...units.map((unit) => ({
                  value: unit.id,
                  label: `${unit.name} - ${unit.neighborhood}`,
                })),
              ]}
            />
            <Select
              label="Source"
              value={formData.source}
              onChange={(e) => handleInputChange("source", e.target.value)}
              options={[
                { value: "direct", label: "Direct Booking" },
                { value: "airbnb", label: "Airbnb" },
                { value: "booking", label: "Booking.com" },
                { value: "owner", label: "Owner" },
              ]}
            />
            <Input
              label="Check-in Date *"
              type="date"
              value={formData.check_in}
              onChange={(e) => handleInputChange("check_in", e.target.value)}
              error={errors.check_in}
            />
            <Input
              label="Check-out Date *"
              type="date"
              value={formData.check_out}
              onChange={(e) => handleInputChange("check_out", e.target.value)}
              error={errors.check_out}
            />
          </div>
        </CardContent>
      </Card>

      {/* Pricing - Different for short vs long term */}
      <Card>
        <CardHeader>
          <CardTitle>
            {isLongTerm ? "Monthly Pricing" : "Nightly Pricing"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLongTerm ? (
            // Long-term pricing
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Monthly Rent (MXN) *"
                  type="number"
                  value={formData.monthly_rate}
                  onChange={(e) =>
                    handleInputChange("monthly_rate", parseFloat(e.target.value))
                  }
                  error={errors.monthly_rate}
                  min="0"
                  step="100"
                  placeholder="7500"
                />
                <Input
                  label="Security Deposit (MXN)"
                  type="number"
                  value={formData.security_deposit}
                  onChange={(e) =>
                    handleInputChange(
                      "security_deposit",
                      parseFloat(e.target.value)
                    )
                  }
                  min="0"
                  step="100"
                  placeholder="7500"
                />
                <Input
                  label="Water Fee/Month (MXN)"
                  type="number"
                  value={formData.water_fee_monthly}
                  onChange={(e) =>
                    handleInputChange(
                      "water_fee_monthly",
                      parseFloat(e.target.value)
                    )
                  }
                  min="0"
                  step="10"
                  placeholder="50"
                />
              </div>

              {/* Utilities checkboxes */}
              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.wifi_included}
                    onChange={(e) =>
                      handleInputChange("wifi_included", e.target.checked)
                    }
                    className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-teal-500 focus:ring-teal-500"
                  />
                  <span className="text-sm text-gray-300">WiFi Included</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.electricity_included}
                    onChange={(e) =>
                      handleInputChange("electricity_included", e.target.checked)
                    }
                    className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-teal-500 focus:ring-teal-500"
                  />
                  <span className="text-sm text-gray-300">
                    Electricity Included
                  </span>
                </label>
              </div>
            </div>
          ) : (
            // Short-term pricing
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Input
                label="Nightly Rate *"
                type="number"
                value={formData.nightly_rate}
                onChange={(e) =>
                  handleInputChange("nightly_rate", parseFloat(e.target.value))
                }
                error={errors.nightly_rate}
                min="0"
                step="0.01"
              />
              <Input
                label="Cleaning Fee"
                type="number"
                value={formData.cleaning_fee}
                onChange={(e) =>
                  handleInputChange("cleaning_fee", parseFloat(e.target.value))
                }
                min="0"
                step="0.01"
              />
              <Input
                label="Tax Rate (%)"
                type="number"
                value={formData.taxes_percent}
                onChange={(e) =>
                  handleInputChange("taxes_percent", parseFloat(e.target.value))
                }
                min="0"
                max="100"
                step="0.01"
              />
              <Select
                label="Currency"
                value={formData.currency}
                onChange={(e) => handleInputChange("currency", e.target.value)}
                options={[
                  { value: "MXN", label: "MXN (Mexican Peso)" },
                  { value: "USD", label: "USD (US Dollar)" },
                ]}
              />
            </div>
          )}

          {/* Pricing Summary */}
          {pricing && (
            <div className="mt-6 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
              <h4 className="text-sm font-medium text-gray-400 mb-3">
                Pricing Summary
              </h4>
              <div className="space-y-2 text-sm">
                {pricing.type === "long_term" ? (
                  <>
                    <div className="flex justify-between text-gray-300">
                      <span>
                        {pricing.months} month{pricing.months !== 1 ? "s" : ""} ×
                        MXN {formData.monthly_rate.toLocaleString()}
                      </span>
                      <span>MXN {pricing.rentTotal.toLocaleString()}</span>
                    </div>
                    {pricing.waterTotal > 0 && (
                      <div className="flex justify-between text-gray-300">
                        <span>
                          Water ({pricing.months} months × MXN{" "}
                          {formData.water_fee_monthly})
                        </span>
                        <span>MXN {pricing.waterTotal.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-300">
                      <span>Security Deposit (refundable)</span>
                      <span>
                        MXN {pricing.securityDeposit.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold text-white text-base pt-2 border-t border-gray-700">
                      <span>Total Due at Move-in</span>
                      <span>MXN {pricing.total.toLocaleString()}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      {!formData.electricity_included && (
                        <span>* Electricity paid separately by tenant</span>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between text-gray-300">
                      <span>
                        {pricing.nights} night{pricing.nights !== 1 ? "s" : ""} ×{" "}
                        {formData.currency}{" "}
                        {formData.nightly_rate.toLocaleString()}
                      </span>
                      <span>
                        {formData.currency} {pricing.subtotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Cleaning Fee</span>
                      <span>
                        {formData.currency}{" "}
                        {pricing.cleaningFee.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Taxes ({formData.taxes_percent}%)</span>
                      <span>
                        {formData.currency} {pricing.taxes.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold text-white text-base pt-2 border-t border-gray-700">
                      <span>Total</span>
                      <span>
                        {formData.currency} {pricing.total.toLocaleString()}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment & Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Payment & Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Payment Status"
              value={formData.payment_status}
              onChange={(e) =>
                handleInputChange("payment_status", e.target.value)
              }
              options={[
                { value: "pending", label: "Pending" },
                { value: "partial", label: "Partial Payment" },
                { value: "paid", label: "Paid" },
                { value: "refunded", label: "Refunded" },
              ]}
            />
            {isLongTerm && (
              <Select
                label="Contract Status"
                value={formData.contract_status}
                onChange={(e) =>
                  handleInputChange("contract_status", e.target.value)
                }
                options={[
                  { value: "not_needed", label: "Not Needed" },
                  { value: "draft", label: "Draft" },
                  { value: "sent", label: "Sent for Signature" },
                  { value: "signed", label: "Signed" },
                ]}
              />
            )}
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Internal Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              rows={3}
              placeholder="Reserved with 1000 peso deposit. Passport pending."
              className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex items-center justify-end gap-4">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {mode === "create" ? "Create Booking" : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
