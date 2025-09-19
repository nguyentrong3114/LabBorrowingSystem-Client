import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { 
  ArrowLeft, Plus, Calendar, CheckCircle,
  Clock, User, FileText, Filter, Search, Download
} from 'lucide-react';interface MaintenanceRecord {
  id: string;
  date: string;
  type: 'Preventive' | 'Corrective' | 'Emergency' | 'Calibration';
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  technician: string;
  duration: number; // in hours
  cost: number;
  description: string;
  partsUsed: string[];
  notes: string;
  attachments: string[];
  nextMaintenanceDue?: string;
}

interface MaintenanceSchedule {
  id: string;
  equipmentId: string;
  type: 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly' | 'Annual';
  interval: number;
  lastPerformed: string;
  nextDue: string;
  estimatedDuration: number;
  assignedTechnician: string;
  instructions: string;
  isActive: boolean;
}

const EquipmentMaintenance = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'history' | 'schedule' | 'upcoming'>('history');
  const [maintenanceHistory, setMaintenanceHistory] = useState<MaintenanceRecord[]>([]);
  const [maintenanceSchedules, setMaintenanceSchedules] = useState<MaintenanceSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockHistory: MaintenanceRecord[] = [
      {
        id: '1',
        date: '2024-09-15',
        type: 'Preventive',
        status: 'Completed',
        technician: 'John Smith',
        duration: 2.5,
        cost: 150,
        description: 'Quarterly maintenance - lens cleaning and calibration',
        partsUsed: ['Lens cleaning kit', 'Calibration standards'],
        notes: 'All systems functioning normally. Replaced LED bulb as preventive measure.',
        attachments: ['/docs/maintenance-report-001.pdf'],
        nextMaintenanceDue: '2024-12-15'
      },
      {
        id: '2',
        date: '2024-08-10',
        type: 'Corrective',
        status: 'Completed',
        technician: 'Sarah Johnson',
        duration: 1.0,
        cost: 75,
        description: 'Fixed stage movement mechanism',
        partsUsed: ['Stage motor gear'],
        notes: 'Replaced worn gear in stage movement system. Tested all movements.',
        attachments: []
      },
      {
        id: '3',
        date: '2024-06-15',
        type: 'Preventive',
        status: 'Completed',
        technician: 'John Smith',
        duration: 2.0,
        cost: 120,
        description: 'Quarterly maintenance and inspection',
        partsUsed: ['Lens cleaning kit'],
        notes: 'Routine maintenance completed successfully.',
        attachments: ['/docs/maintenance-report-002.pdf']
      },
      {
        id: '4',
        date: '2024-11-15',
        type: 'Preventive',
        status: 'Scheduled',
        technician: 'John Smith',
        duration: 2.5,
        cost: 150,
        description: 'Quarterly maintenance - upcoming',
        partsUsed: [],
        notes: 'Scheduled maintenance',
        attachments: []
      }
    ];

    const mockSchedules: MaintenanceSchedule[] = [
      {
        id: '1',
        equipmentId: id || '1',
        type: 'Quarterly',
        interval: 90,
        lastPerformed: '2024-09-15',
        nextDue: '2024-12-15',
        estimatedDuration: 2.5,
        assignedTechnician: 'John Smith',
        instructions: 'Complete lens cleaning, calibration check, and general inspection',
        isActive: true
      },
      {
        id: '2',
        equipmentId: id || '1',
        type: 'Annual',
        interval: 365,
        lastPerformed: '2024-01-15',
        nextDue: '2025-01-15',
        estimatedDuration: 4,
        assignedTechnician: 'Sarah Johnson',
        instructions: 'Complete overhaul including optical alignment and electronic calibration',
        isActive: true
      }
    ];

    setTimeout(() => {
      setMaintenanceHistory(mockHistory);
      setMaintenanceSchedules(mockSchedules);
      setLoading(false);
    }, 500);
  }, [id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Preventive': return 'bg-blue-100 text-blue-800';
      case 'Corrective': return 'bg-orange-100 text-orange-800';
      case 'Emergency': return 'bg-red-100 text-red-800';
      case 'Calibration': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredHistory = maintenanceHistory.filter(record => {
    const matchesType = filterType === 'All' || record.type === filterType;
    const matchesSearch = record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.technician.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const upcomingMaintenance = maintenanceHistory.filter(record => 
    record.status === 'Scheduled' || record.status === 'In Progress'
  );

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Loading maintenance data...</div>
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
            <h1 className="text-3xl font-bold">Equipment Maintenance</h1>
            <p className="text-gray-600">Digital Microscope Set A - Maintenance Management</p>
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Schedule Maintenance
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-600">{maintenanceHistory.filter(r => r.status === 'Completed').length}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-orange-600">{upcomingMaintenance.length}</p>
                <p className="text-sm text-gray-600">Upcoming</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">
                  ${maintenanceHistory.reduce((sum, record) => sum + record.cost, 0).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Total Cost</p>
              </div>
              <FileText className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-purple-600">{maintenanceSchedules.filter(s => s.isActive).length}</p>
                <p className="text-sm text-gray-600">Active Schedules</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('history')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'history'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Maintenance History
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'schedule'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Maintenance Schedules
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'upcoming'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Upcoming Maintenance
          </button>
        </nav>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search maintenance records..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="All">All Types</option>
                    <option value="Preventive">Preventive</option>
                    <option value="Corrective">Corrective</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Calibration">Calibration</option>
                  </select>
                </div>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Maintenance History */}
          <div className="space-y-4">
            {filteredHistory.map((record) => (
              <Card key={record.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{record.description}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(record.type)}`}>
                          {record.type}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(record.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{record.technician}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{record.duration}h</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span>${record.cost}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {record.notes && (
                    <div className="mb-3">
                      <p className="text-sm text-gray-700">
                        <strong>Notes:</strong> {record.notes}
                      </p>
                    </div>
                  )}

                  {record.partsUsed.length > 0 && (
                    <div className="mb-3">
                      <p className="text-sm text-gray-700 mb-1">
                        <strong>Parts Used:</strong>
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {record.partsUsed.map((part, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {part}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {record.attachments.length > 0 && (
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {record.attachments.length} attachment(s)
                      </span>
                      {record.attachments.map((attachment, index) => (
                        <a
                          key={index}
                          href={attachment}
                          className="text-xs text-blue-600 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Report
                        </a>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'schedule' && (
        <div className="space-y-4">
          {maintenanceSchedules.map((schedule) => (
            <Card key={schedule.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold">{schedule.type} Maintenance</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        schedule.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {schedule.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">Interval:</span>
                        <p>{schedule.interval} days</p>
                      </div>
                      <div>
                        <span className="font-medium">Last Performed:</span>
                        <p>{new Date(schedule.lastPerformed).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="font-medium">Next Due:</span>
                        <p className="text-orange-600 font-medium">{new Date(schedule.nextDue).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="font-medium">Duration:</span>
                        <p>{schedule.estimatedDuration}h</p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <span className="font-medium text-sm">Assigned Technician:</span>
                      <p className="text-sm text-gray-700">{schedule.assignedTechnician}</p>
                    </div>

                    <div>
                      <span className="font-medium text-sm">Instructions:</span>
                      <p className="text-sm text-gray-700">{schedule.instructions}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Edit Schedule
                    </Button>
                    <Button size="sm">
                      Schedule Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'upcoming' && (
        <div className="space-y-4">
          {upcomingMaintenance.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No upcoming maintenance scheduled</p>
                <Button className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Maintenance
                </Button>
              </CardContent>
            </Card>
          ) : (
            upcomingMaintenance.map((record) => (
              <Card key={record.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{record.description}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(record.type)}`}>
                          {record.type}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(record.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{record.technician}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{record.duration}h</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span>${record.cost}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                      <Button size="sm">
                        Start Maintenance
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default EquipmentMaintenance;