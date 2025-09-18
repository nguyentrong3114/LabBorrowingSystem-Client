import { Outlet, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import Sidebar from './Sidebar';
import GlobalSearch from './GlobalSearch';
import MobileSearch from './MobileSearch';
import { useState, useEffect } from 'react';
import { Menu, X, Search } from 'lucide-react';

const Layout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  
  // Handle responsive layout
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // Only auto-collapse on initial mobile detection
      if (mobile && !isMobile) {
        setSidebarCollapsed(true);
      }
    };

    // Check on initial load
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Clean up event listener
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [isMobile]);

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileMenuOpen(!mobileMenuOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Overlay for mobile sidebar */}
      {isMobile && mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Header/Navbar */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50 h-14">
        <div className="h-full flex justify-between items-center px-4 gap-4">
          <div className="flex items-center gap-2 flex-shrink-0">
            {isMobile && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleSidebar} 
                className="text-gray-700"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            )}
            <h1 className="text-lg font-bold">Lab Borrowing System</h1>
          </div>
          
          {/* Search Component */}
          <div className="flex-1 max-w-2xl mx-4 hidden md:block">
            <GlobalSearch />
          </div>
          
          <nav className="flex items-center gap-4 flex-shrink-0">
            {/* Mobile Search Button */}
            {isMobile && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-700 md:hidden"
                onClick={() => setMobileSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
            <Link to="/login">
              <Button variant="outline" className="text-sm">
                Login
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Mobile Search Modal */}
      <MobileSearch 
        isOpen={mobileSearchOpen} 
        onClose={() => setMobileSearchOpen(false)} 
      />

      {/* Sidebar */}
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={toggleSidebar}
        isMobile={isMobile && !mobileMenuOpen}
      />

      {/* Main Content */}
      <main 
        className={`flex-1 bg-gray-50 pt-14 transition-all duration-300 ${
          !isMobile && !sidebarCollapsed ? 'ml-64' : 
          !isMobile && sidebarCollapsed ? 'ml-16' : 'ml-0'
        }`}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer 
        className={`bg-white py-4 border-t border-gray-200 transition-all duration-300 ${
          !isMobile && !sidebarCollapsed ? 'ml-64' : 
          !isMobile && sidebarCollapsed ? 'ml-16' : 'ml-0'
        }`}
      >
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Lab Borrowing System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;