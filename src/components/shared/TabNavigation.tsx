import React from 'react';
import type { LucideIcon } from 'lucide-react';

export interface Tab {
  key: string;
  label: string;
  icon?: LucideIcon;
  count?: number;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabKey: string) => void;
  className?: string;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = ''
}) => {
  return (
    <div className={`border-b ${className}`}>
      <nav className="flex space-x-8">
        {tabs.map(({ key, label, icon: Icon, count }) => (
          <button
            key={key}
            onClick={() => onTabChange(key)}
            className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === key
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {Icon && <Icon className="h-4 w-4" />}
            {label}
            {count !== undefined && (
              <span className={`ml-1 px-2 py-0.5 text-xs rounded-full ${
                activeTab === key
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};