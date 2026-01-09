// ============================================
// NILA ESTATE MANAGEMENT - CLEANERS DATABASE
// Mock data for cleaners/staff
// ============================================

import { Cleaner, CleanerStatus } from "@/types";

// Mock Cleaners
export const mockCleaners: Cleaner[] = [
  {
    id: "cleaner-1",
    name: "María González",
    phone: "+52 983 123 4567",
    email: "maria.gonzalez@email.com",
    status: "active",
    assigned_cleanings: 3,
    completed_cleanings: 127,
    rating: 4.9,
    created_at: new Date("2024-03-15"),
  },
  {
    id: "cleaner-2",
    name: "Carlos Méndez",
    phone: "+52 983 234 5678",
    email: "carlos.mendez@email.com",
    status: "active",
    assigned_cleanings: 2,
    completed_cleanings: 89,
    rating: 4.7,
    created_at: new Date("2024-06-20"),
  },
  {
    id: "cleaner-3",
    name: "Ana Rodríguez",
    phone: "+52 983 345 6789",
    email: "ana.rodriguez@email.com",
    status: "active",
    assigned_cleanings: 4,
    completed_cleanings: 156,
    rating: 5.0,
    created_at: new Date("2023-11-10"),
  },
  {
    id: "cleaner-4",
    name: "Luis Hernández",
    phone: "+52 983 456 7890",
    email: "luis.hernandez@email.com",
    status: "on_leave",
    assigned_cleanings: 0,
    completed_cleanings: 64,
    rating: 4.6,
    created_at: new Date("2024-08-05"),
  },
  {
    id: "cleaner-5",
    name: "Sofia Martínez",
    phone: "+52 983 567 8901",
    email: "sofia.martinez@email.com",
    status: "active",
    assigned_cleanings: 1,
    completed_cleanings: 43,
    rating: 4.8,
    created_at: new Date("2024-10-12"),
  },
];

// CRUD Functions
export function getCleaners(): Cleaner[] {
  return mockCleaners;
}

export function getCleaner(id: string): Cleaner | undefined {
  return mockCleaners.find((cleaner) => cleaner.id === id);
}

export function getActiveCleaners(): Cleaner[] {
  return mockCleaners.filter((cleaner) => cleaner.status === "active");
}

export function filterCleanersByStatus(status: CleanerStatus): Cleaner[] {
  return mockCleaners.filter((cleaner) => cleaner.status === status);
}

export function createCleaner(data: Omit<Cleaner, "id" | "created_at">): Cleaner {
  const newCleaner: Cleaner = {
    ...data,
    id: `cleaner-${Date.now()}`,
    created_at: new Date(),
  };
  mockCleaners.push(newCleaner);
  return newCleaner;
}

export function updateCleaner(id: string, data: Partial<Cleaner>): Cleaner | undefined {
  const index = mockCleaners.findIndex((cleaner) => cleaner.id === id);
  if (index !== -1) {
    mockCleaners[index] = { ...mockCleaners[index], ...data };
    return mockCleaners[index];
  }
  return undefined;
}

export function deleteCleaner(id: string): boolean {
  const index = mockCleaners.findIndex((cleaner) => cleaner.id === id);
  if (index !== -1) {
    mockCleaners.splice(index, 1);
    return true;
  }
  return false;
}
