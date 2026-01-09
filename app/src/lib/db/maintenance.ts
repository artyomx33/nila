// ============================================
// NILA ESTATE MANAGEMENT - MAINTENANCE DATABASE
// Mock data for maintenance requests
// ============================================

import {
  MaintenanceRequest,
  MaintenanceStatus,
  MaintenancePriority,
  MaintenanceCategory,
} from "@/types";

// Mock Maintenance Requests
export const mockMaintenanceRequests: MaintenanceRequest[] = [
  {
    id: "maint-1",
    unit_id: "unit-1",
    category: "plumbing",
    priority: "urgent",
    status: "in_progress",
    title: "Kitchen sink leaking",
    description: "Water leaking from under the kitchen sink. Guest reported puddle forming.",
    reported_by: "admin-1",
    assigned_to: "Jorge Plumbing Services",
    photos: ["/uploads/maint-1-leak.jpg"],
    cost: 1200,
    currency: "MXN",
    scheduled_date: new Date("2026-01-08T16:00:00"),
    completed_at: null,
    notes: "Plumber confirmed, arriving at 4pm",
    created_at: new Date("2026-01-08T09:30:00"),
    updated_at: new Date("2026-01-08T10:15:00"),
  },
  {
    id: "maint-2",
    unit_id: "unit-3",
    category: "hvac",
    priority: "high",
    status: "scheduled",
    title: "AC not cooling properly",
    description: "Air conditioning running but not producing cold air. Room temperature 28°C.",
    reported_by: "admin-1",
    assigned_to: "Bacalar AC Repair",
    photos: [],
    cost: null,
    currency: "MXN",
    scheduled_date: new Date("2026-01-09T10:00:00"),
    completed_at: null,
    notes: "Technician scheduled for tomorrow morning",
    created_at: new Date("2026-01-07T14:20:00"),
    updated_at: new Date("2026-01-08T08:00:00"),
  },
  {
    id: "maint-3",
    unit_id: "unit-2",
    category: "electrical",
    priority: "medium",
    status: "reported",
    title: "Bedroom light fixture flickering",
    description: "Main bedroom light flickers intermittently. May need bulb or wiring check.",
    reported_by: "admin-1",
    assigned_to: null,
    photos: [],
    cost: null,
    currency: "MXN",
    scheduled_date: null,
    completed_at: null,
    notes: "Need to schedule electrician",
    created_at: new Date("2026-01-07T16:45:00"),
    updated_at: new Date("2026-01-07T16:45:00"),
  },
  {
    id: "maint-4",
    unit_id: "unit-4",
    category: "appliance",
    priority: "low",
    status: "completed",
    title: "Refrigerator making noise",
    description: "Fridge making unusual humming sound. Still cooling properly.",
    reported_by: "admin-1",
    assigned_to: "Appliance Pro Bacalar",
    photos: ["/uploads/maint-4-fridge.jpg"],
    cost: 800,
    currency: "MXN",
    scheduled_date: new Date("2026-01-05T11:00:00"),
    completed_at: new Date("2026-01-05T13:30:00"),
    notes: "Cleaned condenser coils, noise resolved",
    created_at: new Date("2026-01-04T10:15:00"),
    updated_at: new Date("2026-01-05T13:30:00"),
  },
  {
    id: "maint-5",
    unit_id: "unit-1",
    category: "structural",
    priority: "medium",
    status: "reported",
    title: "Balcony door sticking",
    description: "Sliding door to balcony is difficult to open/close. May need track cleaning or adjustment.",
    reported_by: "admin-1",
    assigned_to: null,
    photos: [],
    cost: null,
    currency: "MXN",
    scheduled_date: null,
    completed_at: null,
    notes: null,
    created_at: new Date("2026-01-06T15:20:00"),
    updated_at: new Date("2026-01-06T15:20:00"),
  },
  {
    id: "maint-6",
    unit_id: "unit-5",
    category: "cosmetic",
    priority: "low",
    status: "scheduled",
    title: "Touch up paint in living room",
    description: "Small scuff marks on living room wall need touching up.",
    reported_by: "admin-1",
    assigned_to: "Paint & Finish Co.",
    photos: ["/uploads/maint-6-wall.jpg"],
    cost: 500,
    currency: "MXN",
    scheduled_date: new Date("2026-01-13T09:00:00"),
    completed_at: null,
    notes: "Scheduled for next Monday",
    created_at: new Date("2026-01-05T11:30:00"),
    updated_at: new Date("2026-01-07T09:00:00"),
  },
  {
    id: "maint-7",
    unit_id: "unit-3",
    category: "plumbing",
    priority: "high",
    status: "in_progress",
    title: "Toilet running continuously",
    description: "Guest bathroom toilet keeps running after flush. Wasting water.",
    reported_by: "admin-1",
    assigned_to: "Jorge Plumbing Services",
    photos: [],
    cost: 600,
    currency: "MXN",
    scheduled_date: new Date("2026-01-08T14:00:00"),
    completed_at: null,
    notes: "Plumber on site, replacing flapper valve",
    created_at: new Date("2026-01-07T18:00:00"),
    updated_at: new Date("2026-01-08T14:10:00"),
  },
  {
    id: "maint-8",
    unit_id: "unit-2",
    category: "other",
    priority: "medium",
    status: "reported",
    title: "Pool area needs maintenance",
    description: "Shared pool area needs cleaning and chemical balance check.",
    reported_by: "admin-1",
    assigned_to: null,
    photos: [],
    cost: null,
    currency: "MXN",
    scheduled_date: null,
    completed_at: null,
    notes: "Need to coordinate with building management",
    created_at: new Date("2026-01-08T08:00:00"),
    updated_at: new Date("2026-01-08T08:00:00"),
  },
];

