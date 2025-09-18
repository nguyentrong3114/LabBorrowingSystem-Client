import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Plus, Search, Filter, Edit, Trash2, Eye, UserCheck, UserX } from 'lucide-react';
import { Link } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  role: 'Admin' | 'Lab Manager' | 'Faculty' | 'Student' | 'Researcher';
  status: 'Active' | 'Inactive' | 'Suspended';
  joinDate: string;
  lastLogin: string;
  permissions: string[];
}

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  
  // Sample user data
  const [users] = useState<User[]>([
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@university.edu',
      phone: '+1 (555) 123-4567',
      department: 'Biology',
      role: 'Faculty',
      status: 'Active',
      joinDate: '2023-01-15',
      lastLogin: '2024-09-18 14:30',
      permissions: ['View Labs', 'Book Labs', 'Manage Equipment']
    },
    {
      id: 2,
      name: 'John Smith',
      email: 'john.smith@university.edu',
      phone: '+1 (555) 234-5678',
      department: 'Computer Science',
      role: 'Admin',
      status: 'Active',
      joinDate: '2022-08-20',
      lastLogin: '2024-09-19 09:15',
      permissions: ['Full Access', 'User Management', 'System Settings']
    },
    {
      id: 3,
      name: 'Emily Davis',
      email: 'emily.davis@student.university.edu',
      phone: '+1 (555) 345-6789',
      department: 'Chemistry',
      role: 'Student',
      status: 'Active',
      joinDate: '2024-01-10',
      lastLogin: '2024-09-17 16:45',
      permissions: ['View Labs', 'Book Labs']
    },
    {
      id: 4,
      name: 'Dr. Michael Chen',
      email: 'michael.chen@university.edu',
      phone: '+1 (555) 456-7890',
      department: 'Physics',
      role: 'Lab Manager',
      status: 'Active',
      joinDate: '2023-06-01',
      lastLogin: '2024-09-18 11:20',
      permissions: ['Manage Labs', 'Manage Equipment', 'View Reports']
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      email: 'lisa.anderson@university.edu',
      phone: '+1 (555) 567-8901',
      department: 'Engineering',
      role: 'Researcher',
      status: 'Suspended',
      joinDate: '2023-03-12',
      lastLogin: '2024-08-15 13:25',
      permissions: ['View Labs', 'Book Labs', 'Access Research Data']
    },
    {
      id: 6,
      name: 'Robert Wilson',
      email: 'robert.wilson@student.university.edu',
      phone: '+1 (555) 678-9012',
      department: 'Mathematics',
      role: 'Student',
      status: 'Inactive',
      joinDate: '2023-09-01',
      lastLogin: '2024-05-20 10:30',
      permissions: ['View Labs']
    }
  ]);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-purple-100 text-purple-800';
      case 'Lab Manager': return 'bg-blue-100 text-blue-800';
      case 'Faculty': return 'bg-green-100 text-green-800';
      case 'Researcher': return 'bg-yellow-100 text-yellow-800';
      case 'Student': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'All' || user.role === filterRole;
    const matchesStatus = filterStatus === 'All' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const roleStats = {
    Admin: users.filter(u => u.role === 'Admin').length,
    'Lab Manager': users.filter(u => u.role === 'Lab Manager').length,
    Faculty: users.filter(u => u.role === 'Faculty').length,
    Researcher: users.filter(u => u.role === 'Researcher').length,
    Student: users.filter(u => u.role === 'Student').length,
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-gray-600">Manage system users and their permissions</p>
        </div>
        <Link to="/users/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add User
          </Button>
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-purple-600">{roleStats.Admin}</CardTitle>
            <CardDescription>Administrators</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-blue-600">{roleStats['Lab Manager']}</CardTitle>
            <CardDescription>Lab Managers</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-green-600">{roleStats.Faculty}</CardTitle>
            <CardDescription>Faculty Members</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-yellow-600">{roleStats.Researcher}</CardTitle>
            <CardDescription>Researchers</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-gray-600">{roleStats.Student}</CardTitle>
            <CardDescription>Students</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <option value="All">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Lab Manager">Lab Manager</option>
                <option value="Faculty">Faculty</option>
                <option value="Researcher">Researcher</option>
                <option value="Student">Student</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>System Users</CardTitle>
          <CardDescription>
            Total users: {filteredUsers.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">User</th>
                  <th className="text-left py-3 px-4 font-medium">Department</th>
                  <th className="text-left py-3 px-4 font-medium">Role</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Last Login</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-600">{user.email}</div>
                        <div className="text-xs text-gray-500">{user.phone}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{user.department}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 text-sm">
                      {new Date(user.lastLogin).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" title="View Details">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Link to={`/users/${user.id}/edit`}>
                          <Button variant="outline" size="sm" title="Edit User">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        {user.status === 'Active' ? (
                          <Button variant="outline" size="sm" title="Suspend User" className="text-red-600 hover:bg-red-50">
                            <UserX className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" title="Activate User" className="text-green-600 hover:bg-green-50">
                            <UserCheck className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="outline" size="sm" title="Delete User" className="text-red-600 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No users found matching your criteria.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;