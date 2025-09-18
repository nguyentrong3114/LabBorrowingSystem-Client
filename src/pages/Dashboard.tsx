import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Lab Management</CardTitle>
            <CardDescription>Manage your laboratory facilities</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-end">
            <Link to="/labs">
              <Button>Go to Labs</Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Equipment Inventory</CardTitle>
            <CardDescription>Manage laboratory equipment</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-end">
            <Button variant="outline">Coming Soon</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Booking Management</CardTitle>
            <CardDescription>Manage lab reservations</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-end">
            <Button variant="outline">Coming Soon</Button>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>System Overview</CardTitle>
          <CardDescription>Lab Borrowing System Statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-primary/10 p-4 rounded-lg text-center">
              <h3 className="text-lg font-medium mb-1">Total Labs</h3>
              <p className="text-3xl font-bold">5</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg text-center">
              <h3 className="text-lg font-medium mb-1">Available Labs</h3>
              <p className="text-3xl font-bold">3</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg text-center">
              <h3 className="text-lg font-medium mb-1">Equipment Items</h3>
              <p className="text-3xl font-bold">120</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg text-center">
              <h3 className="text-lg font-medium mb-1">Active Bookings</h3>
              <p className="text-3xl font-bold">8</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;