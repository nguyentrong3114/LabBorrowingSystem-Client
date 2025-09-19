import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { 
  ArrowLeft, BarChart3, TrendingUp, Clock, Users, 
  Download, RefreshCw 
} from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

interface UsageData {
  period: string;
  hours: number;
  sessions: number;
  users: number;
}

interface UserUsageData {
  user: string;
  department: string;
  hours: number;
  sessions: number;
  lastUsed: string;
}

const EquipmentAnalytics = () => {
  const { id } = useParams();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [loading, setLoading] = useState(true);
  const [usageData, setUsageData] = useState<UsageData[]>([]);
  const [userUsageData, setUserUsageData] = useState<UserUsageData[]>([]);

  useEffect(() => {
    // Mock data generation based on time range
    const generateUsageData = (range: string) => {
      const data: UsageData[] = [];
      const now = new Date();
      let days = 30;
      
      switch (range) {
        case '7d': days = 7; break;
        case '30d': days = 30; break;
        case '90d': days = 90; break;
        case '1y': days = 365; break;
      }

      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        
        // Generate random but realistic usage data
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
        const baseHours = isWeekend ? Math.random() * 2 : 2 + Math.random() * 6;
        const sessions = Math.floor(baseHours / 2) + Math.floor(Math.random() * 3);
        const users = Math.min(sessions, Math.floor(Math.random() * 5) + 1);

        data.push({
          period: range === '1y' 
            ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          hours: Math.round(baseHours * 10) / 10,
          sessions,
          users
        });
      }
      return data;
    };

    const mockUserUsage: UserUsageData[] = [
      {
        user: 'Dr. Sarah Johnson',
        department: 'Biology',
        hours: 45.5,
        sessions: 18,
        lastUsed: '2024-09-17'
      },
      {
        user: 'Emily Davis',
        department: 'Chemistry',
        hours: 32.0,
        sessions: 12,
        lastUsed: '2024-09-16'
      },
      {
        user: 'Michael Chen',
        department: 'Physics',
        hours: 28.5,
        sessions: 15,
        lastUsed: '2024-09-15'
      },
      {
        user: 'Jessica Wilson',
        department: 'Biology',
        hours: 22.0,
        sessions: 9,
        lastUsed: '2024-09-14'
      },
      {
        user: 'David Brown',
        department: 'Chemistry',
        hours: 18.5,
        sessions: 8,
        lastUsed: '2024-09-13'
      }
    ];

    setLoading(true);
    setTimeout(() => {
      setUsageData(generateUsageData(timeRange));
      setUserUsageData(mockUserUsage);
      setLoading(false);
    }, 500);
  }, [timeRange]);

  // Calculate statistics
  const totalHours = usageData.reduce((sum, day) => sum + day.hours, 0);
  const totalSessions = usageData.reduce((sum, day) => sum + day.sessions, 0);
  const averageSessionLength = totalSessions > 0 ? totalHours / totalSessions : 0;
  const peakUsageDay = usageData.reduce((max, day) => day.hours > max.hours ? day : max, usageData[0] || { hours: 0, period: 'N/A' });

  // Prepare pie chart data for departments
  const departmentUsage = userUsageData.reduce((acc, user) => {
    acc[user.department] = (acc[user.department] || 0) + user.hours;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(departmentUsage).map(([department, hours]) => ({
    name: department,
    value: hours,
    percentage: Math.round((hours / Object.values(departmentUsage).reduce((a, b) => a + b, 0)) * 100)
  }));

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to={`/equipment/${id}`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Equipment Analytics</h1>
            <p className="text-gray-600">Digital Microscope Set A - Usage Analysis</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <select
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-600">{totalHours.toFixed(1)}h</p>
                <p className="text-sm text-gray-600">Total Usage</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">{totalSessions}</p>
                <p className="text-sm text-gray-600">Total Sessions</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-orange-600">{averageSessionLength.toFixed(1)}h</p>
                <p className="text-sm text-gray-600">Avg Session</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-purple-600">{userUsageData.length}</p>
                <p className="text-sm text-gray-600">Active Users</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usage Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Usage Trend</CardTitle>
            <CardDescription>Daily usage hours and sessions over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="hours" stroke="#3B82F6" strokeWidth={2} name="Hours" />
                <Line type="monotone" dataKey="sessions" stroke="#10B981" strokeWidth={2} name="Sessions" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Usage Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Usage by Department</CardTitle>
            <CardDescription>Distribution of usage across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name} ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Usage Intensity Heatmap (as Bar Chart) */}
        <Card>
          <CardHeader>
            <CardTitle>Usage Intensity</CardTitle>
            <CardDescription>Equipment utilization over the selected period</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="hours" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Peak Usage Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Peak Usage Analysis</CardTitle>
            <CardDescription>Highest usage periods and patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900">Peak Usage Day</h4>
                <p className="text-2xl font-bold text-blue-600">{peakUsageDay.period}</p>
                <p className="text-sm text-blue-700">{peakUsageDay.hours}h total usage</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900">Average Daily Usage</h4>
                <p className="text-2xl font-bold text-green-600">{(totalHours / usageData.length).toFixed(1)}h</p>
                <p className="text-sm text-green-700">Across {usageData.length} days</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-semibold text-orange-900">Utilization Rate</h4>
                <p className="text-2xl font-bold text-orange-600">
                  {Math.round((totalHours / (usageData.length * 8)) * 100)}%
                </p>
                <p className="text-sm text-orange-700">Based on 8h working days</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Users */}
      <Card>
        <CardHeader>
          <CardTitle>Top Users</CardTitle>
          <CardDescription>Most active users in the selected time period</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">#</th>
                  <th className="text-left py-3 px-4 font-medium">User</th>
                  <th className="text-left py-3 px-4 font-medium">Department</th>
                  <th className="text-left py-3 px-4 font-medium">Total Hours</th>
                  <th className="text-left py-3 px-4 font-medium">Sessions</th>
                  <th className="text-left py-3 px-4 font-medium">Avg Session</th>
                  <th className="text-left py-3 px-4 font-medium">Last Used</th>
                </tr>
              </thead>
              <tbody>
                {userUsageData.map((user, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-600">{index + 1}</td>
                    <td className="py-3 px-4 font-medium">{user.user}</td>
                    <td className="py-3 px-4 text-gray-600">{user.department}</td>
                    <td className="py-3 px-4 font-medium text-blue-600">{user.hours}h</td>
                    <td className="py-3 px-4 text-gray-600">{user.sessions}</td>
                    <td className="py-3 px-4 text-gray-600">{(user.hours / user.sessions).toFixed(1)}h</td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(user.lastUsed).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Insights and Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Insights & Recommendations</CardTitle>
          <CardDescription>AI-powered analysis of equipment usage patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">📊 Usage Pattern</h4>
              <p className="text-sm text-blue-700">
                Peak usage occurs on {peakUsageDay.period} with {peakUsageDay.hours} hours. 
                Consider scheduling maintenance during low-usage periods.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">👥 User Distribution</h4>
              <p className="text-sm text-green-700">
                {userUsageData.length} active users with Biology department leading usage. 
                Consider cross-training users to optimize equipment utilization.
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-semibold text-orange-900 mb-2">⚡ Efficiency</h4>
              <p className="text-sm text-orange-700">
                Average session length is {averageSessionLength.toFixed(1)} hours, indicating efficient usage. 
                Current utilization rate supports current demand.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">🔮 Forecast</h4>
              <p className="text-sm text-purple-700">
                Based on current trends, expect {Math.round(totalHours * 1.1)} hours usage next period. 
                Monitor for capacity planning.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EquipmentAnalytics;