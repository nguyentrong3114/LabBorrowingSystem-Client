import React from 'react';
import { Button } from '../ui/button';
import type { LucideIcon } from 'lucide-react';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface ActionButton {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'outline' | 'ghost';
  icon?: LucideIcon;
  className?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: ActionButton[];
  backButton?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumbs,
  actions = [],
  backButton,
  className = ''
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="mb-2">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && <span className="mx-2">/</span>}
                {crumb.href ? (
                  <a href={crumb.href} className="hover:text-blue-600">
                    {crumb.label}
                  </a>
                ) : (
                  <span>{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {backButton && (
            <Button variant="outline" size="sm" onClick={backButton.onClick}>
              {backButton.label}
            </Button>
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            {subtitle && <p className="mt-1 text-gray-600">{subtitle}</p>}
          </div>
        </div>
        
        {actions.length > 0 && (
          <div className="flex items-center gap-2">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || 'default'}
                size="sm"
                onClick={action.onClick}
                className={`flex items-center gap-2 ${action.className || ''}`}
              >
                {action.icon && <action.icon className="h-4 w-4" />}
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};