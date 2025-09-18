import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  ResponsiveContainer
} from 'recharts';

// Sample data for charts
const labUsageData = [
  { name: 'Lab A', usage: 85, capacity: 30 },
  { name: 'Lab B', usage: 65, capacity: 25 },
  { name: 'Lab C', usage: 0, capacity: 40 },
  { name: 'Lab D', usage: 78, capacity: 20 },
  { name: 'Lab E', usage: 92, capacity: 35 },
];

const equipmentData = [
  { name: 'Computers', value: 45, color: '#0088FE' },
  { name: 'Lab Equipment', value: 30, color: '#00C49F' },
  { name: 'Furniture', value: 15, color: '#FFBB28' },
  { name: 'Electronics', value: 10, color: '#FF8042' },
];

const bookingTrendsData = [
  { month: 'Jan', bookings: 12, completed: 10 },
  { month: 'Feb', bookings: 19, completed: 16 },
  { month: 'Mar', bookings: 15, completed: 14 },
  { month: 'Apr', bookings: 25, completed: 22 },
  { month: 'May', bookings: 22, completed: 20 },
  { month: 'Jun', bookings: 30, completed: 28 },
];

const capacityUtilizationData = [
  { time: '8AM', utilization: 20 },
  { time: '9AM', utilization: 45 },
  { time: '10AM', utilization: 70 },
  { time: '11AM', utilization: 85 },
  { time: '12PM', utilization: 95 },
  { time: '1PM', utilization: 60 },
  { time: '2PM', utilization: 80 },
  { time: '3PM', utilization: 90 },
  { time: '4PM', utilization: 75 },
  { time: '5PM', utilization: 40 },
];

const Dashboard = () => {
  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {/* Quick Actions */}
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

      {/* Statistics Overview */}
      <Card>
        <CardHeader>
          <CardTitle>System Overview</CardTitle>
          <CardDescription>Lab Borrowing System Statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <h3 className="text-lg font-medium mb-1 text-blue-800">Total Labs</h3>
              <p className="text-3xl font-bold text-blue-600">5</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <h3 className="text-lg font-medium mb-1 text-green-800">Available Labs</h3>
              <p className="text-3xl font-bold text-green-600">3</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <h3 className="text-lg font-medium mb-1 text-purple-800">Equipment Items</h3>
              <p className="text-3xl font-bold text-purple-600">120</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <h3 className="text-lg font-medium mb-1 text-orange-800">Active Bookings</h3>
              <p className="text-3xl font-bold text-orange-600">8</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Lab Usage Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Lab Usage Statistics</CardTitle>
            <CardDescription>Current usage vs capacity for each lab</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={labUsageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="usage" fill="#3b82f6" name="Current Usage %" />
                <Bar dataKey="capacity" fill="#e5e7eb" name="Total Capacity" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Equipment Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Equipment Distribution</CardTitle>
            <CardDescription>Breakdown of equipment by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={equipmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {equipmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Booking Trends Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Trends</CardTitle>
            <CardDescription>Monthly booking statistics and completion rates</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bookingTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="bookings" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Total Bookings"
                />
                <Line 
                  type="monotone" 
                  dataKey="completed" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Completed Bookings"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Lab Capacity Utilization Area Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Capacity Utilization</CardTitle>
            <CardDescription>Lab utilization throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={capacityUtilizationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="utilization" 
                  stroke="#8b5cf6" 
                  fill="#8b5cf6"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;