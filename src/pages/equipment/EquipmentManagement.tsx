import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Plus, Search, Edit, Trash2, Filter, Eye } from 'lucide-react';

interface Equipment {
  id: number;
  name: string;
  category: string;
  status: 'Available' | 'In Use' | 'Maintenance' | 'Broken';
  location: string;
  serialNumber: string;
  purchaseDate: string;
  lastMaintenance: string;
}

const EquipmentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  
  // Sample equipment data
  const [equipment] = useState<Equipment[]>([
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
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'In Use': return 'bg-blue-100 text-blue-800';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'Broken': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Equipment Management</h1>
          <p className="text-gray-600">Manage and track laboratory equipment inventory</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Equipment
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-green-600">32</CardTitle>
            <CardDescription>Available Equipment</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-blue-600">15</CardTitle>
            <CardDescription>Currently In Use</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-yellow-600">8</CardTitle>
            <CardDescription>Under Maintenance</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-red-600">3</CardTitle>
            <CardDescription>Broken/Repair Needed</CardDescription>
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
                placeholder="Search equipment..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Available">Available</option>
                <option value="In Use">In Use</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Broken">Broken</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Equipment List */}
      <Card>
        <CardHeader>
          <CardTitle>Equipment Inventory</CardTitle>
          <CardDescription>
            Total equipment: {filteredEquipment.length} items
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Equipment</th>
                  <th className="text-left py-3 px-4 font-medium">Category</th>
                  <th className="text-left py-3 px-4 font-medium">Location</th>
                  <th className="text-left py-3 px-4 font-medium">Serial Number</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Last Maintenance</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEquipment.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">{item.name}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{item.category}</td>
                    <td className="py-3 px-4 text-gray-600">{item.location}</td>
                    <td className="py-3 px-4 text-gray-600 font-mono text-sm">{item.serialNumber}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{item.lastMaintenance}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Link to={`/equipment/${item.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
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
    </div>
  );
};

export default EquipmentManagement;