import React, { useEffect, useState } from 'react';
import { Plus, Search, MoreHorizontal, AlertTriangle, Wrench } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { 
  fetchEquipment, 
  setSearchTerm,
  setStatusFilter,
  setCategoryFilter,
  clearFilters
} from '../../store/slices/equipmentSlice';
import { addNotification } from '../../store/slices/uiSlice';
import type { Equipment } from '../../types';
import type { RootState } from '../../store';

const EquipmentManagementWithRedux: React.FC = () => {
  const dispatch = useAppDispatch();
  const { 
    items: equipment, 
    loading, 
    error, 
    filters,
    statistics 
  } = useAppSelector((state: RootState) => state.equipment);

  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

  useEffect(() => {
    dispatch(fetchEquipment());
  }, [dispatch]);

  const handleSearch = (term: string) => {
    dispatch(setSearchTerm(term));
  };

  const handleStatusFilter = (status: string) => {
    dispatch(setStatusFilter(status));
  };

  const handleCategoryFilter = (category: string) => {
    dispatch(setCategoryFilter(category));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const showNotification = () => {
    dispatch(addNotification({
      type: 'success',
      title: 'Success',
      message: 'Operation completed successfully'
    }));
  };

  // Filter equipment based on Redux state
  const filteredEquipment = equipment.filter((item: Equipment) => {
    const matchesSearch = !filters.searchTerm || 
      item.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      (item.model && item.model.toLowerCase().includes(filters.searchTerm.toLowerCase())) ||
      item.serialNumber.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    const matchesStatus = filters.status === 'All' || item.status === filters.status;
    const matchesCategory = filters.category === 'All' || item.category === filters.category;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'In Use': return 'bg-yellow-100 text-yellow-800';
      case 'Maintenance': return 'bg-red-100 text-red-800';
      case 'Broken': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        <span className="ml-4 text-lg">Loading equipment...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-8">
        <AlertTriangle size={48} className="mx-auto mb-4" />
        <p className="text-lg mb-4">{error}</p>
        <button
          onClick={() => dispatch(fetchEquipment())}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Equipment Management (Redux)</h1>
          <p className="text-gray-600">Manage lab equipment inventory with Redux state management</p>
        </div>
        <button
          onClick={showNotification}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Add Equipment</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Wrench className="text-blue-500" size={24} />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Equipment</p>
              <p className="text-2xl font-bold text-gray-900">{statistics.totalEquipment}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-green-500 rounded-full"></div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Available</p>
              <p className="text-2xl font-bold text-green-600">{statistics.availableEquipment}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">In Use</p>
              <p className="text-2xl font-bold text-yellow-600">{statistics.inUseEquipment}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-red-500 rounded-full"></div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Maintenance</p>
              <p className="text-2xl font-bold text-red-600">{statistics.maintenanceEquipment}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search equipment..."
              value={filters.searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filters.status}
            onChange={(e) => handleStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All Status</option>
            <option value="Available">Available</option>
            <option value="In Use">In Use</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Broken">Broken</option>
          </select>
          
          <select
            value={filters.category}
            onChange={(e) => handleCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All Categories</option>
            <option value="Microscopes">Microscopes</option>
            <option value="Centrifuges">Centrifuges</option>
            <option value="Spectrophotometers">Spectrophotometers</option>
            <option value="pH Meters">pH Meters</option>
          </select>
          
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Equipment Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Equipment List ({filteredEquipment.length} items)
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Equipment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Maintenance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEquipment.map((item: Equipment) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.model || 'N/A'}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.lastMaintenance).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedEquipment(item)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <MoreHorizontal size={16} />
                      </button>
                      <button
                        onClick={() => setSelectedEquipment(item)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <AlertTriangle size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredEquipment.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No equipment found matching your filters.</p>
          </div>
        )}
      </div>
      
      {selectedEquipment && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            Selected: <strong>{selectedEquipment.name}</strong> - {selectedEquipment.status}
          </p>
          <button
            onClick={() => setSelectedEquipment(null)}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800"
          >
            Clear selection
          </button>
        </div>
      )}
    </div>
  );
};

export default EquipmentManagementWithRedux;