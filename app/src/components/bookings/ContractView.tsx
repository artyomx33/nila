// ============================================
// CONTRACT VIEW COMPONENT
// Displays rental contract terms for long-term bookings
// ============================================

"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate, formatCurrency } from "@/lib/utils";

interface ContractViewProps {
  booking: {
    id: string;
    guest: {
      name: string;
      email: string;
      phone: string;
      nationality?: string;
    };
    check_in: Date | string;
    check_out: Date | string;
    monthly_rate?: number;
    security_deposit?: number;
    water_fee_monthly?: number;
    wifi_included?: boolean;
    electricity_included?: boolean;
    pricing: {
      currency: "MXN" | "USD";
    };
    contract_status?: string;
  };
  unit: {
    name: string;
    address?: string;
    unit_number?: string;
    bedrooms: number;
    bathrooms: number;
  };
  property?: {
    name: string;
    address?: string;
    city: string;
    state: string;
  };
  onMarkAsSent?: () => void;
  onMarkAsSigned?: () => void;
  readOnly?: boolean;
}

export function ContractView({
  booking,
  unit,
  property,
  onMarkAsSent,
  onMarkAsSigned,
  readOnly = false,
}: ContractViewProps) {
  const checkIn = typeof booking.check_in === "string" ? new Date(booking.check_in) : booking.check_in;
  const checkOut = typeof booking.check_out === "string" ? new Date(booking.check_out) : booking.check_out;

  // Calculate total months
  const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const months = Math.ceil(diffDays / 30);

  const monthlyRent = booking.monthly_rate || 0;
  const securityDeposit = booking.security_deposit || 0;
  const waterFee = booking.water_fee_monthly || 0;
  const totalMonthlyPayment = monthlyRent + waterFee;
  const totalDueAtMoveIn = monthlyRent + waterFee + securityDeposit;

  return (
    <div className="space-y-6">
      {/* Contract Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Rental Contract</CardTitle>
          <p className="text-sm text-zinc-400">
            Long-Term Rental Agreement
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-zinc-400">Contract Date:</span>
              <span className="ml-2 text-white">{formatDate(new Date())}</span>
            </div>
            <div>
              <span className="text-zinc-400">Contract ID:</span>
              <span className="ml-2 text-white">{booking.id}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Parties Section */}
      <Card>
        <CardHeader>
          <CardTitle>Parties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Landlord/Property Manager */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">LANDLORD / PROPERTY MANAGER</h4>
              <div className="text-sm text-zinc-300 space-y-1">
                <p>NILA Property Management</p>
                {property && (
                  <>
                    <p>{property.city}, {property.state}</p>
                  </>
                )}
              </div>
            </div>

            {/* Tenant */}
            <div className="pt-4 border-t border-charcoal-700">
              <h4 className="text-sm font-semibold text-white mb-2">TENANT</h4>
              <div className="text-sm text-zinc-300 space-y-1">
                <p>{booking.guest.name}</p>
                <p>Email: {booking.guest.email}</p>
                <p>Phone: {booking.guest.phone}</p>
                {booking.guest.nationality && <p>Nationality: {booking.guest.nationality}</p>}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Property Details */}
      <Card>
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-400">Property:</span>
              <span className="text-white">{unit.name}</span>
            </div>
            {unit.unit_number && (
              <div className="flex justify-between">
                <span className="text-zinc-400">Unit Number:</span>
                <span className="text-white">{unit.unit_number}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-zinc-400">Bedrooms:</span>
              <span className="text-white">{unit.bedrooms}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Bathrooms:</span>
              <span className="text-white">{unit.bathrooms}</span>
            </div>
            {property && (
              <div className="flex justify-between">
                <span className="text-zinc-400">Address:</span>
                <span className="text-white text-right">
                  {property.address}, {property.city}, {property.state}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Rental Terms */}
      <Card>
        <CardHeader>
          <CardTitle>Rental Terms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Dates */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">RENTAL PERIOD</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-zinc-400">Start Date:</span>
                  <span className="ml-2 text-white">{formatDate(checkIn)}</span>
                </div>
                <div>
                  <span className="text-zinc-400">End Date:</span>
                  <span className="ml-2 text-white">{formatDate(checkOut)}</span>
                </div>
              </div>
              <p className="text-sm text-zinc-400 mt-2">
                Total Duration: {months} month{months !== 1 ? "s" : ""} ({diffDays} days)
              </p>
            </div>

            {/* Rent */}
            <div className="pt-3 border-t border-charcoal-700">
              <h4 className="text-sm font-semibold text-white mb-2">MONTHLY RENT</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Base Rent:</span>
                  <span className="text-white font-semibold">
                    {formatCurrency(monthlyRent, booking.pricing.currency)}
                  </span>
                </div>
                {waterFee > 0 && (
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Water Fee:</span>
                    <span className="text-white">
                      {formatCurrency(waterFee, booking.pricing.currency)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-charcoal-700">
                  <span className="text-white font-semibold">Total Monthly Payment:</span>
                  <span className="text-white font-semibold">
                    {formatCurrency(totalMonthlyPayment, booking.pricing.currency)}
                  </span>
                </div>
              </div>
            </div>

            {/* Security Deposit */}
            <div className="pt-3 border-t border-charcoal-700">
              <h4 className="text-sm font-semibold text-white mb-2">SECURITY DEPOSIT</h4>
              <p className="text-sm text-zinc-300">
                A refundable security deposit of{" "}
                <span className="font-semibold text-white">
                  {formatCurrency(securityDeposit, booking.pricing.currency)}
                </span>{" "}
                is required at move-in. This deposit will be returned within 30 days after move-out,
                subject to property inspection and deductions for any damages beyond normal wear and tear.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Utilities & Services */}
      <Card>
        <CardHeader>
          <CardTitle>Utilities & Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${booking.wifi_included ? "bg-teal-500" : "bg-red-500"}`} />
              <span className="text-zinc-300">
                WiFi: {booking.wifi_included ? "Included" : "Not Included"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${booking.electricity_included ? "bg-teal-500" : "bg-red-500"}`} />
              <span className="text-zinc-300">
                Electricity: {booking.electricity_included ? "Included" : "Paid separately by tenant"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${waterFee === 0 ? "bg-teal-500" : "bg-yellow-500"}`} />
              <span className="text-zinc-300">
                Water: {waterFee === 0 ? "Included" : `${formatCurrency(waterFee, booking.pricing.currency)}/month`}
              </span>
            </div>
          </div>

          {!booking.electricity_included && (
            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-sm text-yellow-200">
                <span className="font-semibold">Note:</span> Tenant is responsible for electricity costs.
                Payment to be made directly to CFE (Federal Electricity Commission).
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Move-in Payment */}
            <div className="p-4 bg-charcoal-800/50 border border-charcoal-700 rounded-lg">
              <h4 className="text-sm font-semibold text-white mb-3">DUE AT MOVE-IN</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-400">First Month Rent:</span>
                  <span className="text-white">
                    {formatCurrency(monthlyRent, booking.pricing.currency)}
                  </span>
                </div>
                {waterFee > 0 && (
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Water Fee:</span>
                    <span className="text-white">
                      {formatCurrency(waterFee, booking.pricing.currency)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-zinc-400">Security Deposit:</span>
                  <span className="text-white">
                    {formatCurrency(securityDeposit, booking.pricing.currency)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-charcoal-600">
                  <span className="text-white font-bold">Total:</span>
                  <span className="text-teal-400 font-bold text-lg">
                    {formatCurrency(totalDueAtMoveIn, booking.pricing.currency)}
                  </span>
                </div>
              </div>
            </div>

            {/* Monthly Payments */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">MONTHLY PAYMENTS</h4>
              <p className="text-sm text-zinc-300">
                Rent is due on the 1st of each month. Payment of{" "}
                <span className="font-semibold text-white">
                  {formatCurrency(totalMonthlyPayment, booking.pricing.currency)}
                </span>{" "}
                per month for the remaining {months - 1} month{months - 1 !== 1 ? "s" : ""}.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms & Conditions */}
      <Card>
        <CardHeader>
          <CardTitle>Terms & Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-zinc-300">
            <div>
              <h4 className="font-semibold text-white mb-1">1. PAYMENT</h4>
              <p>
                Rent is due on the 1st of each month. Late payments after the 5th will incur a
                10% late fee. Payment can be made via bank transfer or cash.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">2. MAINTENANCE</h4>
              <p>
                Tenant must notify landlord of any maintenance issues within 24 hours. Normal wear
                and tear will be covered by landlord. Tenant is responsible for damages caused by
                misuse or negligence.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">3. OCCUPANCY</h4>
              <p>
                The property shall be occupied only by the tenant named in this agreement. No
                subletting is permitted without written consent from the landlord.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">4. EARLY TERMINATION</h4>
              <p>
                Tenant may terminate this agreement with 30 days written notice. Security deposit
                will be returned minus any applicable deductions for damages or unpaid rent.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">5. PROPERTY CONDITION</h4>
              <p>
                Tenant agrees to maintain the property in good condition and return it in the same
                state as received, normal wear and tear excepted.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Signatures */}
      <Card>
        <CardHeader>
          <CardTitle>Signatures</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Landlord Signature */}
            <div>
              <div className="border-b-2 border-charcoal-700 pb-2 mb-2">
                <p className="text-sm text-zinc-400">Landlord Signature</p>
              </div>
              <div className="text-sm text-zinc-300 space-y-1">
                <p>NILA Property Management</p>
                <p>Date: {formatDate(new Date())}</p>
              </div>
            </div>

            {/* Tenant Signature */}
            <div>
              <div className="border-b-2 border-charcoal-700 pb-2 mb-2">
                <p className="text-sm text-zinc-400">Tenant Signature</p>
              </div>
              <div className="text-sm text-zinc-300 space-y-1">
                <p>{booking.guest.name}</p>
                <p>Date: _________________</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      {!readOnly && (
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-charcoal-700">
          <Button
            variant="ghost"
            onClick={() => window.print()}
          >
            Print Contract
          </Button>
          {booking.contract_status === "draft" && onMarkAsSent && (
            <Button
              variant="secondary"
              onClick={onMarkAsSent}
            >
              Mark as Sent
            </Button>
          )}
          {booking.contract_status === "sent" && onMarkAsSigned && (
            <Button
              variant="primary"
              onClick={onMarkAsSigned}
            >
              Mark as Signed
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
