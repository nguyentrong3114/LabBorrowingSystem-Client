import React from 'react';

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T, value: any) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
  className?: string;
  emptyMessage?: string;
  loading?: boolean;
}

export function DataTable<T extends { id: number | string }>({
  data,
  columns,
  onRowClick,
  className = '',
  emptyMessage = 'No data available',
  loading = false
}: DataTableProps<T>) {
  const getCellValue = (item: T, key: keyof T | string): any => {
    if (typeof key === 'string' && key.includes('.')) {
      return key.split('.').reduce((obj: any, k) => obj?.[k], item);
    }
    return item[key as keyof T];
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full table-auto">
        <thead>
          <tr className="border-b bg-gray-50">
            {columns.map((column) => (
              <th
                key={column.key.toString()}
                className={`text-left py-3 px-4 font-medium text-gray-700 ${column.className || ''}`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className={`border-b hover:bg-gray-50 transition-colors ${
                onRowClick ? 'cursor-pointer' : ''
              }`}
              onClick={() => onRowClick?.(item)}
            >
              {columns.map((column) => {
                const value = getCellValue(item, column.key);
                return (
                  <td
                    key={`${item.id}-${column.key.toString()}`}
                    className={`py-3 px-4 ${column.className || ''}`}
                  >
                    {column.render ? column.render(item, value) : value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}