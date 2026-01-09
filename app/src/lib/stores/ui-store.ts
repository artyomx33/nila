// ============================================
// UI STORE - Manages global UI state
// Handles sidebar, modals, and other UI interactions
// ============================================

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  // Sidebar
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleCollapsed: () => void;

  // Active section (for navigation highlighting)
  activeSection: string;
  setActiveSection: (section: string) => void;

  // Modal/drawer state
  activeModal: string | null;
  modalData: any;
  openModal: (modalId: string, data?: any) => void;
  closeModal: () => void;

  // Global loading state
  isLoading: boolean;
  setLoading: (loading: boolean) => void;

  // Toast/notification state
  toast: {
    show: boolean;
    message: string;
    type: "success" | "error" | "info" | "warning";
  } | null;
  showToast: (message: string, type: "success" | "error" | "info" | "warning") => void;
  hideToast: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Sidebar defaults
      sidebarOpen: true,
      sidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleCollapsed: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      // Active section
      activeSection: "dashboard",
      setActiveSection: (section) => set({ activeSection: section }),

      // Modal state
      activeModal: null,
      modalData: null,
      openModal: (modalId, data) => set({ activeModal: modalId, modalData: data }),
      closeModal: () => set({ activeModal: null, modalData: null }),

      // Loading state
      isLoading: false,
      setLoading: (loading) => set({ isLoading: loading }),

      // Toast state
      toast: null,
      showToast: (message, type) => set({ toast: { show: true, message, type } }),
      hideToast: () => set({ toast: null }),
    }),
    {
      name: "nila-ui-storage",
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);
