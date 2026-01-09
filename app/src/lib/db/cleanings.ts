// ============================================
// NILA ESTATE MANAGEMENT - CLEANINGS DATABASE
// Mock data for cleaning tasks
// ============================================

import { Cleaning, CleaningStatus, CleaningType, ChecklistItem } from "@/types";

// Standard checklist templates
export const standardChecklist: ChecklistItem[] = [
  // Master Bedroom
  { id: "mb-1", label: "Master Bedroom - Change bed linens", completed: false },
  { id: "mb-2", label: "Master Bedroom - Dust all surfaces", completed: false },
  { id: "mb-3", label: "Master Bedroom - Vacuum/mop floor", completed: false },
  { id: "mb-4", label: "Master Bedroom - Clean windows", completed: false },

  // Guest Bedroom
  { id: "gb-1", label: "Guest Bedroom - Change bed linens", completed: false },
  { id: "gb-2", label: "Guest Bedroom - Dust surfaces", completed: false },
  { id: "gb-3", label: "Guest Bedroom - Vacuum/mop floor", completed: false },

  // Bathrooms
  { id: "bath-1", label: "Master Bathroom - Deep clean toilet", completed: false },
  { id: "bath-2", label: "Master Bathroom - Clean shower/tub", completed: false },
  { id: "bath-3", label: "Master Bathroom - Clean sink and mirrors", completed: false },
  { id: "bath-4", label: "Master Bathroom - Replace towels", completed: false },
  { id: "bath-5", label: "Guest Bathroom - Deep clean all fixtures", completed: false },
  { id: "bath-6", label: "Guest Bathroom - Replace towels", completed: false },

  // Kitchen
  { id: "kit-1", label: "Kitchen - Clean countertops and backsplash", completed: false },
  { id: "kit-2", label: "Kitchen - Clean inside/outside refrigerator", completed: false },
  { id: "kit-3", label: "Kitchen - Clean oven and stovetop", completed: false },
  { id: "kit-4", label: "Kitchen - Clean microwave", completed: false },
  { id: "kit-5", label: "Kitchen - Empty and clean trash bins", completed: false },
  { id: "kit-6", label: "Kitchen - Mop floor", completed: false },

  // Living Area
  { id: "liv-1", label: "Living Room - Dust all surfaces and decor", completed: false },
  { id: "liv-2", label: "Living Room - Vacuum/clean sofa and cushions", completed: false },
  { id: "liv-3", label: "Living Room - Vacuum/mop floor", completed: false },
  { id: "liv-4", label: "Living Room - Clean windows and doors", completed: false },

  // General
  { id: "gen-1", label: "Check and restock supplies (toilet paper, soap, etc.)", completed: false },
  { id: "gen-2", label: "Take out all trash", completed: false },
  { id: "gen-3", label: "Check for damages or issues", completed: false },
  { id: "gen-4", label: "Final walkthrough and photos", completed: false },
];

// Mock Cleanings
export const mockCleanings: Cleaning[] = [
  {
    id: "cleaning-1",
    unit_id: "unit-1",
    booking_id: "booking-1",
    scheduled_date: new Date("2026-01-08T11:00:00"),
    cleaner_id: "cleaner-1",
    type: "turnover",
    status: "in_progress",
    checklist: standardChecklist.map((item, idx) => ({
      ...item,
      completed: idx < 5, // First 5 items completed
    })),
    photos: ["/uploads/cleaning-1-before.jpg"],
    notes: "Guest left early, unit is in good condition",
    started_at: new Date("2026-01-08T11:15:00"),
    completed_at: null,
    verified_at: null,
    created_at: new Date("2026-01-05"),
  },
  {
    id: "cleaning-2",
    unit_id: "unit-2",
    booking_id: "booking-2",
    scheduled_date: new Date("2026-01-08T14:00:00"),
    cleaner_id: "cleaner-2",
    type: "turnover",
    status: "pending",
    checklist: [...standardChecklist],
    photos: [],
    notes: null,
    started_at: null,
    completed_at: null,
    verified_at: null,
    created_at: new Date("2026-01-06"),
  },
  {
    id: "cleaning-3",
    unit_id: "unit-3",
    booking_id: null,
    scheduled_date: new Date("2026-01-09T10:00:00"),
    cleaner_id: "cleaner-3",
    type: "deep",
    status: "assigned",
    checklist: [...standardChecklist],
    photos: [],
    notes: "Monthly deep clean",
    started_at: null,
    completed_at: null,
    verified_at: null,
    created_at: new Date("2026-01-02"),
  },
  {
    id: "cleaning-4",
    unit_id: "unit-1",
    booking_id: "booking-3",
    scheduled_date: new Date("2026-01-07T12:00:00"),
    cleaner_id: "cleaner-1",
    type: "turnover",
    status: "completed",
    checklist: standardChecklist.map((item) => ({ ...item, completed: true })),
    photos: [
      "/uploads/cleaning-4-before.jpg",
      "/uploads/cleaning-4-after.jpg",
    ],
    notes: "All items completed successfully",
    started_at: new Date("2026-01-07T12:10:00"),
    completed_at: new Date("2026-01-07T15:30:00"),
    verified_at: null,
    created_at: new Date("2026-01-04"),
  },
  {
    id: "cleaning-5",
    unit_id: "unit-4",
    booking_id: "booking-4",
    scheduled_date: new Date("2026-01-06T11:00:00"),
    cleaner_id: "cleaner-3",
    type: "turnover",
    status: "verified",
    checklist: standardChecklist.map((item) => ({ ...item, completed: true })),
    photos: [
      "/uploads/cleaning-5-before.jpg",
      "/uploads/cleaning-5-after.jpg",
    ],
    notes: "Excellent condition, all checklist items done",
    started_at: new Date("2026-01-06T11:05:00"),
    completed_at: new Date("2026-01-06T14:20:00"),
    verified_at: new Date("2026-01-06T15:00:00"),
    created_at: new Date("2026-01-03"),
  },
  {
    id: "cleaning-6",
    unit_id: "unit-2",
    booking_id: null,
    scheduled_date: new Date("2026-01-10T09:00:00"),
    cleaner_id: null,
    type: "maintenance",
    status: "pending",
    checklist: [
      { id: "m-1", label: "Clean HVAC filters", completed: false },
      { id: "m-2", label: "Deep clean kitchen appliances", completed: false },
      { id: "m-3", label: "Clean windows (inside and out)", completed: false },
      { id: "m-4", label: "Clean balcony/patio", completed: false },
    ],
    photos: [],
    notes: "Maintenance cleaning - no guest checkout",
    started_at: null,
    completed_at: null,
    verified_at: null,
    created_at: new Date("2026-01-05"),
  },
  {
    id: "cleaning-7",
    unit_id: "unit-5",
    booking_id: "booking-5",
    scheduled_date: new Date("2026-01-11T11:00:00"),
    cleaner_id: "cleaner-5",
    type: "turnover",
    status: "assigned",
    checklist: [...standardChecklist],
    photos: [],
    notes: "Back-to-back booking, quick turnaround needed",
    started_at: null,
    completed_at: null,
    verified_at: null,
    created_at: new Date("2026-01-07"),
  },
  {
    id: "cleaning-8",
    unit_id: "unit-3",
    booking_id: "booking-6",
    scheduled_date: new Date("2026-01-12T14:00:00"),
    cleaner_id: null,
    type: "turnover",
    status: "pending",
    checklist: [...standardChecklist],
    photos: [],
    notes: null,
    started_at: null,
    completed_at: null,
    verified_at: null,
    created_at: new Date("2026-01-08"),
  },
];

