// ============================================
// NILA ESTATE MANAGEMENT - UNITS DATABASE
// Agent 2: Units mock data and CRUD operations
// ============================================

import { Unit, UnitType, UnitStatus } from "@/types";

// Mock Units Data
export const mockUnits: Unit[] = [
  {
    id: "unit-1",
    name: "Casa Azul",
    type: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    floor: 3,
    neighborhood: "Centro Bacalar",
    owner_id: "owner-1",
    amenities: ["wifi", "ac", "pool", "parking", "kitchen", "washer", "tv", "workspace"],
    is_smart: true,
    rental_type: "short",
    pricing: {
      base: 2500,
      high_season: 3500,
      low_season: 2000,
      cleaning_fee: 800,
      currency: "MXN",
    },
    photos: ["/images/units/casa-azul-1.jpg", "/images/units/casa-azul-2.jpg"],
    guide: "Welcome to Casa Azul! Your home away from home in beautiful Bacalar. Check-in is at 3 PM, check-out at 11 AM. WiFi password: bacalar2024. Enjoy your stay!",
    platform_urls: {
      airbnb: "https://airbnb.com/rooms/casa-azul",
      booking: null,
    },
    status: "available",
    created_at: new Date("2025-01-01"),
    updated_at: new Date("2026-01-05"),
  },
  {
    id: "unit-2",
    name: "Villa Laguna",
    type: "villa",
    bedrooms: 4,
    bathrooms: 3,
    floor: 1,
    neighborhood: "Costa del Sol",
    owner_id: "owner-2",
    amenities: ["wifi", "ac", "pool", "parking", "kitchen", "washer", "dryer", "tv", "workspace", "bbq", "garden"],
    is_smart: true,
    rental_type: "short",
    pricing: {
      base: 5500,
      high_season: 7500,
      low_season: 4500,
      cleaning_fee: 1500,
      currency: "MXN",
    },
    photos: ["/images/units/villa-laguna-1.jpg", "/images/units/villa-laguna-2.jpg", "/images/units/villa-laguna-3.jpg"],
    guide: "Welcome to Villa Laguna! Luxury lakefront living awaits you. The villa features a private pool and direct lagoon access.",
    platform_urls: {
      airbnb: "https://airbnb.com/rooms/villa-laguna",
      booking: "https://booking.com/villa-laguna",
    },
    status: "occupied",
    created_at: new Date("2024-11-15"),
    updated_at: new Date("2026-01-07"),
  },
  {
    id: "unit-3",
    name: "Condo Mar",
    type: "condo",
    bedrooms: 1,
    bathrooms: 1,
    floor: 2,
    neighborhood: "Centro Bacalar",
    owner_id: "owner-1",
    amenities: ["wifi", "ac", "pool", "kitchen", "tv"],
    is_smart: false,
    rental_type: "both",
    pricing: {
      base: 1800,
      high_season: 2500,
      low_season: 1500,
      cleaning_fee: 600,
      currency: "MXN",
    },
    photos: ["/images/units/condo-mar-1.jpg"],
    guide: "Cozy condo perfect for couples or solo travelers. Walking distance to the lagoon and downtown.",
    platform_urls: {
      airbnb: "https://airbnb.com/rooms/condo-mar",
      booking: null,
    },
    status: "available",
    created_at: new Date("2025-03-10"),
    updated_at: new Date("2025-12-20"),
  },
  {
    id: "unit-4",
    name: "Penthouse Cielo",
    type: "penthouse",
    bedrooms: 3,
    bathrooms: 2,
    floor: 5,
    neighborhood: "Vista Hermosa",
    owner_id: "owner-3",
    amenities: ["wifi", "ac", "parking", "kitchen", "washer", "dryer", "tv", "workspace", "terrace"],
    is_smart: true,
    rental_type: "short",
    pricing: {
      base: 4200,
      high_season: 6000,
      low_season: 3500,
      cleaning_fee: 1200,
      currency: "MXN",
    },
    photos: ["/images/units/penthouse-cielo-1.jpg", "/images/units/penthouse-cielo-2.jpg"],
    guide: "Stunning penthouse with panoramic views of Laguna Bacalar. The rooftop terrace is perfect for sunset watching.",
    platform_urls: {
      airbnb: null,
      booking: "https://booking.com/penthouse-cielo",
    },
    status: "available",
    created_at: new Date("2024-09-01"),
    updated_at: new Date("2026-01-03"),
  },
  {
    id: "unit-5",
    name: "Studio Paz",
    type: "studio",
    bedrooms: 0,
    bathrooms: 1,
    floor: 1,
    neighborhood: "Centro Bacalar",
    owner_id: "owner-2",
    amenities: ["wifi", "ac", "kitchen", "tv"],
    is_smart: false,
    rental_type: "short",
    pricing: {
      base: 1200,
      high_season: 1800,
      low_season: 1000,
      cleaning_fee: 400,
      currency: "MXN",
    },
    photos: ["/images/units/studio-paz-1.jpg"],
    guide: "Compact and efficient studio apartment. Perfect for budget-conscious travelers.",
    platform_urls: {
      airbnb: "https://airbnb.com/rooms/studio-paz",
      booking: null,
    },
    status: "maintenance",
    created_at: new Date("2025-06-15"),
    updated_at: new Date("2026-01-08"),
  },
  {
    id: "unit-6",
    name: "Casa Paraíso",
    type: "villa",
    bedrooms: 5,
    bathrooms: 4,
    floor: 1,
    neighborhood: "Costa del Sol",
    owner_id: "owner-3",
    amenities: ["wifi", "ac", "pool", "parking", "kitchen", "washer", "dryer", "tv", "workspace", "bbq", "garden", "gym"],
    is_smart: true,
    rental_type: "short",
    pricing: {
      base: 8000,
      high_season: 12000,
      low_season: 6500,
      cleaning_fee: 2000,
      currency: "MXN",
    },
    photos: ["/images/units/casa-paraiso-1.jpg", "/images/units/casa-paraiso-2.jpg", "/images/units/casa-paraiso-3.jpg", "/images/units/casa-paraiso-4.jpg"],
    guide: "Luxury villa with private pool, gym, and beautiful gardens. Perfect for large groups and special events.",
    platform_urls: {
      airbnb: "https://airbnb.com/rooms/casa-paraiso",
      booking: "https://booking.com/casa-paraiso",
    },
    status: "available",
    created_at: new Date("2024-07-20"),
    updated_at: new Date("2026-01-06"),
  },
  {
    id: "unit-7",
    name: "Apartamento Sol",
    type: "apartment",
    bedrooms: 2,
    bathrooms: 1,
    floor: 4,
    neighborhood: "Vista Hermosa",
    owner_id: "owner-1",
    amenities: ["wifi", "ac", "parking", "kitchen", "tv", "workspace"],
    is_smart: false,
    rental_type: "long",
    pricing: {
      base: 2200,
      high_season: 2800,
      low_season: 1900,
      cleaning_fee: 700,
      currency: "MXN",
    },
    photos: ["/images/units/apartamento-sol-1.jpg"],
    guide: "Comfortable apartment with city views. Ideal for long-term stays and remote workers.",
    platform_urls: {
      airbnb: null,
      booking: null,
    },
    status: "occupied",
    created_at: new Date("2025-02-28"),
    updated_at: new Date("2025-12-15"),
  },
  {
    id: "unit-8",
    name: "Condo Luna",
    type: "condo",
    bedrooms: 2,
    bathrooms: 2,
    floor: 3,
    neighborhood: "Centro Bacalar",
    owner_id: "owner-2",
    amenities: ["wifi", "ac", "pool", "parking", "kitchen", "washer", "tv", "workspace"],
    is_smart: true,
    rental_type: "both",
    pricing: {
      base: 2800,
      high_season: 3800,
      low_season: 2300,
      cleaning_fee: 900,
      currency: "MXN",
    },
    photos: ["/images/units/condo-luna-1.jpg", "/images/units/condo-luna-2.jpg"],
    guide: "Modern condo with lagoon views and pool access. Balcony perfect for morning coffee.",
    platform_urls: {
      airbnb: "https://airbnb.com/rooms/condo-luna",
      booking: "https://booking.com/condo-luna",
    },
    status: "available",
    created_at: new Date("2024-12-01"),
    updated_at: new Date("2026-01-04"),
  },
];

