import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { 
  ArrowLeft, 
  User, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  BookOpen,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Award,
  History,
  Filter
} from 'lucide-react';

interface StudentInfo {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  studentId: string;
  year: number;
  program: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  joinDate: string;
  totalBorrows: number;
  activeBorrows: number;
  overdueItems: number;
  averageUsageHours: number;
}

interface BorrowRecord {
  id: number;
  equipmentId: number;
  equipmentName: string;
  equipmentType: string;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'Active' | 'Returned' | 'Overdue' | 'Lost';
  purpose: string;
  labLocation: string;
  approvedBy: string;
  usageHours?: number;
  condition: 'Good' | 'Fair' | 'Damaged';
  notes?: string;
}

const StudentBorrowDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'current' | 'history' | 'analytics'>('overview');
  const [filterStatus, setFilterStatus] = useState('All');
  
  // Sample student data
  const [studentInfo] = useState<StudentInfo>({
    id: 3,
    name: 'Emily Davis',
    email: 'emily.davis@student.university.edu',
    phone: '+1 (555) 345-6789',
    department: 'Chemistry',
    studentId: 'STU2024001',
    year: 2,
    program: 'Bachelor of Science in Chemistry',
    status: 'Active',
    joinDate: '2024-01-10',
    totalBorrows: 45,
    activeBorrows: 3,
    overdueItems: 1,
    averageUsageHours: 12.5
  });

  // Sample borrow records
  const [borrowRecords] = useState<BorrowRecord[]>([
    {
      id: 1,
      equipmentId: 1,
      equipmentName: 'Microscope - Olympus CX23',
      equipmentType: 'Laboratory Equipment',
      borrowDate: '2024-09-15',
      dueDate: '2024-09-22',
      status: 'Active',
      purpose: 'Cell Biology Lab Assignment',
      labLocation: 'Lab A - Room 201',
      approvedBy: 'Dr. Michael Chen',
      condition: 'Good',
      notes: 'Handle with care, expensive equipment'
    },
    {
      id: 2,
      equipmentId: 5,
      equipmentName: 'Digital Scale - Mettler Toledo',
      equipmentType: 'Measuring Equipment',
      borrowDate: '2024-09-10',
      dueDate: '2024-09-17',
      status: 'Overdue',
      purpose: 'Analytical Chemistry Experiment',
      labLocation: 'Lab C - Room 105',
      approvedBy: 'Dr. Sarah Johnson',
      condition: 'Good',
      notes: 'Overdue by 2 days'
    },
    {
      id: 3,
      equipmentId: 3,
      equipmentName: 'pH Meter - Hanna HI-2020',
      equipmentType: 'Measuring Equipment',
      borrowDate: '2024-09-12',
      dueDate: '2024-09-19',
      status: 'Active',
      purpose: 'Water Quality Analysis Project',
      labLocation: 'Lab B - Room 150',
      approvedBy: 'Dr. Michael Chen',
      condition: 'Good'
    },
    {
      id: 4,
      equipmentId: 2,
      equipmentName: 'Centrifuge - Eppendorf 5424',
      equipmentType: 'Laboratory Equipment',
      borrowDate: '2024-08-20',
      dueDate: '2024-08-27',
      returnDate: '2024-08-26',
      status: 'Returned',
      purpose: 'Protein Isolation Lab',
      labLocation: 'Lab A - Room 201',
      approvedBy: 'Dr. Sarah Johnson',
      usageHours: 15,
      condition: 'Good',
      notes: 'Returned in excellent condition'
    },
    {
      id: 5,
      equipmentId: 4,
      equipmentName: 'Spectrophotometer - Thermo Fisher',
      equipmentType: 'Analytical Equipment',
      borrowDate: '2024-08-05',
      dueDate: '2024-08-12',
      returnDate: '2024-08-11',
      status: 'Returned',
      purpose: 'UV-Vis Analysis',
      labLocation: 'Lab C - Room 105',
      approvedBy: 'Dr. Michael Chen',
      usageHours: 8,
      condition: 'Good'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-blue-100 text-blue-800';
      case 'Returned': return 'bg-green-100 text-green-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Lost': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Good': return 'text-green-600';
      case 'Fair': return 'text-yellow-600';
      case 'Damaged': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const currentBorrows = borrowRecords.filter(record => record.status === 'Active' || record.status === 'Overdue');
  const borrowHistory = borrowRecords.filter(record => record.status === 'Returned' || record.status === 'Lost');

  const filteredRecords = filterStatus === 'All' 
    ? borrowRecords 
    : borrowRecords.filter(record => record.status === filterStatus);

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/users">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Users
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Student Borrowing Details</h1>
          <p className="text-gray-600">Detailed borrowing information and history</p>
        </div>
      </div>

      {/* Student Information Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Student Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{studentInfo.name}</h3>
                <p className="text-gray-600">ID: {studentInfo.studentId}</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  studentInfo.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {studentInfo.status}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  {studentInfo.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  {studentInfo.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {studentInfo.department}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Academic Information</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Program: {studentInfo.program}</p>
                  <p>Year: {studentInfo.year}</p>
                  <p>Join Date: {studentInfo.joinDate}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Borrowing Statistics</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Borrows:</span>
                    <span className="font-medium">{studentInfo.totalBorrows}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Active Borrows:</span>
                    <span className="font-medium text-blue-600">{studentInfo.activeBorrows}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Overdue Items:</span>
                    <span className="font-medium text-red-600">{studentInfo.overdueItems}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Avg. Usage (hrs):</span>
                    <span className="font-medium">{studentInfo.averageUsageHours}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-blue-600">{currentBorrows.length}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              Current Borrows
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-red-600">{studentInfo.overdueItems}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              Overdue Items
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-green-600">{borrowHistory.length}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4" />
              Completed Returns
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-purple-600">{studentInfo.averageUsageHours}h</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              Average Usage
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b">
        <nav className="flex space-x-8">
          {[
            { key: 'overview', label: 'Overview', icon: User },
            { key: 'current', label: 'Current Borrows', icon: BookOpen },
            { key: 'history', label: 'History', icon: History },
            { key: 'analytics', label: 'Analytics', icon: TrendingUp }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Borrowing Activity</CardTitle>
              <CardDescription>Latest equipment borrows and returns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {borrowRecords.slice(0, 5).map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{record.equipmentName}</div>
                      <div className="text-sm text-gray-600">
                        {record.status === 'Returned' ? 'Returned' : 'Borrowed'} on {record.status === 'Returned' ? record.returnDate : record.borrowDate}
                      </div>
                      <div className="text-xs text-gray-500">{record.purpose}</div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
              <CardDescription>Student borrowing behavior analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium">On-time Return Rate</div>
                      <div className="text-sm text-gray-600">95% of items returned on time</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-green-600">95%</div>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="font-medium">Average Borrow Duration</div>
                      <div className="text-sm text-gray-600">Typical usage period</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">7 days</div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-purple-500" />
                    <div>
                      <div className="font-medium">Equipment Condition</div>
                      <div className="text-sm text-gray-600">Items returned in good condition</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">98%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'current' && (
        <Card>
          <CardHeader>
            <CardTitle>Current Borrows</CardTitle>
            <CardDescription>Equipment currently borrowed by the student</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Equipment</th>
                    <th className="text-left py-3 px-4 font-medium">Borrowed</th>
                    <th className="text-left py-3 px-4 font-medium">Due Date</th>
                    <th className="text-left py-3 px-4 font-medium">Location</th>
                    <th className="text-left py-3 px-4 font-medium">Purpose</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-left py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentBorrows.map((record) => (
                    <tr key={record.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{record.equipmentName}</div>
                          <div className="text-sm text-gray-600">{record.equipmentType}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{record.borrowDate}</td>
                      <td className="py-3 px-4">
                        <span className={record.status === 'Overdue' ? 'text-red-600 font-medium' : 'text-gray-600'}>
                          {record.dueDate}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{record.labLocation}</td>
                      <td className="py-3 px-4 text-gray-600">{record.purpose}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <AlertCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'history' && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Borrowing History</CardTitle>
                <CardDescription>Complete record of past equipment borrows</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Returned">Returned</option>
                  <option value="Overdue">Overdue</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Equipment</th>
                    <th className="text-left py-3 px-4 font-medium">Borrowed</th>
                    <th className="text-left py-3 px-4 font-medium">Returned</th>
                    <th className="text-left py-3 px-4 font-medium">Duration</th>
                    <th className="text-left py-3 px-4 font-medium">Purpose</th>
                    <th className="text-left py-3 px-4 font-medium">Condition</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record) => (
                    <tr key={record.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{record.equipmentName}</div>
                          <div className="text-sm text-gray-600">{record.equipmentType}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{record.borrowDate}</td>
                      <td className="py-3 px-4 text-gray-600">{record.returnDate || '-'}</td>
                      <td className="py-3 px-4 text-gray-600">
                        {record.usageHours ? `${record.usageHours}h` : '-'}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{record.purpose}</td>
                      <td className="py-3 px-4">
                        <span className={`font-medium ${getConditionColor(record.condition)}`}>
                          {record.condition}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Borrowing Trends</CardTitle>
              <CardDescription>Equipment borrowing patterns over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-gray-500 py-8">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Chart visualization would go here</p>
                <p className="text-sm">Showing borrowing trends over the last 12 months</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Equipment Categories</CardTitle>
              <CardDescription>Most borrowed equipment types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Laboratory Equipment</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div className="w-3/4 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Measuring Equipment</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div className="w-1/2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">50%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Analytical Equipment</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div className="w-1/3 h-2 bg-yellow-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">33%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Safety Equipment</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div className="w-1/4 h-2 bg-purple-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default StudentBorrowDetails;