// CRUD Functions
export function getCleanings(): Cleaning[] {
  return mockCleanings;
}

export function getCleaning(id: string): Cleaning | undefined {
  return mockCleanings.find((cleaning) => cleaning.id === id);
}

export function getCleaningsByStatus(status: CleaningStatus): Cleaning[] {
  return mockCleanings.filter((cleaning) => cleaning.status === status);
}

export function getCleaningsByUnit(unitId: string): Cleaning[] {
  return mockCleanings.filter((cleaning) => cleaning.unit_id === unitId);
}

export function getCleaningsByCleaner(cleanerId: string): Cleaning[] {
  return mockCleanings.filter((cleaning) => cleaning.cleaner_id === cleanerId);
}

export function getTodayCleanings(): Cleaning[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return mockCleanings.filter((cleaning) => {
    const cleaningDate = new Date(cleaning.scheduled_date);
    return cleaningDate >= today && cleaningDate < tomorrow;
  });
}

export function getUpcomingCleanings(days: number = 7): Cleaning[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const futureDate = new Date(today);
  futureDate.setDate(futureDate.getDate() + days);

  return mockCleanings.filter((cleaning) => {
    const cleaningDate = new Date(cleaning.scheduled_date);
    return cleaningDate >= today && cleaningDate < futureDate;
  });
}

export function createCleaning(data: Omit<Cleaning, "id" | "created_at">): Cleaning {
  const newCleaning: Cleaning = {
    ...data,
    id: `cleaning-${Date.now()}`,
    created_at: new Date(),
  };
  mockCleanings.push(newCleaning);
  return newCleaning;
}

export function updateCleaning(id: string, data: Partial<Cleaning>): Cleaning | undefined {
  const index = mockCleanings.findIndex((cleaning) => cleaning.id === id);
  if (index !== -1) {
    mockCleanings[index] = { ...mockCleanings[index], ...data };
    return mockCleanings[index];
  }
  return undefined;
}

export function deleteCleaning(id: string): boolean {
  const index = mockCleanings.findIndex((cleaning) => cleaning.id === id);
  if (index !== -1) {
    mockCleanings.splice(index, 1);
    return true;
  }
  return false;
}

export function assignCleaner(cleaningId: string, cleanerId: string): Cleaning | undefined {
  return updateCleaning(cleaningId, {
    cleaner_id: cleanerId,
    status: "assigned",
  });
}

export function startCleaning(cleaningId: string): Cleaning | undefined {
  return updateCleaning(cleaningId, {
    status: "in_progress",
    started_at: new Date(),
  });
}

export function completeCleaning(cleaningId: string): Cleaning | undefined {
  return updateCleaning(cleaningId, {
    status: "completed",
    completed_at: new Date(),
  });
}

export function verifyCleaning(cleaningId: string): Cleaning | undefined {
  return updateCleaning(cleaningId, {
    status: "verified",
    verified_at: new Date(),
  });
}
