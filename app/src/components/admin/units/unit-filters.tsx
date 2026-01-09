// ============================================
// UNIT FILTERS COMPONENT
// Agent 2: Filter controls for units list
// ============================================

"use client";

import React from "react";
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
  const statusOptions: SelectOption[] = [
    { value: "all", label: "All Statuses" },
    { value: "available", label: "Available" },
    { value: "occupied", label: "Occupied" },
    { value: "maintenance", label: "Maintenance" },
    { value: "unavailable", label: "Unavailable" },
  ];

  const typeOptions: SelectOption[] = [
    { value: "all", label: "All Types" },
    { value: "apartment", label: "Apartment" },
    { value: "condo", label: "Condo" },
    { value: "villa", label: "Villa" },
    { value: "studio", label: "Studio" },
    { value: "penthouse", label: "Penthouse" },
  ];

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="w-full md:w-96">
        <Input
          type="search"
          placeholder="Search by name or neighborhood..."
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
            All
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
            Available
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
            Occupied
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
            Maintenance
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
              <span className="text-sm text-gray-400">Active filters:</span>
              {selectedStatus !== "all" && (
                <Badge variant="teal" size="sm">
                  Status: {selectedStatus}
                </Badge>
              )}
              {selectedType !== "all" && (
                <Badge variant="teal" size="sm">
                  Type: {selectedType}
                </Badge>
              )}
              {searchQuery && (
                <Badge variant="teal" size="sm">
                  Search: &quot;{searchQuery}&quot;
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
                Clear all
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
