import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

// Import types from centralized location
import type { Equipment } from '../../types';

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

const EquipmentManagement: React.FC = () => {
  const navigate = useNavigate();

  // Sample equipment data - in real app this would come from API
  const equipment: Equipment[] = [
    {
      id: 1,
      name: 'Microscope - Olympus BX53',
      category: 'Laboratory Equipment',
      status: 'Available',
      location: 'Lab A',
      serialNumber: 'OLY-BX53-001',
      purchaseDate: '2023-03-15',
      lastMaintenance: '2024-08-15'
    },
    {
      id: 2,
      name: 'Computer - Dell OptiPlex',
      category: 'Computer',
      status: 'In Use',
      location: 'Lab B',
      serialNumber: 'DEL-OPT-002',
      purchaseDate: '2022-11-20',
      lastMaintenance: '2024-07-10'
    },
    {
      id: 3,
      name: 'Centrifuge - Eppendorf 5810R',
      category: 'Laboratory Equipment',
      status: 'Maintenance',
      location: 'Lab C',
      serialNumber: 'EPP-5810-003',
      purchaseDate: '2023-01-10',
      lastMaintenance: '2024-09-01'
    },
    {
      id: 4,
      name: 'pH Meter - Hanna HI-2020',
      category: 'Measuring Equipment',
      status: 'Available',
      location: 'Lab A',
      serialNumber: 'HAN-HI20-004',
      purchaseDate: '2023-06-05',
      lastMaintenance: '2024-08-20'
    },
    {
      id: 5,
      name: 'Autoclave - Tuttnauer 3870EA',
      category: 'Safety Equipment',
      status: 'Broken',
      location: 'Lab D',
      serialNumber: 'TUT-3870-005',
      purchaseDate: '2022-08-15',
      lastMaintenance: '2024-06-15'
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
    data: equipment,
    searchFields: ['name', 'category', 'location', 'serialNumber']
  });

  // Calculate statistics
  const stats = {
    total: equipment.length,
    available: equipment.filter(item => item.status === 'Available').length,
    inUse: equipment.filter(item => item.status === 'In Use').length,
    maintenance: equipment.filter(item => item.status === 'Maintenance').length,
    broken: equipment.filter(item => item.status === 'Broken').length
  };

  // Define filter options
  const statusFilterOptions = [
    { value: 'All', label: 'All Status' },
    { value: 'Available', label: 'Available' },
    { value: 'In Use', label: 'In Use' },
    { value: 'Maintenance', label: 'Maintenance' },
    { value: 'Broken', label: 'Broken' }
  ];

  // Define table columns
  const columns: Column<Equipment>[] = [
    {
      key: 'name',
      label: 'Equipment',
      render: (item) => (
        <div>
          <div className="font-medium">{item.name}</div>
          <div className="text-sm text-gray-600">{item.category}</div>
        </div>
      )
    },
    {
      key: 'location',
      label: 'Location',
      render: (item) => <span className="text-gray-600">{item.location}</span>
    },
    {
      key: 'serialNumber',
      label: 'Serial Number',
      render: (item) => (
        <span className="text-gray-600 font-mono text-sm">{item.serialNumber}</span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (item) => <StatusBadge status={item.status} />
    },
    {
      key: 'lastMaintenance',
      label: 'Last Maintenance',
      render: (item) => <span className="text-gray-600">{item.lastMaintenance}</span>
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (item) => (
        <div className="flex items-center gap-2">
          <Link to={`/equipment/${item.id}`}>
            <Button variant="outline" size="sm" title="View Details">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="sm" 
            title="Edit Equipment"
            onClick={() => navigate(`/equipment/${item.id}/edit`)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" title="Delete Equipment">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="container mx-auto py-8 space-y-6">
      <PageHeader
        title="Equipment Management"
        subtitle="Manage and track laboratory equipment inventory"
        actions={[
          {
            label: 'Add Equipment',
            onClick: () => navigate('/equipment/new'),
            icon: Plus
          }
        ]}
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <StatCard
          title="Total Equipment"
          value={stats.total}
          color="gray"
        />
        <StatCard
          title="Available"
          value={stats.available}
          color="green"
        />
        <StatCard
          title="In Use"
          value={stats.inUse}
          color="blue"
        />
        <StatCard
          title="Under Maintenance"
          value={stats.maintenance}
          color="yellow"
        />
        <StatCard
          title="Broken/Repair"
          value={stats.broken}
          color="red"
        />
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <SearchAndFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            searchPlaceholder="Search equipment..."
            filterValue={statusFilter}
            onFilterChange={setStatusFilter}
            filterOptions={statusFilterOptions}
          />
        </CardContent>
      </Card>

      {/* Equipment Table */}
      <Card>
        <CardContent className="p-0">
          <DataTable
            data={filteredData}
            columns={columns}
            emptyMessage="No equipment found matching your criteria"
          />
        </CardContent>
      </Card>

      <div className="text-sm text-gray-600">
        Showing {filteredData.length} of {equipment.length} equipment items
      </div>
    </div>
  );
};

export default EquipmentManagement;