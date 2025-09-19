import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'gray';
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  color = 'blue',
  trend,
  className = ''
}) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'text-blue-600';
      case 'green': return 'text-green-600';
      case 'yellow': return 'text-yellow-600';
      case 'red': return 'text-red-600';
      case 'purple': return 'text-purple-600';
      case 'gray': return 'text-gray-600';
      default: return 'text-blue-600';
    }
  };

  const getTrendColor = (direction: string) => {
    switch (direction) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'neutral': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const colorClasses = getColorClasses(color);

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className={`text-2xl font-bold ${colorClasses}`}>
            {value}
          </CardTitle>
          {Icon && <Icon className={`h-5 w-5 ${colorClasses}`} />}
        </div>
        <CardDescription className="flex items-center gap-2">
          <span>{title}</span>
          {trend && (
            <span className={`text-sm ${getTrendColor(trend.direction)}`}>
              {trend.direction === 'up' ? '↑' : trend.direction === 'down' ? '↓' : '→'}
              {Math.abs(trend.value)}%
            </span>
          )}
        </CardDescription>
        {description && (
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        )}
      </CardHeader>
    </Card>
  );
};