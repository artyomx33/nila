// ============================================
// UNITS LIST PAGE
// Agent 2: Main units management page
// ============================================

"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { UnitStatus, UnitType } from "@/types";
import { getUnits, getUnitStats } from "@/lib/db/units";
import { UnitFilters } from "@/components/admin/units/unit-filters";
import { UnitGrid } from "@/components/admin/units/unit-grid";
import { UnitList } from "@/components/admin/units/unit-list";
import { Button } from "@/components/ui/button";

type ViewMode = "grid" | "list";

export default function UnitsPage() {
  const t = useTranslations("units");
  const tCommon = useTranslations("common");
  const tReports = useTranslations("reports");

  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<UnitStatus | "all">("all");
  const [selectedType, setSelectedType] = useState<UnitType | "all">("all");

  // Get units data
  const allUnits = useMemo(() => getUnits(), []);
  const stats = useMemo(() => getUnitStats(), []);

  // Filter units based on current filters
  const filteredUnits = useMemo(() => {
    return getUnits({
      status: selectedStatus !== "all" ? selectedStatus : undefined,
      type: selectedType !== "all" ? selectedType : undefined,
      search: searchQuery || undefined,
    });
  }, [searchQuery, selectedStatus, selectedType]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold text-white">{t("title")}</h1>
            <p className="text-gray-400 mt-1">
              {t("manageProperties")}
            </p>
          </div>
          <Link href="/admin/units/new">
            <Button variant="primary" size="lg">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {t("addUnit")}
            </Button>
          </Link>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <div className="text-sm text-gray-400">{t("totalUnits")}</div>
          </div>
          <div className="bg-gray-800/50 border border-green-500/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-400">{stats.available}</div>
            <div className="text-sm text-gray-400">{t("available")}</div>
          </div>
          <div className="bg-gray-800/50 border border-orange-500/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-orange-400">{stats.occupied}</div>
            <div className="text-sm text-gray-400">{t("occupied")}</div>
          </div>
          <div className="bg-gray-800/50 border border-red-500/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-red-400">{stats.maintenance}</div>
            <div className="text-sm text-gray-400">{t("maintenance")}</div>
          </div>
          <div className="bg-gray-800/50 border border-teal-500/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-teal-400">{stats.occupancy_rate}%</div>
            <div className="text-sm text-gray-400">{tReports("occupancy")}</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <UnitFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          stats={stats}
        />
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-gray-400">
          {t("showingUnits", { filtered: filteredUnits.length, total: allUnits.length })}
        </div>

        <div className="flex items-center gap-2 bg-gray-800/50 border border-gray-700 rounded-lg p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              viewMode === "grid"
                ? "bg-teal-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              viewMode === "list"
                ? "bg-teal-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Units Display */}
      {viewMode === "grid" ? (
        <UnitGrid units={filteredUnits} />
      ) : (
        <UnitList units={filteredUnits} />
      )}
    </div>
  );
}