// CRUD Functions
export function getMaintenanceRequests(): MaintenanceRequest[] {
  return mockMaintenanceRequests;
}

export function getMaintenanceRequest(id: string): MaintenanceRequest | undefined {
  return mockMaintenanceRequests.find((request) => request.id === id);
}

export function getMaintenanceByStatus(status: MaintenanceStatus): MaintenanceRequest[] {
  return mockMaintenanceRequests.filter((request) => request.status === status);
}

export function getMaintenanceByPriority(priority: MaintenancePriority): MaintenanceRequest[] {
  return mockMaintenanceRequests.filter((request) => request.priority === priority);
}

export function getMaintenanceByUnit(unitId: string): MaintenanceRequest[] {
  return mockMaintenanceRequests.filter((request) => request.unit_id === unitId);
}

export function getMaintenanceByCategory(category: MaintenanceCategory): MaintenanceRequest[] {
  return mockMaintenanceRequests.filter((request) => request.category === category);
}

export function getUrgentMaintenance(): MaintenanceRequest[] {
  return mockMaintenanceRequests.filter(
    (request) => request.priority === "urgent" || request.priority === "high"
  );
}

export function getActiveMaintenance(): MaintenanceRequest[] {
  return mockMaintenanceRequests.filter(
    (request) => request.status === "in_progress" || request.status === "scheduled"
  );
}

export function createMaintenanceRequest(
  data: Omit<MaintenanceRequest, "id" | "created_at" | "updated_at">
): MaintenanceRequest {
  const newRequest: MaintenanceRequest = {
    ...data,
    id: `maint-${Date.now()}`,
    created_at: new Date(),
    updated_at: new Date(),
  };
  mockMaintenanceRequests.push(newRequest);
  return newRequest;
}

export function updateMaintenanceRequest(
  id: string,
  data: Partial<MaintenanceRequest>
): MaintenanceRequest | undefined {
  const index = mockMaintenanceRequests.findIndex((request) => request.id === id);
  if (index !== -1) {
    mockMaintenanceRequests[index] = {
      ...mockMaintenanceRequests[index],
      ...data,
      updated_at: new Date(),
    };
    return mockMaintenanceRequests[index];
  }
  return undefined;
}

export function deleteMaintenanceRequest(id: string): boolean {
  const index = mockMaintenanceRequests.findIndex((request) => request.id === id);
  if (index !== -1) {
    mockMaintenanceRequests.splice(index, 1);
    return true;
  }
  return false;
}

export function assignMaintenance(id: string, assignedTo: string): MaintenanceRequest | undefined {
  return updateMaintenanceRequest(id, {
    assigned_to: assignedTo,
    status: "scheduled",
  });
}

export function startMaintenance(id: string): MaintenanceRequest | undefined {
  return updateMaintenanceRequest(id, {
    status: "in_progress",
  });
}

export function completeMaintenance(id: string, cost?: number): MaintenanceRequest | undefined {
  return updateMaintenanceRequest(id, {
    status: "completed",
    completed_at: new Date(),
    cost: cost,
  });
}
