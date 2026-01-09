// ============================================
// UNIT CARD COMPONENT
// Agent 2: Reusable card for unit display
// ============================================

"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Unit } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface UnitCardProps {
  unit: Unit;
}

export function UnitCard({ unit }: UnitCardProps) {
  const t = useTranslations("units");
  const tc = useTranslations("common");

  const statusVariant = {
    available: "success" as const,
    occupied: "warning" as const,
    maintenance: "error" as const,
    unavailable: "muted" as const,
  };

  const typeLabels: Record<string, string> = {
    apartment: t("apartment"),
    condo: t("condo"),
    villa: t("villa"),
    studio: t("studio"),
    penthouse: t("penthouse"),
  };

  const statusLabels: Record<string, string> = {
    available: t("available"),
    occupied: t("occupied"),
    maintenance: t("maintenance"),
    unavailable: t("unavailable"),
  };

  return (
    <Card variant="interactive" padding="none" className="overflow-hidden">
      {/* Image */}
      <div className="relative h-48 bg-gray-700">
        {unit.photos && unit.photos.length > 0 ? (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-900/20 to-gray-800">
            <div className="text-gray-500 text-sm">
              <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <p className="text-xs">{unit.name}</p>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-700">
            <span className="text-gray-500 text-sm">{t("noImage")}</span>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant={statusVariant[unit.status]} size="sm">
            {statusLabels[unit.status]}
          </Badge>
        </div>

        {/* Smart Home Indicator */}
        {unit.is_smart && (
          <div className="absolute top-3 left-3">
            <Badge variant="teal" size="sm">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {t("smart")}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Name and Type */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">{unit.name}</h3>
            <p className="text-sm text-gray-400">{unit.neighborhood}</p>
          </div>
          <Badge variant="muted" size="sm">
            {typeLabels[unit.type]}
          </Badge>
        </div>

        {/* Unit Details */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>{unit.bedrooms} {t("bd")}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>{unit.bathrooms} {t("ba")}</span>
          </div>
          {unit.floor && (
            <div className="flex items-center gap-1">
              <span>{t("floor")} {unit.floor}</span>
            </div>
          )}
        </div>

        {/* Pricing */}
        <div className="mb-4 pb-4 border-b border-gray-700">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-teal-400">
              ${unit.pricing.base.toLocaleString()}
            </span>
            <span className="text-sm text-gray-400">{unit.pricing.currency}/{t("night")}</span>
          </div>
          {unit.pricing.high_season !== unit.pricing.base && (
            <p className="text-xs text-gray-500 mt-1">
              {t("highSeason")}: ${unit.pricing.high_season.toLocaleString()} {unit.pricing.currency}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link href={`/admin/units/${unit.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              {t("viewDetails")}
            </Button>
          </Link>
          <Link href={`/admin/units/${unit.id}`}>
            <Button variant="ghost" size="sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
