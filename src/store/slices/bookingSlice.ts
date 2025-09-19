import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Booking } from '../../types';

// Async thunk for fetching bookings
export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async () => {
    // TODO: Replace with actual API call
    const mockData: Booking[] = [
      {
        id: 1,
        labName: 'Lab A-101',
        bookedBy: 'Dr. Sarah Johnson',
        date: '2024-09-20',
        startTime: '09:00',
        endTime: '11:00',
        status: 'Confirmed',
        purpose: 'Chemistry Experiment',
        participants: 15,
        createdAt: '2024-09-15'
      },
      {
        id: 2,
        labName: 'Lab B-205',
        bookedBy: 'John Smith',
        date: '2024-09-21',
        startTime: '14:00',
        endTime: '17:00',
        status: 'Pending',
        purpose: 'Research Project',
        participants: 8,
        createdAt: '2024-09-18'
      },
      {
        id: 3,
        labName: 'Lab C-301',
        bookedBy: 'Emily Davis',
        date: '2024-09-19',
        startTime: '10:00',
        endTime: '12:00',
        status: 'Completed',
        purpose: 'Student Lab Exercise',
        participants: 12,
        createdAt: '2024-09-10'
      }
    ];
    
    return new Promise<Booking[]>((resolve) => {
      setTimeout(() => resolve(mockData), 1000);
    });
  }
);

// Async thunk for creating booking
export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (bookingData: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: Date.now(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    return new Promise<Booking>((resolve) => {
      setTimeout(() => resolve(newBooking), 500);
    });
  }
);

// Async thunk for updating booking
export const updateBooking = createAsyncThunk(
  'bookings/updateBooking',
  async (bookingData: Booking) => {
    return new Promise<Booking>((resolve) => {
      setTimeout(() => resolve(bookingData), 500);
    });
  }
);

// Async thunk for approving booking (using update)
export const approveBooking = createAsyncThunk(
  'bookings/approveBooking',
  async ({ id }: { id: number }) => {
    return new Promise<{ id: number }>((resolve) => {
      setTimeout(() => resolve({ id }), 500);
    });
  }
);

// Async thunk for rejecting booking (using update)
export const rejectBooking = createAsyncThunk(
  'bookings/rejectBooking',
  async ({ id }: { id: number }) => {
    return new Promise<{ id: number }>((resolve) => {
      setTimeout(() => resolve({ id }), 500);
    });
  }
);

// Async thunk for deleting booking
export const deleteBooking = createAsyncThunk(
  'bookings/deleteBooking',
  async (id: number) => {
    return new Promise<number>((resolve) => {
      setTimeout(() => resolve(id), 500);
    });
  }
);

interface BookingState {
  items: Booking[];
  loading: boolean;
  error: string | null;
  selectedBooking: Booking | null;
  filters: {
    searchTerm: string;
    status: string;
    labRoom: string;
    dateRange: {
      from: string;
      to: string;
    };
  };
  statistics: {
    totalBookings: number;
    confirmedBookings: number;
    pendingBookings: number;
    completedBookings: number;
  };
}

const initialState: BookingState = {
  items: [],
  loading: false,
  error: null,
  selectedBooking: null,
  filters: {
    searchTerm: '',
    status: 'All',
    labRoom: 'All',
    dateRange: {
      from: '',
      to: ''
    }
  },
  statistics: {
    totalBookings: 0,
    confirmedBookings: 0,
    pendingBookings: 0,
    completedBookings: 0
  }
};

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.filters.searchTerm = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.filters.status = action.payload;
    },
    setLabRoomFilter: (state, action: PayloadAction<string>) => {
      state.filters.labRoom = action.payload;
    },
    setDateRangeFilter: (state, action: PayloadAction<{ from: string; to: string }>) => {
      state.filters.dateRange = action.payload;
    },
    setSelectedBooking: (state, action: PayloadAction<Booking | null>) => {
      state.selectedBooking = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearFilters: (state) => {
      state.filters = {
        searchTerm: '',
        status: 'All',
        labRoom: 'All',
        dateRange: {
          from: '',
          to: ''
        }
      };
    },
    updateStatistics: (state) => {
      const { items } = state;
      state.statistics = {
        totalBookings: items.length,
        confirmedBookings: items.filter(b => b.status === 'Confirmed').length,
        pendingBookings: items.filter(b => b.status === 'Pending').length,
        completedBookings: items.filter(b => b.status === 'Completed').length
      };
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch bookings cases
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        const { items } = state;
        state.statistics = {
          totalBookings: items.length,
          confirmedBookings: items.filter(b => b.status === 'Confirmed').length,
          pendingBookings: items.filter(b => b.status === 'Pending').length,
          completedBookings: items.filter(b => b.status === 'Completed').length
        };
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch bookings';
      })
      // Create booking cases
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
        const { items } = state;
        state.statistics = {
          totalBookings: items.length,
          confirmedBookings: items.filter(b => b.status === 'Confirmed').length,
          pendingBookings: items.filter(b => b.status === 'Pending').length,
          completedBookings: items.filter(b => b.status === 'Completed').length
        };
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create booking';
      })
      // Update booking cases
      .addCase(updateBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        const { items } = state;
        state.statistics = {
          totalBookings: items.length,
          confirmedBookings: items.filter(b => b.status === 'Confirmed').length,
          pendingBookings: items.filter(b => b.status === 'Pending').length,
          completedBookings: items.filter(b => b.status === 'Completed').length
        };
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update booking';
      })
      // Approve booking cases
      .addCase(approveBooking.fulfilled, (state, action) => {
        const { id } = action.payload;
        const booking = state.items.find(item => item.id === id);
        if (booking) {
          booking.status = 'Confirmed';
        }
        const { items } = state;
        state.statistics = {
          totalBookings: items.length,
          confirmedBookings: items.filter(b => b.status === 'Confirmed').length,
          pendingBookings: items.filter(b => b.status === 'Pending').length,
          completedBookings: items.filter(b => b.status === 'Completed').length
        };
      })
      // Reject booking cases
      .addCase(rejectBooking.fulfilled, (state, action) => {
        const { id } = action.payload;
        const booking = state.items.find(item => item.id === id);
        if (booking) {
          booking.status = 'Cancelled';
        }
        const { items } = state;
        state.statistics = {
          totalBookings: items.length,
          confirmedBookings: items.filter(b => b.status === 'Confirmed').length,
          pendingBookings: items.filter(b => b.status === 'Pending').length,
          completedBookings: items.filter(b => b.status === 'Completed').length
        };
      })
      // Delete booking cases
      .addCase(deleteBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
        const { items } = state;
        state.statistics = {
          totalBookings: items.length,
          confirmedBookings: items.filter(b => b.status === 'Confirmed').length,
          pendingBookings: items.filter(b => b.status === 'Pending').length,
          completedBookings: items.filter(b => b.status === 'Completed').length
        };
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete booking';
      });
  }
});

export const {
  setSearchTerm,
  setStatusFilter,
  setLabRoomFilter,
  setDateRangeFilter,
  setSelectedBooking,
  clearError,
  clearFilters,
  updateStatistics
} = bookingSlice.actions;

export default bookingSlice.reducer;