import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Equipment } from '../../types';

// Async thunk for fetching equipment
export const fetchEquipment = createAsyncThunk(
  'equipment/fetchEquipment',
  async () => {
    // TODO: Replace with actual API call
    const mockData: Equipment[] = [
      {
        id: 1,
        name: 'Microscope - Olympus BX53',
        category: 'Laboratory Equipment',
        status: 'Available',
        location: 'Lab A',
        serialNumber: 'OLY-BX53-001',
        purchaseDate: '2023-03-15',
        lastMaintenance: '2024-08-15'
      },
      {
        id: 2,
        name: 'Computer - Dell OptiPlex',
        category: 'Computer',
        status: 'In Use',
        location: 'Lab B',
        serialNumber: 'DEL-OPT-002',
        purchaseDate: '2022-11-20',
        lastMaintenance: '2024-07-10'
      },
      {
        id: 3,
        name: 'Centrifuge - Eppendorf 5810R',
        category: 'Laboratory Equipment',
        status: 'Maintenance',
        location: 'Lab C',
        serialNumber: 'EPP-5810-003',
        purchaseDate: '2023-01-10',
        lastMaintenance: '2024-09-01'
      }
    ];
    
    // Simulate API call delay
    return new Promise<Equipment[]>((resolve) => {
      setTimeout(() => resolve(mockData), 1000);
    });
  }
);

// Async thunk for creating equipment
export const createEquipment = createAsyncThunk(
  'equipment/createEquipment',
  async (equipmentData: Omit<Equipment, 'id'>) => {
    // TODO: Replace with actual API call
    const newEquipment: Equipment = {
      ...equipmentData,
      id: Date.now() // Temporary ID generation
    };
    
    return new Promise<Equipment>((resolve) => {
      setTimeout(() => resolve(newEquipment), 500);
    });
  }
);

// Async thunk for updating equipment
export const updateEquipment = createAsyncThunk(
  'equipment/updateEquipment',
  async (equipmentData: Equipment) => {
    // TODO: Replace with actual API call
    return new Promise<Equipment>((resolve) => {
      setTimeout(() => resolve(equipmentData), 500);
    });
  }
);

// Async thunk for deleting equipment
export const deleteEquipment = createAsyncThunk(
  'equipment/deleteEquipment',
  async (id: number) => {
    // TODO: Replace with actual API call
    return new Promise<number>((resolve) => {
      setTimeout(() => resolve(id), 500);
    });
  }
);

interface EquipmentState {
  items: Equipment[];
  loading: boolean;
  error: string | null;
  selectedEquipment: Equipment | null;
  filters: {
    searchTerm: string;
    status: string;
    category: string;
  };
}

const initialState: EquipmentState = {
  items: [],
  loading: false,
  error: null,
  selectedEquipment: null,
  filters: {
    searchTerm: '',
    status: 'All',
    category: 'All'
  }
};

const equipmentSlice = createSlice({
  name: 'equipment',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.filters.searchTerm = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.filters.status = action.payload;
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.filters.category = action.payload;
    },
    setSelectedEquipment: (state, action: PayloadAction<Equipment | null>) => {
      state.selectedEquipment = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearFilters: (state) => {
      state.filters = {
        searchTerm: '',
        status: 'All',
        category: 'All'
      };
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch equipment cases
      .addCase(fetchEquipment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEquipment.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchEquipment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch equipment';
      })
      // Create equipment cases
      .addCase(createEquipment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEquipment.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createEquipment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create equipment';
      })
      // Update equipment cases
      .addCase(updateEquipment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEquipment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateEquipment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update equipment';
      })
      // Delete equipment cases
      .addCase(deleteEquipment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEquipment.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteEquipment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete equipment';
      });
  }
});

export const {
  setSearchTerm,
  setStatusFilter,
  setCategoryFilter,
  setSelectedEquipment,
  clearError,
  clearFilters
} = equipmentSlice.actions;

export default equipmentSlice.reducer;