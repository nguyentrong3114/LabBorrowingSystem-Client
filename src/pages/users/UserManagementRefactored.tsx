import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, UserCheck, UserX } from 'lucide-react';

// Import types
import type { User } from '../../types';

// Import shared components
import {
  PageHeader,
  StatCard,
  SearchAndFilter,
  DataTable,
  StatusBadge,
  type Column
} from '../../components/shared';

// Import UI components
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

// Import custom hooks
import { useTableFilters } from '../../hooks';

// Import utilities
import { formatDateTime } from '../../utils';

const UserManagement: React.FC = () => {
  const navigate = useNavigate();

  // Sample user data
  const users: User[] = [
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
  ];

  // Use custom hook for filtering
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredData
  } = useTableFilters({
    data: users,
    searchFields: ['name', 'email', 'department', 'role']
  });

  // Calculate statistics
  const stats = {
    total: users.length,
    active: users.filter(user => user.status === 'Active').length,
    inactive: users.filter(user => user.status === 'Inactive').length,
    suspended: users.filter(user => user.status === 'Suspended').length,
    students: users.filter(user => user.role === 'Student').length
  };

  // Define filter options
  const statusFilterOptions = [
    { value: 'All', label: 'All Status' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Suspended', label: 'Suspended' }
  ];

  // Define table columns
  const columns: Column<User>[] = [
    {
      key: 'name',
      label: 'User',
      render: (user) => (
        <div>
          <div className="font-medium">{user.name}</div>
          <div className="text-sm text-gray-600">{user.email}</div>
        </div>
      )
    },
    {
      key: 'role',
      label: 'Role',
      render: (user) => (
        <div>
          <div className="font-medium">{user.role}</div>
          <div className="text-sm text-gray-600">{user.department}</div>
        </div>
      )
    },
    {
      key: 'phone',
      label: 'Contact',
      render: (user) => <span className="text-gray-600">{user.phone}</span>
    },
    {
      key: 'status',
      label: 'Status',
      render: (user) => <StatusBadge status={user.status} />
    },
    {
      key: 'lastLogin',
      label: 'Last Login',
      render: (user) => (
        <span className="text-gray-600 text-sm">
          {formatDateTime(user.lastLogin)}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (user) => (
        <div className="flex items-center gap-2">
          {user.role === 'Student' ? (
            <Link to={`/users/${user.id}`}>
              <Button variant="outline" size="sm" title="View Borrowing Details">
                <Eye className="h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Button variant="outline" size="sm" title="View Details">
              <Eye className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            title="Edit User"
            onClick={() => navigate(`/users/${user.id}/edit`)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          {user.status === 'Active' ? (
            <Button
              variant="outline"
              size="sm"
              title="Suspend User"
              className="text-red-600 hover:bg-red-50"
            >
              <UserX className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              title="Activate User"
              className="text-green-600 hover:bg-green-50"
            >
              <UserCheck className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            title="Delete User"
            className="text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="container mx-auto py-8 space-y-6">
      <PageHeader
        title="User Management"
        subtitle="Manage system users and their permissions"
        actions={[
          {
            label: 'Add User',
            onClick: () => navigate('/users/new'),
            icon: Plus
          }
        ]}
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <StatCard
          title="Total Users"
          value={stats.total}
          color="gray"
        />
        <StatCard
          title="Active Users"
          value={stats.active}
          color="green"
        />
        <StatCard
          title="Inactive Users"
          value={stats.inactive}
          color="yellow"
        />
        <StatCard
          title="Suspended"
          value={stats.suspended}
          color="red"
        />
        <StatCard
          title="Students"
          value={stats.students}
          color="blue"
        />
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <SearchAndFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            searchPlaceholder="Search users..."
            filterValue={statusFilter}
            onFilterChange={setStatusFilter}
            filterOptions={statusFilterOptions}
          />
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <DataTable
            data={filteredData}
            columns={columns}
            emptyMessage="No users found matching your criteria"
          />
        </CardContent>
      </Card>

      <div className="text-sm text-gray-600">
        Showing {filteredData.length} of {users.length} users
      </div>
    </div>
  );
};

export default UserManagement;