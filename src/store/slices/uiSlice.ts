import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Modal {
  isOpen: boolean;
  type: string;
  data?: any;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

interface UIState {
  loading: boolean;
  darkMode: boolean;
  sidebarOpen: boolean;
  modal: Modal;
  notifications: Notification[];
  activeTab: string;
  searchTerm: string;
}

const initialState: UIState = {
  loading: false,
  darkMode: false,
  sidebarOpen: true,
  modal: {
    isOpen: false,
    type: '',
    data: null
  },
  notifications: [],
  activeTab: '',
  searchTerm: ''
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    openModal: (state, action: PayloadAction<{ type: string; data?: any }>) => {
      state.modal = {
        isOpen: true,
        type: action.payload.type,
        data: action.payload.data
      };
    },
    closeModal: (state) => {
      state.modal = {
        isOpen: false,
        type: '',
        data: null
      };
    },
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id'>>) => {
      const notification: Notification = {
        ...action.payload,
        id: Date.now().toString()
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    }
  }
});

export const {
  setLoading,
  toggleDarkMode,
  setDarkMode,
  toggleSidebar,
  setSidebarOpen,
  openModal,
  closeModal,
  addNotification,
  removeNotification,
  clearNotifications,
  setActiveTab,
  setSearchTerm
} = uiSlice.actions;

export default uiSlice.reducer;