// ============================================
// UNIT DETAIL PAGE
// Agent 2: Individual unit view and management
// ============================================

"use client";

import React, { use, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { getUnit } from "@/lib/db/units";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UnitForm } from "@/components/admin/units/unit-form";

interface UnitDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function UnitDetailPage({ params }: UnitDetailPageProps) {
  const t = useTranslations("units");
  const tCommon = useTranslations("common");

  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const { id } = use(params);
  const unit = getUnit(id);

  if (!unit) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <svg
              className="w-16 h-16 text-gray-600 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-white mb-2">{t("unitNotFound")}</h3>
            <p className="text-gray-400 mb-6">
              {t("unitNotFoundDesc")}
            </p>
            <Link href="/admin/units">
              <Button variant="primary">{t("backToUnits")}</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

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

  if (isEditing) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <Link href="/admin/units" className="text-teal-400 hover:text-teal-300 text-sm mb-4 inline-block">
              ← {t("backToUnits")}
            </Link>
            <h1 className="text-3xl font-bold text-white">{t("editUnit")}</h1>
            <p className="text-gray-400 mt-1">{t("updateUnitInfo")}</p>
          </div>

          <UnitForm unit={unit} mode="edit" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link href="/admin/units" className="text-teal-400 hover:text-teal-300 text-sm mb-4 inline-block">
            ← {t("backToUnits")}
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">{unit.name}</h1>
                <Badge variant={statusVariant[unit.status]}>{t(unit.status)}</Badge>
                {unit.is_smart && (
                  <Badge variant="teal">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {t("smartHome")}
                  </Badge>
                )}
              </div>
              <p className="text-gray-400">{unit.neighborhood}</p>
            </div>
            <Button variant="primary" onClick={() => setIsEditing(true)}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              {t("editUnit")}
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Photo Gallery */}
            <Card>
              <CardHeader>
                <CardTitle>{t("photos")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {unit.photos && unit.photos.length > 0 ? (
                    unit.photos.map((photo, index) => (
                      <div
                        key={index}
                        className="aspect-video bg-gradient-to-br from-teal-900/20 to-gray-800 rounded-lg flex items-center justify-center"
                      >
                        <div className="text-center">
                          <svg className="w-12 h-12 mx-auto mb-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-xs text-gray-500">{t("photo", { index: index + 1 })}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <svg className="w-12 h-12 mx-auto mb-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm text-gray-500">{t("noPhotosYet")}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>{t("amenities")}</CardTitle>
              </CardHeader>
              <CardContent>
                {unit.amenities && unit.amenities.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {unit.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-2 text-gray-300">
                        <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="capitalize">{amenity}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">{t("noAmenitiesListed")}</p>
                )}
              </CardContent>
            </Card>

            {/* Guest Guide */}
            {unit.guide && (
              <Card>
                <CardHeader>
                  <CardTitle>{t("guestGuide")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 whitespace-pre-wrap">{unit.guide}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>{t("unitInformation")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-sm text-gray-400">{t("type")}</div>
                  <div className="text-white font-medium">{typeLabels[unit.type]}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">{t("bedroomsBathrooms")}</div>
                  <div className="text-white font-medium">{unit.bedrooms} BD / {unit.bathrooms} BA</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">{t("floor")}</div>
                  <div className="text-white font-medium">{t("floor")} {unit.floor}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">{t("rentalType")}</div>
                  <div className="text-white font-medium capitalize">{unit.rental_type} {t("term")}</div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>{t("pricing")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-sm text-gray-400">{t("baseRate")}</div>
                  <div className="text-2xl font-bold text-teal-400">
                    ${unit.pricing.base.toLocaleString()} <span className="text-sm text-gray-500">{unit.pricing.currency}</span>
                  </div>
                  <div className="text-xs text-gray-500">{t("perNight")}</div>
                </div>
                <div className="pt-3 border-t border-gray-700 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">{t("highSeason")}</span>
                    <span className="text-sm text-white">${unit.pricing.high_season.toLocaleString()} {unit.pricing.currency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">{t("lowSeason")}</span>
                    <span className="text-sm text-white">${unit.pricing.low_season.toLocaleString()} {unit.pricing.currency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">{t("cleaningFee")}</span>
                    <span className="text-sm text-white">${unit.pricing.cleaning_fee.toLocaleString()} {unit.pricing.currency}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Platform Links */}
            {(unit.platform_urls.airbnb || unit.platform_urls.booking) && (
              <Card>
                <CardHeader>
                  <CardTitle>{t("platformLinks")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {unit.platform_urls.airbnb && (
                    <a
                      href={unit.platform_urls.airbnb}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-teal-400 hover:text-teal-300"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      {t("viewOnAirbnb")}
                    </a>
                  )}
                  {unit.platform_urls.booking && (
                    <a
                      href={unit.platform_urls.booking}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-teal-400 hover:text-teal-300"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      {t("viewOnBooking")}
                    </a>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
