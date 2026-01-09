// ============================================
// BOOKINGS STORE - Zustand State Management
// ============================================

import { create } from 'zustand';
import { Booking, BookingStatus, BookingSource } from '@/types';
import { mockBookings } from '@/lib/db/bookings';
import { generateId } from '@/lib/utils';

interface BookingsStore {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'created_at'>) => Booking;
  updateBooking: (id: string, updates: Partial<Omit<Booking, 'id' | 'created_at'>>) => Booking | null;
  deleteBooking: (id: string) => boolean;
  cancelBooking: (id: string) => Booking | null;
  getBooking: (id: string) => Booking | undefined;
  getBookingsByUnit: (unitId: string) => Booking[];
  getBookingsByStatus: (status: BookingStatus) => Booking[];
  isUnitAvailable: (unitId: string, checkIn: Date, checkOut: Date, excludeBookingId?: string) => boolean;
  getTodayCheckIns: () => Booking[];
  getTodayCheckOuts: () => Booking[];
}

export const useBookingsStore = create<BookingsStore>((set, get) => ({
  bookings: [...mockBookings],

  addBooking: (bookingData) => {
    const newBooking: Booking = {
      ...bookingData,
      id: `booking-${generateId()}`,
      created_at: new Date(),
    };

    set((state) => ({
      bookings: [...state.bookings, newBooking],
    }));

    return newBooking;
  },

  updateBooking: (id, updates) => {
    let updatedBooking: Booking | null = null;

    set((state) => {
      const index = state.bookings.findIndex((booking) => booking.id === id);

      if (index === -1) {
        return state;
      }

      const updated = {
        ...state.bookings[index],
        ...updates,
        updated_at: new Date(),
      };

      updatedBooking = updated;

      const newBookings = [...state.bookings];
      newBookings[index] = updated;

      return { bookings: newBookings };
    });

    return updatedBooking;
  },

  deleteBooking: (id) => {
    let deleted = false;

    set((state) => {
      const index = state.bookings.findIndex((booking) => booking.id === id);

      if (index === -1) {
        return state;
      }

      deleted = true;
      const newBookings = [...state.bookings];
      newBookings.splice(index, 1);

      return { bookings: newBookings };
    });

    return deleted;
  },

  cancelBooking: (id) => {
    return get().updateBooking(id, { status: 'cancelled' });
  },

  getBooking: (id) => {
    return get().bookings.find((booking) => booking.id === id);
  },

  getBookingsByUnit: (unitId) => {
    return get().bookings.filter((booking) => booking.unit_id === unitId);
  },

  getBookingsByStatus: (status) => {
    return get().bookings.filter((booking) => booking.status === status);
  },

  isUnitAvailable: (unitId, checkIn, checkOut, excludeBookingId) => {
    const conflictingBookings = get().bookings.filter(
      (b) =>
        b.unit_id === unitId &&
        b.id !== excludeBookingId &&
        b.status !== 'cancelled' &&
        b.status !== 'checked_out' &&
        ((checkIn >= b.check_in && checkIn < b.check_out) ||
          (checkOut > b.check_in && checkOut <= b.check_out) ||
          (checkIn <= b.check_in && checkOut >= b.check_out))
    );

    return conflictingBookings.length === 0;
  },

  getTodayCheckIns: () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return get().bookings.filter(
      (b) =>
        b.status === 'confirmed' &&
        b.check_in >= today &&
        b.check_in < tomorrow
    );
  },

  getTodayCheckOuts: () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return get().bookings.filter(
      (b) =>
        (b.status === 'confirmed' || b.status === 'checked_in') &&
        b.check_out >= today &&
        b.check_out < tomorrow
    );
  },
}));
