import { useState, useMemo } from 'react';
import { filterBySearchTerm, filterByStatus } from '../utils/helpers';

interface UseTableFiltersProps<T> {
  data: T[];
  searchFields: (keyof T)[];
}

export const useTableFilters = <T extends { status: string }>({
  data,
  searchFields
}: UseTableFiltersProps<T>) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredData = useMemo(() => {
    let result = data;
    
    // Apply search filter
    if (searchTerm.trim()) {
      result = filterBySearchTerm(result, searchTerm, searchFields);
    }
    
    // Apply status filter
    if (statusFilter !== 'All') {
      result = filterByStatus(result, statusFilter);
    }
    
    return result;
  }, [data, searchTerm, statusFilter, searchFields]);

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredData
  };
};