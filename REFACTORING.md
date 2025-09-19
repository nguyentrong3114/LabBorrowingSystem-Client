# Code Organization and Refactoring

This document outlines the refactored code structure for improved reusability and maintainability.

## 📁 Directory Structure

```
src/
├── types/               # Centralized TypeScript type definitions
│   ├── common.ts       # Common/shared types (statuses, base entities)
│   ├── user.ts         # User-related types
│   ├── equipment.ts    # Equipment-related types
│   ├── booking.ts      # Booking-related types
│   ├── borrow.ts       # Borrowing-related types
│   └── index.ts        # Re-exports all types
├── components/
│   ├── ui/             # Base UI components (existing)
│   └── shared/         # Reusable business components
│       ├── StatusBadge.tsx      # Status indicator component
│       ├── SearchAndFilter.tsx  # Search and filter controls
│       ├── DataTable.tsx        # Generic data table
│       ├── StatCard.tsx         # Statistics card component
│       ├── TabNavigation.tsx    # Tab navigation component
│       ├── PageHeader.tsx       # Page header with actions
│       ├── EmptyState.tsx       # Empty state component
│       └── index.ts            # Re-exports all components
├── hooks/              # Custom React hooks
│   ├── useTableFilters.ts  # Hook for table filtering logic
│   ├── useTabs.ts          # Hook for tab navigation
│   └── index.ts            # Re-exports all hooks
├── utils/              # Utility functions
│   ├── helpers.ts      # Helper functions (formatting, validation, etc.)
│   └── index.ts        # Re-exports all utilities
└── pages/              # Page components (refactored to use shared components)
```

## 🏗️ Architecture Principles

### 1. Type Safety
- All types are centralized in `/src/types/`
- Strong typing throughout the application
- Import types using `import type` syntax

### 2. Component Reusability
- Shared components in `/src/components/shared/`
- Generic components that work with different data types
- Configurable through props

### 3. Custom Hooks
- Business logic extracted into reusable hooks
- State management patterns abstracted
- Easy testing and reuse across components

### 4. Utility Functions
- Common operations centralized in `/src/utils/`
- Pure functions for formatting, validation, etc.
- Easily testable and reusable

## 🧩 Key Components

### StatusBadge
```tsx
import { StatusBadge } from '../components/shared';

<StatusBadge 
  status="Active" 
  variant="default" 
  size="sm" 
/>
```

### DataTable
```tsx
import { DataTable, type Column } from '../components/shared';

const columns: Column<MyDataType>[] = [
  {
    key: 'name',
    label: 'Name',
    render: (item) => <span>{item.name}</span>
  }
];

<DataTable data={data} columns={columns} />
```

### SearchAndFilter
```tsx
import { SearchAndFilter } from '../components/shared';

<SearchAndFilter
  searchTerm={searchTerm}
  onSearchChange={setSearchTerm}
  filterValue={filterValue}
  onFilterChange={setFilterValue}
  filterOptions={filterOptions}
/>
```

### PageHeader
```tsx
import { PageHeader } from '../components/shared';

<PageHeader
  title="Page Title"
  subtitle="Page description"
  actions={[
    {
      label: 'Add Item',
      onClick: handleAdd,
      icon: Plus
    }
  ]}
/>
```

## 🎣 Custom Hooks

### useTableFilters
```tsx
import { useTableFilters } from '../hooks';

const {
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  filteredData
} = useTableFilters({
  data: myData,
  searchFields: ['name', 'email']
});
```

### useTabs
```tsx
import { useTabs } from '../hooks';

const { activeTab, handleTabChange } = useTabs('defaultTab');
```

## 🛠️ Utility Functions

### Date Formatting
```tsx
import { formatDate, formatDateTime } from '../utils';

const formatted = formatDate('2024-01-15');
const withTime = formatDateTime('2024-01-15T10:30:00');
```

### Status Colors
```tsx
import { getStatusColor } from '../utils';

const colorClass = getStatusColor('Active');
```

### Filtering
```tsx
import { filterBySearchTerm, filterByStatus } from '../utils';

const searchResults = filterBySearchTerm(data, 'search term', ['name', 'email']);
const statusResults = filterByStatus(data, 'Active');
```

## 🔄 Migration Guide

### Before (Old Structure)
```tsx
// Duplicated interfaces in each file
interface Equipment {
  id: number;
  name: string;
  // ...
}

// Duplicated filtering logic
const [searchTerm, setSearchTerm] = useState('');
const filteredData = data.filter(item => 
  item.name.toLowerCase().includes(searchTerm.toLowerCase())
);

// Duplicated status badge logic
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active': return 'bg-green-100';
    // ...
  }
};
```

### After (New Structure)
```tsx
// Import centralized types
import type { Equipment } from '../types';

// Import shared components
import { StatusBadge, DataTable } from '../components/shared';

// Import custom hooks
import { useTableFilters } from '../hooks';

// Use shared components and hooks
const { filteredData } = useTableFilters({
  data,
  searchFields: ['name', 'category']
});

return (
  <DataTable data={filteredData} columns={columns} />
);
```

## ✅ Benefits

1. **Reduced Code Duplication**: Shared components and utilities eliminate repetitive code
2. **Improved Maintainability**: Changes to shared logic update everywhere automatically
3. **Better Type Safety**: Centralized types ensure consistency across the app
4. **Easier Testing**: Isolated components and utilities are easier to unit test
5. **Enhanced Developer Experience**: Clear imports and documented interfaces
6. **Consistent UI**: Shared components ensure visual consistency
7. **Faster Development**: Reusable components speed up feature development

## 🚀 Next Steps

1. Continue refactoring remaining pages to use shared components
2. Add more reusable components as patterns emerge
3. Implement comprehensive testing for shared components
4. Add Storybook for component documentation
5. Consider adding state management (Redux/Zustand) if needed

## 📝 Examples

See the refactored files:
- `src/pages/equipment/EquipmentManagementRefactored.tsx`
- `src/pages/users/UserManagementRefactored.tsx`

These demonstrate the new patterns and can serve as templates for refactoring other pages.