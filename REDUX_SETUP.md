# Redux Setup Documentation

## Overview

This project now includes Redux Toolkit for centralized state management. The setup provides:

- **Equipment Management**: Complete CRUD operations with filtering and statistics
- **User Management**: User state and authentication handling
- **Booking Management**: Booking lifecycle and approval workflow
- **UI State**: Modal management, notifications, and global UI state

## Directory Structure

```
src/
├── store/
│   ├── index.ts                 # Main store configuration
│   ├── hooks.ts                 # Typed Redux hooks
│   └── slices/
│       ├── equipmentSlice.ts    # Equipment state management
│       ├── userSlice.ts         # User state management
│       ├── bookingSlice.ts      # Booking state management
│       └── uiSlice.ts           # UI state management
```

## Getting Started

### 1. Store Configuration

The store is already configured in `src/store/index.ts` and integrated with the main application through the Redux Provider in `main.tsx`.

### 2. Using Redux in Components

#### Import the typed hooks:
```tsx
import { useAppDispatch, useAppSelector } from '../../store/hooks';
```

#### Import the actions you need:
```tsx
import { 
  fetchEquipment, 
  createEquipment, 
  setSearchTerm 
} from '../../store/slices/equipmentSlice';
import { openModal, addNotification } from '../../store/slices/uiSlice';
```

#### Use in your component:
```tsx
const dispatch = useAppDispatch();
const { items, loading, error } = useAppSelector((state: RootState) => state.equipment);

// Fetch data
useEffect(() => {
  dispatch(fetchEquipment());
}, [dispatch]);

// Update search term
const handleSearch = (term: string) => {
  dispatch(setSearchTerm(term));
};

// Show notification
const showSuccess = () => {
  dispatch(addNotification({
    type: 'success',
    title: 'Success',
    message: 'Operation completed successfully'
  }));
};
```

## Available Slices

### Equipment Slice (`equipmentSlice.ts`)

**Actions:**
- `fetchEquipment()` - Load all equipment
- `createEquipment(equipmentData)` - Create new equipment
- `updateEquipment(equipmentData)` - Update existing equipment
- `deleteEquipment(id)` - Delete equipment
- `setSearchTerm(term)` - Set search filter
- `setStatusFilter(status)` - Set status filter
- `setCategoryFilter(category)` - Set category filter
- `clearFilters()` - Reset all filters

**State:**
- `items: Equipment[]` - Array of equipment
- `loading: boolean` - Loading state
- `error: string | null` - Error message
- `filters` - Current filter values
- `statistics` - Computed statistics

### User Slice (`userSlice.ts`)

**Actions:**
- `fetchUsers()` - Load all users
- `createUser(userData)` - Create new user
- `updateUser(userData)` - Update existing user
- `deleteUser(id)` - Delete user
- `setCurrentUser(user)` - Set logged-in user
- `setSelectedUser(user)` - Set selected user for operations

### Booking Slice (`bookingSlice.ts`)

**Actions:**
- `fetchBookings()` - Load all bookings
- `createBooking(bookingData)` - Create new booking
- `updateBooking(bookingData)` - Update existing booking
- `approveBooking({ id })` - Approve a booking
- `rejectBooking({ id })` - Reject a booking
- `deleteBooking(id)` - Delete booking

### UI Slice (`uiSlice.ts`)

**Actions:**
- `openModal({ type, data })` - Open modal with type and optional data
- `closeModal()` - Close modal
- `addNotification({ type, title, message })` - Show notification
- `removeNotification(id)` - Remove specific notification
- `toggleSidebar()` - Toggle sidebar visibility
- `setLoading(isLoading)` - Set global loading state

## Example Implementation

See `src/pages/labs/EquipmentManagementRedux.tsx` for a complete example of how to use Redux with:
- Data fetching with loading states
- CRUD operations
- Filtering and search
- Modal management
- Notification handling
- Error handling

## Migration from Local State

To migrate existing components:

1. **Replace useState with Redux state:**
   ```tsx
   // Before
   const [equipment, setEquipment] = useState([]);
   const [loading, setLoading] = useState(false);
   
   // After
   const { items: equipment, loading } = useAppSelector(state => state.equipment);
   ```

2. **Replace local functions with Redux actions:**
   ```tsx
   // Before
   const handleSearch = (term) => {
     setSearchTerm(term);
   };
   
   // After
   const handleSearch = (term: string) => {
     dispatch(setSearchTerm(term));
   };
   ```

3. **Use async thunks for API calls:**
   ```tsx
   // Before
   const fetchData = async () => {
     setLoading(true);
     try {
       const data = await api.getEquipment();
       setEquipment(data);
     } catch (error) {
       setError(error.message);
     } finally {
       setLoading(false);
     }
   };
   
   // After
   dispatch(fetchEquipment()); // Handles loading, success, and error automatically
   ```

## Best Practices

1. **Use typed hooks**: Always use `useAppDispatch` and `useAppSelector` instead of the plain Redux hooks
2. **Handle async operations**: Use the provided async thunks for API calls
3. **Manage loading states**: The slices handle loading states automatically
4. **Error handling**: Errors are captured in the Redux state
5. **Notifications**: Use the UI slice for consistent user feedback
6. **Modal management**: Centralize modal state in the UI slice

## Next Steps

1. **Update existing components** to use Redux instead of local state
2. **Add real API calls** by replacing mock data in the async thunks
3. **Enhance error handling** with retry mechanisms and better error messages
4. **Add persistence** using Redux Persist if needed
5. **Implement optimistic updates** for better UX

## Troubleshooting

### Common Issues:

1. **TypeScript errors with state**: Make sure to use `(state: RootState)` in useSelector
2. **Actions not working**: Check that actions are properly imported from the correct slice
3. **State not updating**: Ensure components are wrapped with the Redux Provider
4. **Async thunks failing**: Check the mock implementations and replace with real API calls

### Debug Tools:

- Install Redux DevTools Extension for better debugging
- Use `console.log` in action creators to track dispatch calls
- Check the Redux state in the browser DevTools