// In-memory storage (simulating database)
let units = [...mockUnits];

// CRUD Operations
// ============================================

/**
 * Get all units with optional filtering
 */
export function getUnits(filters?: {
  status?: UnitStatus;
  type?: UnitType;
  owner_id?: string;
  search?: string;
}): Unit[] {
  let filtered = [...units];

  if (filters) {
    if (filters.status) {
      filtered = filtered.filter((unit) => unit.status === filters.status);
    }

    if (filters.type) {
      filtered = filtered.filter((unit) => unit.type === filters.type);
    }

    if (filters.owner_id) {
      filtered = filtered.filter((unit) => unit.owner_id === filters.owner_id);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (unit) =>
          unit.name.toLowerCase().includes(searchLower) ||
          unit.neighborhood.toLowerCase().includes(searchLower)
      );
    }
  }

  return filtered.sort((a, b) => b.created_at.getTime() - a.created_at.getTime());
}

/**
 * Get a single unit by ID
 */
export function getUnit(id: string): Unit | undefined {
  return units.find((unit) => unit.id === id);
}

/**
 * Create a new unit
 */
export function createUnit(unitData: Omit<Unit, "id" | "created_at" | "updated_at">): Unit {
  const newUnit: Unit = {
    ...unitData,
    id: `unit-${Date.now()}`,
    created_at: new Date(),
    updated_at: new Date(),
  };

  units.push(newUnit);
  return newUnit;
}

/**
 * Update an existing unit
 */
export function updateUnit(id: string, updates: Partial<Omit<Unit, "id" | "created_at">>): Unit | null {
  const index = units.findIndex((unit) => unit.id === id);

  if (index === -1) {
    return null;
  }

  units[index] = {
    ...units[index],
    ...updates,
    updated_at: new Date(),
  };

  return units[index];
}

/**
 * Delete a unit
 */
export function deleteUnit(id: string): boolean {
  const index = units.findIndex((unit) => unit.id === id);

  if (index === -1) {
    return false;
  }

  units.splice(index, 1);
  return true;
}

/**
 * Get units by status
 */
export function getUnitsByStatus(status: UnitStatus): Unit[] {
  return getUnits({ status });
}

/**
 * Get units by type
 */
export function getUnitsByType(type: UnitType): Unit[] {
  return getUnits({ type });
}

/**
 * Search units by name or neighborhood
 */
export function searchUnits(query: string): Unit[] {
  return getUnits({ search: query });
}

/**
 * Get unit stats
 */
export function getUnitStats() {
  const total = units.length;
  const available = units.filter((u) => u.status === "available").length;
  const occupied = units.filter((u) => u.status === "occupied").length;
  const maintenance = units.filter((u) => u.status === "maintenance").length;
  const unavailable = units.filter((u) => u.status === "unavailable").length;

  return {
    total,
    available,
    occupied,
    maintenance,
    unavailable,
    occupancy_rate: total > 0 ? Math.round((occupied / total) * 100) : 0,
  };
}

// Aliases for compatibility
export const getAllUnits = () => getUnits();
export const getUnitById = getUnit;
