// ============================================
// UNIT FILTERS COMPONENT
// Agent 2: Filter controls for units list
// ============================================

"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { UnitStatus, UnitType } from "@/types";
import { Input } from "@/components/ui/input";
import { Select, SelectOption } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface UnitFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedStatus: UnitStatus | "all";
  onStatusChange: (status: UnitStatus | "all") => void;
  selectedType: UnitType | "all";
  onTypeChange: (type: UnitType | "all") => void;
  stats?: {
    total: number;
    available: number;
    occupied: number;
    maintenance: number;
  };
}

export function UnitFilters({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedType,
  onTypeChange,
  stats,
}: UnitFiltersProps) {
  const t = useTranslations("units");

  const statusOptions: SelectOption[] = [
    { value: "all", label: t("allStatuses") },
    { value: "available", label: t("available") },
    { value: "occupied", label: t("occupied") },
    { value: "maintenance", label: t("maintenance") },
    { value: "unavailable", label: t("unavailable") },
  ];

  const typeOptions: SelectOption[] = [
    { value: "all", label: t("allTypes") },
    { value: "apartment", label: t("apartment") },
    { value: "condo", label: t("condo") },
    { value: "villa", label: t("villa") },
    { value: "studio", label: t("studio") },
    { value: "penthouse", label: t("penthouse") },
  ];

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="w-full md:w-96">
        <Input
          type="search"
          placeholder={t("searchByNameNeighborhood")}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Filter Chips and Dropdowns */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Status Filter Chips */}
        <div className="flex gap-2">
          <button
            onClick={() => onStatusChange("all")}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedStatus === "all"
                ? "bg-teal-500 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {t("allUnits")}
            {stats && <span className="ml-1.5">({stats.total})</span>}
          </button>
          <button
            onClick={() => onStatusChange("available")}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedStatus === "available"
                ? "bg-green-500 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {t("available")}
            {stats && <span className="ml-1.5">({stats.available})</span>}
          </button>
          <button
            onClick={() => onStatusChange("occupied")}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedStatus === "occupied"
                ? "bg-orange-500 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {t("occupied")}
            {stats && <span className="ml-1.5">({stats.occupied})</span>}
          </button>
          <button
            onClick={() => onStatusChange("maintenance")}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedStatus === "maintenance"
                ? "bg-red-500 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {t("maintenance")}
            {stats && <span className="ml-1.5">({stats.maintenance})</span>}
          </button>
        </div>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-700"></div>

        {/* Type Dropdown */}
        <div className="w-48">
          <Select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value as UnitType | "all")}
            options={typeOptions}
          />
        </div>

        {/* Active Filters Display */}
        {(selectedStatus !== "all" || selectedType !== "all" || searchQuery) && (
          <>
            <div className="h-8 w-px bg-gray-700"></div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">{t("activeFilters")}:</span>
              {selectedStatus !== "all" && (
                <Badge variant="teal" size="sm">
                  {t("status")}: {selectedStatus}
                </Badge>
              )}
              {selectedType !== "all" && (
                <Badge variant="teal" size="sm">
                  {t("type")}: {selectedType}
                </Badge>
              )}
              {searchQuery && (
                <Badge variant="teal" size="sm">
                  {t("searchPlaceholder").split(" ")[0]}: &quot;{searchQuery}&quot;
                </Badge>
              )}
              <button
                onClick={() => {
                  onSearchChange("");
                  onStatusChange("all");
                  onTypeChange("all");
                }}
                className="text-xs text-teal-400 hover:text-teal-300 underline"
              >
                {t("clearAll")}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
