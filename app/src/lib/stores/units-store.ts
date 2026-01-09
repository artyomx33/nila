// ============================================
// UNITS STORE - Zustand State Management
// ============================================

import { create } from 'zustand';
import { Unit, UnitType, UnitStatus } from '@/types';
import { mockUnits } from '@/lib/db/units';

interface UnitsStore {
  units: Unit[];
  addUnit: (unit: Omit<Unit, 'id' | 'created_at' | 'updated_at'>) => Unit;
  updateUnit: (id: string, updates: Partial<Omit<Unit, 'id' | 'created_at'>>) => Unit | null;
  deleteUnit: (id: string) => boolean;
  getUnit: (id: string) => Unit | undefined;
  getUnits: (filters?: {
    status?: UnitStatus;
    type?: UnitType;
    owner_id?: string;
    search?: string;
  }) => Unit[];
}

export const useUnitsStore = create<UnitsStore>((set, get) => ({
  units: [...mockUnits],

  addUnit: (unitData) => {
    const newUnit: Unit = {
      ...unitData,
      id: `unit-${Date.now()}`,
      created_at: new Date(),
      updated_at: new Date(),
    };

    set((state) => ({
      units: [...state.units, newUnit],
    }));

    return newUnit;
  },

  updateUnit: (id, updates) => {
    let updatedUnit: Unit | null = null;

    set((state) => {
      const index = state.units.findIndex((unit) => unit.id === id);

      if (index === -1) {
        return state;
      }

      const updated = {
        ...state.units[index],
        ...updates,
        updated_at: new Date(),
      };

      updatedUnit = updated;

      const newUnits = [...state.units];
      newUnits[index] = updated;

      return { units: newUnits };
    });

    return updatedUnit;
  },

  deleteUnit: (id) => {
    let deleted = false;

    set((state) => {
      const index = state.units.findIndex((unit) => unit.id === id);

      if (index === -1) {
        return state;
      }

      deleted = true;
      const newUnits = [...state.units];
      newUnits.splice(index, 1);

      return { units: newUnits };
    });

    return deleted;
  },

  getUnit: (id) => {
    return get().units.find((unit) => unit.id === id);
  },

  getUnits: (filters) => {
    let filtered = [...get().units];

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
  },
}));
