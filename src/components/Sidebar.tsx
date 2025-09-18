import { Link } from 'react-router-dom';
import { Home, Server, Calendar, Users, Settings, ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
  isMobile?: boolean;
}

const Sidebar = ({ collapsed = false, onToggle, isMobile = false }: SidebarProps) => {
  return (
    <aside 
      className={`bg-white text-gray-700 h-screen fixed top-0 left-0 z-40 transition-all duration-300 pt-16 shadow-md ${
        collapsed ? 'w-16' : 'w-64'
      } ${isMobile ? '-translate-x-full' : 'translate-x-0'}`}
    >
      {!isMobile && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-4 right-2" 
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft className={`h-5 w-5 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
        </Button>
      )}

      <nav className="flex flex-col p-2 space-y-1">
        <Link 
          to="/" 
          className="flex items-center p-3 hover:bg-gray-100 group transition-colors"
        >
          <Home className="h-5 w-5 mr-3 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Dashboard</span>}
          {collapsed && <span className="sr-only">Dashboard</span>}
        </Link>
        
        <Link 
          to="/labs" 
          className="flex items-center p-3 hover:bg-gray-100 group transition-colors"
        >
          <Server className="h-5 w-5 mr-3 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Labs</span>}
          {collapsed && <span className="sr-only">Labs</span>}
        </Link>
        
        <Link 
          to="/equipment" 
          className="flex items-center p-3 hover:bg-gray-100 group transition-colors"
        >
          <Server className="h-5 w-5 mr-3 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Equipment</span>}
          {collapsed && <span className="sr-only">Equipment</span>}
        </Link>
        
        <Link 
          to="/bookings" 
          className="flex items-center p-3 hover:bg-gray-100 group transition-colors"
        >
          <Calendar className="h-5 w-5 mr-3 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Bookings</span>}
          {collapsed && <span className="sr-only">Bookings</span>}
        </Link>
        
        <Link 
          to="/users" 
          className="flex items-center p-3 hover:bg-gray-100 group transition-colors"
        >
          <Users className="h-5 w-5 mr-3 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Users</span>}
          {collapsed && <span className="sr-only">Users</span>}
        </Link>
        
        <div className="py-2 border-t border-gray-200 mt-2">
          <Link 
            to="/settings" 
            className="flex items-center p-3 hover:bg-gray-100 group transition-colors"
          >
            <Settings className="h-5 w-5 mr-3 flex-shrink-0" />
            {!collapsed && <span className="text-sm font-medium">Settings</span>}
            {collapsed && <span className="sr-only">Settings</span>}
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;