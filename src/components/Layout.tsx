import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navbar */}
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">Lab Borrowing System</h1>
          </div>
          <nav className="flex items-center gap-6">
            <Link to="/" className="hover:underline">Dashboard</Link>
            <Link to="/labs" className="hover:underline">Labs</Link>
            <Button variant="outline" className="bg-primary-foreground text-primary">
              Login
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-background">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-muted py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Lab Borrowing System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;