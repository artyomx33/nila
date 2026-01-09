// ============================================
// CLEANINGS STORE - Zustand State Management
// ============================================

import { create } from 'zustand';
import { Cleaning, CleaningStatus, CleaningType, ChecklistItem } from '@/types';
import { mockCleanings } from '@/lib/db/cleanings';

interface CleaningsStore {
  cleanings: Cleaning[];
  addCleaning: (cleaning: Omit<Cleaning, 'id' | 'created_at'>) => Cleaning;
  updateCleaning: (id: string, updates: Partial<Omit<Cleaning, 'id' | 'created_at'>>) => Cleaning | null;
  deleteCleaning: (id: string) => boolean;
  getCleaning: (id: string) => Cleaning | undefined;
  getCleaningsByStatus: (status: CleaningStatus) => Cleaning[];
  getCleaningsByUnit: (unitId: string) => Cleaning[];
  getCleaningsByCleaner: (cleanerId: string) => Cleaning[];
  assignCleaner: (cleaningId: string, cleanerId: string) => Cleaning | null;
  updateStatus: (cleaningId: string, status: CleaningStatus) => Cleaning | null;
  startCleaning: (cleaningId: string) => Cleaning | null;
  completeCleaning: (cleaningId: string) => Cleaning | null;
  verifyCleaning: (cleaningId: string) => Cleaning | null;
  updateChecklist: (cleaningId: string, checklist: ChecklistItem[]) => Cleaning | null;
}

export const useCleaningsStore = create<CleaningsStore>((set, get) => ({
  cleanings: [...mockCleanings],

  addCleaning: (cleaningData) => {
    const newCleaning: Cleaning = {
      ...cleaningData,
      id: `cleaning-${Date.now()}`,
      created_at: new Date(),
    };

    set((state) => ({
      cleanings: [...state.cleanings, newCleaning],
    }));

    return newCleaning;
  },

  updateCleaning: (id, updates) => {
    let updatedCleaning: Cleaning | null = null;

    set((state) => {
      const index = state.cleanings.findIndex((cleaning) => cleaning.id === id);

      if (index === -1) {
        return state;
      }

      const updated = {
        ...state.cleanings[index],
        ...updates,
      };

      updatedCleaning = updated;

      const newCleanings = [...state.cleanings];
      newCleanings[index] = updated;

      return { cleanings: newCleanings };
    });

    return updatedCleaning;
  },

  deleteCleaning: (id) => {
    let deleted = false;

    set((state) => {
      const index = state.cleanings.findIndex((cleaning) => cleaning.id === id);

      if (index === -1) {
        return state;
      }

      deleted = true;
      const newCleanings = [...state.cleanings];
      newCleanings.splice(index, 1);

      return { cleanings: newCleanings };
    });

    return deleted;
  },

  getCleaning: (id) => {
    return get().cleanings.find((cleaning) => cleaning.id === id);
  },

  getCleaningsByStatus: (status) => {
    return get().cleanings.filter((cleaning) => cleaning.status === status);
  },

  getCleaningsByUnit: (unitId) => {
    return get().cleanings.filter((cleaning) => cleaning.unit_id === unitId);
  },

  getCleaningsByCleaner: (cleanerId) => {
    return get().cleanings.filter((cleaning) => cleaning.cleaner_id === cleanerId);
  },

  assignCleaner: (cleaningId, cleanerId) => {
    return get().updateCleaning(cleaningId, {
      cleaner_id: cleanerId,
      status: 'assigned',
    });
  },

  updateStatus: (cleaningId, status) => {
    return get().updateCleaning(cleaningId, { status });
  },

  startCleaning: (cleaningId) => {
    return get().updateCleaning(cleaningId, {
      status: 'in_progress',
      started_at: new Date(),
    });
  },

  completeCleaning: (cleaningId) => {
    return get().updateCleaning(cleaningId, {
      status: 'completed',
      completed_at: new Date(),
    });
  },

  verifyCleaning: (cleaningId) => {
    return get().updateCleaning(cleaningId, {
      status: 'verified',
      verified_at: new Date(),
    });
  },

  updateChecklist: (cleaningId, checklist) => {
    return get().updateCleaning(cleaningId, { checklist });
  },
}));
