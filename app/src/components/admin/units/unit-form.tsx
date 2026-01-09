// ============================================
// UNIT FORM COMPONENT
// Agent 2: Create/Edit form for units
// ============================================

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Unit, UnitType, RentalType, UnitStatus } from "@/types";
import { useUnitsStore } from "@/lib/stores/units-store";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface UnitFormProps {
  unit?: Unit;
  mode: "create" | "edit";
}

export function UnitForm({ unit, mode }: UnitFormProps) {
  const router = useRouter();
  const { addUnit, updateUnit } = useUnitsStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form state
  const [formData, setFormData] = useState({
    name: unit?.name || "",
    type: unit?.type || ("apartment" as UnitType),
    bedrooms: unit?.bedrooms || 1,
    bathrooms: unit?.bathrooms || 1,
    floor: unit?.floor || 1,
    neighborhood: unit?.neighborhood || "",
    owner_id: unit?.owner_id || "owner-1",
    is_smart: unit?.is_smart || false,
    rental_type: unit?.rental_type || ("short" as RentalType),
    pricing_base: unit?.pricing.base || 0,
    pricing_high_season: unit?.pricing.high_season || 0,
    pricing_low_season: unit?.pricing.low_season || 0,
    pricing_cleaning_fee: unit?.pricing.cleaning_fee || 0,
    pricing_currency: unit?.pricing.currency || ("MXN" as "MXN" | "USD"),
    guide: unit?.guide || "",
    platform_airbnb: unit?.platform_urls.airbnb || "",
    platform_booking: unit?.platform_urls.booking || "",
    status: unit?.status || ("available" as UnitStatus),
    // Amenities (simplified - using checkboxes)
    wifi: unit?.amenities.includes("wifi") || false,
    ac: unit?.amenities.includes("ac") || false,
    pool: unit?.amenities.includes("pool") || false,
    parking: unit?.amenities.includes("parking") || false,
    kitchen: unit?.amenities.includes("kitchen") || false,
    washer: unit?.amenities.includes("washer") || false,
    dryer: unit?.amenities.includes("dryer") || false,
    tv: unit?.amenities.includes("tv") || false,
    workspace: unit?.amenities.includes("workspace") || false,
    bbq: unit?.amenities.includes("bbq") || false,
    garden: unit?.amenities.includes("garden") || false,
    gym: unit?.amenities.includes("gym") || false,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Unit name is required";
    }
    if (!formData.neighborhood.trim()) {
      newErrors.neighborhood = "Neighborhood is required";
    }
    if (formData.bedrooms < 0) {
      newErrors.bedrooms = "Bedrooms must be 0 or more";
    }
    if (formData.bathrooms < 1) {
      newErrors.bathrooms = "At least 1 bathroom is required";
    }
    if (formData.pricing_base <= 0) {
      newErrors.pricing_base = "Base price must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Build amenities array
      const amenities: string[] = [];
      if (formData.wifi) amenities.push("wifi");
      if (formData.ac) amenities.push("ac");
      if (formData.pool) amenities.push("pool");
      if (formData.parking) amenities.push("parking");
      if (formData.kitchen) amenities.push("kitchen");
      if (formData.washer) amenities.push("washer");
      if (formData.dryer) amenities.push("dryer");
      if (formData.tv) amenities.push("tv");
      if (formData.workspace) amenities.push("workspace");
      if (formData.bbq) amenities.push("bbq");
      if (formData.garden) amenities.push("garden");
      if (formData.gym) amenities.push("gym");

      const unitData = {
        name: formData.name,
        type: formData.type,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        floor: formData.floor,
        neighborhood: formData.neighborhood,
        owner_id: formData.owner_id,
        amenities,
        is_smart: formData.is_smart,
        rental_type: formData.rental_type,
        pricing: {
          base: formData.pricing_base,
          high_season: formData.pricing_high_season,
          low_season: formData.pricing_low_season,
          cleaning_fee: formData.pricing_cleaning_fee,
          currency: formData.pricing_currency,
        },
        photos: unit?.photos || [],
        guide: formData.guide || null,
        platform_urls: {
          airbnb: formData.platform_airbnb || null,
          booking: formData.platform_booking || null,
        },
        status: formData.status,
      };

      if (mode === "create") {
        const newUnit = addUnit(unitData);
        router.push(`/admin/units/${newUnit.id}`);
      } else if (unit) {
        const updated = updateUnit(unit.id, unitData);
        if (updated) {
          router.push(`/admin/units/${unit.id}`);
        }
      }
    } catch (error) {
      console.error("Error saving unit:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Unit Name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              error={errors.name}
              placeholder="e.g., Casa Azul"
            />
            <Select
              label="Type"
              value={formData.type}
              onChange={(e) => handleInputChange("type", e.target.value)}
              options={[
                { value: "apartment", label: "Apartment" },
                { value: "condo", label: "Condo" },
                { value: "villa", label: "Villa" },
                { value: "studio", label: "Studio" },
                { value: "penthouse", label: "Penthouse" },
              ]}
            />
            <Input
              label="Bedrooms"
              type="number"
              value={formData.bedrooms}
              onChange={(e) => handleInputChange("bedrooms", parseInt(e.target.value))}
              error={errors.bedrooms}
              min="0"
            />
            <Input
              label="Bathrooms"
              type="number"
              value={formData.bathrooms}
              onChange={(e) => handleInputChange("bathrooms", parseInt(e.target.value))}
              error={errors.bathrooms}
              min="1"
            />
            <Input
              label="Floor"
              type="number"
              value={formData.floor}
              onChange={(e) => handleInputChange("floor", parseInt(e.target.value))}
              min="0"
            />
            <Input
              label="Neighborhood"
              value={formData.neighborhood}
              onChange={(e) => handleInputChange("neighborhood", e.target.value)}
              error={errors.neighborhood}
              placeholder="e.g., Centro Bacalar"
            />
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Rental Type"
              value={formData.rental_type}
              onChange={(e) => handleInputChange("rental_type", e.target.value)}
              options={[
                { value: "short", label: "Short Term" },
                { value: "long", label: "Long Term" },
                { value: "both", label: "Both" },
              ]}
            />
            <Select
              label="Status"
              value={formData.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
              options={[
                { value: "available", label: "Available" },
                { value: "occupied", label: "Occupied" },
                { value: "maintenance", label: "Maintenance" },
                { value: "unavailable", label: "Unavailable" },
              ]}
            />
            <div className="flex items-center mt-8">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_smart}
                  onChange={(e) => handleInputChange("is_smart", e.target.checked)}
                  className="w-5 h-5 rounded border-gray-700 bg-gray-800 text-teal-500 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                />
                <span className="ml-2 text-sm text-gray-300">Smart Home Features</span>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing */}
      <Card>
        <CardHeader>
          <CardTitle>Pricing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              label="Base Rate (per night)"
              type="number"
              value={formData.pricing_base}
              onChange={(e) => handleInputChange("pricing_base", parseFloat(e.target.value))}
              error={errors.pricing_base}
              min="0"
              step="0.01"
            />
            <Input
              label="High Season Rate"
              type="number"
              value={formData.pricing_high_season}
              onChange={(e) => handleInputChange("pricing_high_season", parseFloat(e.target.value))}
              min="0"
              step="0.01"
            />
            <Input
              label="Low Season Rate"
              type="number"
              value={formData.pricing_low_season}
              onChange={(e) => handleInputChange("pricing_low_season", parseFloat(e.target.value))}
              min="0"
              step="0.01"
            />
            <Input
              label="Cleaning Fee"
              type="number"
              value={formData.pricing_cleaning_fee}
              onChange={(e) => handleInputChange("pricing_cleaning_fee", parseFloat(e.target.value))}
              min="0"
              step="0.01"
            />
            <Select
              label="Currency"
              value={formData.pricing_currency}
              onChange={(e) => handleInputChange("pricing_currency", e.target.value)}
              options={[
                { value: "MXN", label: "MXN (Mexican Peso)" },
                { value: "USD", label: "USD (US Dollar)" },
              ]}
            />
          </div>
        </CardContent>
      </Card>

      {/* Amenities */}
      <Card>
        <CardHeader>
          <CardTitle>Amenities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { key: "wifi", label: "WiFi" },
              { key: "ac", label: "Air Conditioning" },
              { key: "pool", label: "Pool" },
              { key: "parking", label: "Parking" },
              { key: "kitchen", label: "Kitchen" },
              { key: "washer", label: "Washer" },
              { key: "dryer", label: "Dryer" },
              { key: "tv", label: "TV" },
              { key: "workspace", label: "Workspace" },
              { key: "bbq", label: "BBQ" },
              { key: "garden", label: "Garden" },
              { key: "gym", label: "Gym" },
            ].map((amenity) => (
              <label key={amenity.key} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData[amenity.key as keyof typeof formData] as boolean}
                  onChange={(e) => handleInputChange(amenity.key, e.target.checked)}
                  className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-teal-500 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                />
                <span className="ml-2 text-sm text-gray-300">{amenity.label}</span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Platform URLs */}
      <Card>
        <CardHeader>
          <CardTitle>Platform URLs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Airbnb URL"
              value={formData.platform_airbnb}
              onChange={(e) => handleInputChange("platform_airbnb", e.target.value)}
              placeholder="https://airbnb.com/rooms/..."
            />
            <Input
              label="Booking.com URL"
              value={formData.platform_booking}
              onChange={(e) => handleInputChange("platform_booking", e.target.value)}
              placeholder="https://booking.com/..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Guest Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Guest Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            value={formData.guide}
            onChange={(e) => handleInputChange("guide", e.target.value)}
            rows={6}
            placeholder="Welcome message, house rules, check-in/out instructions, WiFi password, etc."
            className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
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
          {mode === "create" ? "Create Unit" : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
