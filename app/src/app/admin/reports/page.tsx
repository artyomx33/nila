// ============================================
// REPORTS & ANALYTICS PAGE
// Report generation and analytics dashboard
// ============================================

"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";

// Report type icons (separated from config to allow dynamic titles/descriptions)
const reportIcons = {
  revenue: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  occupancy: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  maintenance: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  ownerStatements: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  guestAnalytics: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  performance: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
};

// Report types configuration (static data only)
const reportTypesConfig = [
  { id: "revenue", titleKey: "revenueReport", descriptionKey: "revenueDescription", color: "teal" },
  { id: "occupancy", titleKey: "occupancyReport", descriptionKey: "occupancyDescription", color: "gold" },
  { id: "maintenance", titleKey: "maintenanceReport", descriptionKey: "maintenanceDescription", color: "green" },
  { id: "ownerStatements", titleKey: "ownerStatements", descriptionKey: "ownerStatementsDescription", color: "gold" },
  { id: "guestAnalytics", titleKey: "guestAnalytics", descriptionKey: "guestAnalyticsDescription", color: "teal" },
  { id: "performance", titleKey: "performanceReport", descriptionKey: "performanceDescription", color: "green" },
];

export default function ReportsPage() {
  const t = useTranslations("reports");

  const getIconBoxColor = (color: string) => {
    switch (color) {
      case "teal":
        return "icon-box-teal";
      case "gold":
        return "icon-box-gold";
      case "green":
        return "icon-box-green";
      default:
        return "icon-box-teal";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-white mb-2">
          {t("pageTitle")}
        </h1>
        <p className="text-gray-400">
          {t("pageDescription")}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card-default p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">{t("reportsGenerated")}</p>
              <p className="text-3xl font-bold text-white">0</p>
              <p className="text-xs text-gray-500 mt-1">{t("thisMonth")}</p>
            </div>
            <div className="icon-box icon-box-lg icon-box-teal">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="card-default p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">{t("scheduledReports")}</p>
              <p className="text-3xl font-bold text-white">0</p>
              <p className="text-xs text-gray-500 mt-1">{t("autoGenerated")}</p>
            </div>
            <div className="icon-box icon-box-lg icon-box-gold">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="card-default p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">{t("exportFormats")}</p>
              <p className="text-3xl font-bold text-white">3</p>
              <p className="text-xs text-gray-500 mt-1">PDF, Excel, CSV</p>
            </div>
            <div className="icon-box icon-box-lg icon-box-green">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Report Types Grid */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">{t("availableReports")}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTypesConfig.map((report) => (
            <div key={report.id} className="card-default card-interactive p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className={`icon-box icon-box-xl ${getIconBoxColor(report.color)}`}>
                  {reportIcons[report.id as keyof typeof reportIcons]}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-white">
                      {t(report.titleKey)}
                    </h3>
                    <Badge variant="warning" size="sm">
                      {t("soon")}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {t(report.descriptionKey)}
                  </p>
                </div>
              </div>

              <button
                disabled
                className="w-full btn-secondary py-2.5 px-4 rounded-lg text-sm font-medium opacity-50 cursor-not-allowed"
              >
                <svg className="w-4 h-4 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {t("generateReport")}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Coming Soon Notice */}
      <div className="card-default p-8 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-600/20 mb-4">
            <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-2xl font-serif font-bold text-white mb-2">
            {t("advancedAnalyticsTitle")}
          </h3>
          <p className="text-gray-400 mb-6">
            {t("advancedAnalyticsDescription")}
          </p>
          <div className="flex items-center justify-center gap-3">
            <Badge variant="teal">{t("inDevelopment")}</Badge>
            <Badge variant="muted">Q1 2026</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
