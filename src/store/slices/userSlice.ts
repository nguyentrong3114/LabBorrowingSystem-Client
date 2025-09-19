import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types';

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    // TODO: Replace with actual API call
    const mockData: User[] = [
      {
        id: 1,
        name: 'Dr. Sarah Johnson',
        email: 'sarah.johnson@university.edu',
        phone: '+1 (555) 123-4567',
        department: 'Biology',
        role: 'Faculty',
        status: 'Active',
        joinDate: '2023-01-15',
        lastLogin: '2024-09-18 14:30',
        permissions: ['View Labs', 'Book Labs', 'Manage Equipment']
      },
      {
        id: 2,
        name: 'John Smith',
        email: 'john.smith@university.edu',
        phone: '+1 (555) 234-5678',
        department: 'Computer Science',
        role: 'Admin',
        status: 'Active',
        joinDate: '2022-08-20',
        lastLogin: '2024-09-19 09:15',
        permissions: ['Full Access', 'User Management', 'System Settings']
      },
      {
        id: 3,
        name: 'Emily Davis',
        email: 'emily.davis@student.university.edu',
        phone: '+1 (555) 345-6789',
        department: 'Chemistry',
        role: 'Student',
        status: 'Active',
        joinDate: '2024-01-10',
        lastLogin: '2024-09-17 16:45',
        permissions: ['View Labs', 'Book Labs']
      }
    ];
    
    return new Promise<User[]>((resolve) => {
      setTimeout(() => resolve(mockData), 1000);
    });
  }
);

// Async thunk for creating user
export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...userData,
      id: Date.now()
    };
    
    return new Promise<User>((resolve) => {
      setTimeout(() => resolve(newUser), 500);
    });
  }
);

// Async thunk for updating user
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (userData: User) => {
    return new Promise<User>((resolve) => {
      setTimeout(() => resolve(userData), 500);
    });
  }
);

// Async thunk for deleting user
export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: number) => {
    return new Promise<number>((resolve) => {
      setTimeout(() => resolve(id), 500);
    });
  }
);

interface UserState {
  items: User[];
  loading: boolean;
  error: string | null;
  selectedUser: User | null;
  currentUser: User | null;
  filters: {
    searchTerm: string;
    status: string;
    role: string;
  };
}

const initialState: UserState = {
  items: [],
  loading: false,
  error: null,
  selectedUser: null,
  currentUser: null,
  filters: {
    searchTerm: '',
    status: 'All',
    role: 'All'
  }
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.filters.searchTerm = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.filters.status = action.payload;
    },
    setRoleFilter: (state, action: PayloadAction<string>) => {
      state.filters.role = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearFilters: (state) => {
      state.filters = {
        searchTerm: '',
        status: 'All',
        role: 'All'
      };
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch users cases
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      // Create user cases
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create user';
      })
      // Update user cases
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update user';
      })
      // Delete user cases
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete user';
      });
  }
});

export const {
  setSearchTerm,
  setStatusFilter,
  setRoleFilter,
  setSelectedUser,
  setCurrentUser,
  clearError,
  clearFilters
} = userSlice.actions;

export default userSlice.reducer;