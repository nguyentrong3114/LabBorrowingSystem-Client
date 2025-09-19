import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { 
  ArrowLeft, Edit, Calendar, AlertTriangle, CheckCircle, Clock, 
  MapPin, FileText, Settings, BarChart3, Wrench, BookOpen 
} from 'lucide-react';

interface Equipment {
  id: string;
  name: string;
  category: string;
  model: string;
  manufacturer: string;
  serialNumber: string;
  status: 'Available' | 'In Use' | 'Under Maintenance' | 'Out of Service';
  location: {
    lab: string;
    building: string;
    room: string;
    position: string;
  };
  specifications: {
    [key: string]: string;
  };
  purchaseInfo: {
    date: string;
    cost: number;
    supplier: string;
    warrantyExpiry: string;
  };
  maintenanceSchedule: {
    lastMaintenance: string;
    nextMaintenance: string;
    interval: string;
    responsible: string;
  };
  usage: {
    totalHours: number;
    currentUser?: string;
    lastUsed: string;
    bookingsThisMonth: number;
  };
  documents: {
    manual: string;
    warranty: string;
    calibrationCert: string;
  };
  description: string;
  safetyNotes: string[];
  operatingInstructions: string[];
}

const EquipmentDetails = () => {
  const { id } = useParams();
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call - in real app, fetch from API
    const fetchEquipment = async () => {
      setLoading(true);
      // Mock data
      const mockEquipment: Equipment = {
        id: id || '1',
        name: 'Digital Microscope Set A',
        category: 'Optical Equipment',
        model: 'BioScope Pro 3000',
        manufacturer: 'MicroTech Industries',
        serialNumber: 'MT-2024-001',
        status: 'Available',
        location: {
          lab: 'Biology Lab A',
          building: 'Science Building 1',
          room: 'Room 201',
          position: 'Station 3'
        },
        specifications: {
          'Magnification Range': '40x - 1000x',
          'Camera Resolution': '5MP Digital Camera',
          'Light Source': 'LED with Brightness Control',
          'Stage Size': '120mm x 120mm',
          'Weight': '15kg',
          'Power Requirements': '110-240V AC, 50-60Hz'
        },
        purchaseInfo: {
          date: '2024-01-15',
          cost: 15000,
          supplier: 'Scientific Equipment Ltd.',
          warrantyExpiry: '2027-01-15'
        },
        maintenanceSchedule: {
          lastMaintenance: '2024-08-15',
          nextMaintenance: '2024-11-15',
          interval: 'Quarterly',
          responsible: 'Dr. Michael Chen'
        },
        usage: {
          totalHours: 245,
          lastUsed: '2024-09-17',
          bookingsThisMonth: 8
        },
        documents: {
          manual: '/docs/bioscope-manual.pdf',
          warranty: '/docs/warranty-mt2024001.pdf',
          calibrationCert: '/docs/calibration-cert.pdf'
        },
        description: 'High-resolution digital microscope with integrated camera system for biological research and education. Features advanced LED illumination and precision optics.',
        safetyNotes: [
          'Always handle glass slides carefully',
          'Clean lenses with appropriate lens cleaning solution only',
          'Ensure proper ventilation when using immersion oil',
          'Do not exceed maximum stage load of 2kg'
        ],
        operatingInstructions: [
          'Turn on the microscope and allow 5 minutes warm-up',
          'Place specimen on stage and secure with clips',
          'Start with lowest magnification (40x)',
          'Use coarse focus to bring specimen into view',
          'Use fine focus for precise adjustment',
          'Adjust illumination as needed for optimal viewing',
          'When finished, return to lowest magnification',
          'Clean stage and turn off equipment'
        ]
      };

      setTimeout(() => {
        setEquipment(mockEquipment);
        setLoading(false);
      }, 500);
    };

    fetchEquipment();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Loading equipment details...</div>
      </div>
    );
  }

  if (!equipment) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Equipment not found</div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'In Use': return 'bg-blue-100 text-blue-800';
      case 'Under Maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'Out of Service': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Available': return <CheckCircle className="h-4 w-4" />;
      case 'In Use': return <Clock className="h-4 w-4" />;
      case 'Under Maintenance': return <Wrench className="h-4 w-4" />;
      case 'Out of Service': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/equipment">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{equipment.name}</h1>
            <p className="text-gray-600">{equipment.category} • {equipment.manufacturer}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(equipment.status)}`}>
            {getStatusIcon(equipment.status)}
            {equipment.status}
          </div>
          <Link to={`/equipment/${equipment.id}/edit`}>
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Edit Equipment
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link to={`/equipment/${equipment.id}/booking`}>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Book Equipment</p>
                  <p className="text-xs text-gray-500">Reserve for use</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to={`/equipment/${equipment.id}/maintenance`}>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Maintenance</p>
                  <p className="text-xs text-gray-500">Schedule & history</p>
                </div>
                <Wrench className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to={`/equipment/${equipment.id}/analytics`}>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Usage Analytics</p>
                  <p className="text-xs text-gray-500">View statistics</p>
                </div>
                <BarChart3 className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Documentation</p>
                <p className="text-xs text-gray-500">Manuals & certs</p>
              </div>
              <FileText className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">Model:</span>
                <p>{equipment.model}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Serial Number:</span>
                <p className="font-mono">{equipment.serialNumber}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Manufacturer:</span>
                <p>{equipment.manufacturer}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Category:</span>
                <p>{equipment.category}</p>
              </div>
            </div>
            <div>
              <span className="font-medium text-gray-600">Description:</span>
              <p className="text-sm text-gray-700 mt-1">{equipment.description}</p>
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-gray-600 w-20">Lab:</span>
              <span>{equipment.location.lab}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-gray-600 w-20">Building:</span>
              <span>{equipment.location.building}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-gray-600 w-20">Room:</span>
              <span>{equipment.location.room}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-gray-600 w-20">Position:</span>
              <span>{equipment.location.position}</span>
            </div>
          </CardContent>
        </Card>

        {/* Technical Specifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Technical Specifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(equipment.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <span className="font-medium text-gray-600 text-sm">{key}:</span>
                  <span className="text-sm">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Purchase Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Purchase Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600 text-sm">Purchase Date:</span>
              <span className="text-sm">{new Date(equipment.purchaseInfo.date).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600 text-sm">Cost:</span>
              <span className="text-sm font-medium">${equipment.purchaseInfo.cost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600 text-sm">Supplier:</span>
              <span className="text-sm">{equipment.purchaseInfo.supplier}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600 text-sm">Warranty Expires:</span>
              <span className="text-sm">{new Date(equipment.purchaseInfo.warrantyExpiry).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Maintenance Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600 text-sm">Last Maintenance:</span>
              <span className="text-sm">{new Date(equipment.maintenanceSchedule.lastMaintenance).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600 text-sm">Next Maintenance:</span>
              <span className="text-sm font-medium text-orange-600">{new Date(equipment.maintenanceSchedule.nextMaintenance).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600 text-sm">Interval:</span>
              <span className="text-sm">{equipment.maintenanceSchedule.interval}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600 text-sm">Responsible:</span>
              <span className="text-sm">{equipment.maintenanceSchedule.responsible}</span>
            </div>
          </CardContent>
        </Card>

        {/* Usage Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Usage Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600 text-sm">Total Usage Hours:</span>
              <span className="text-sm font-medium">{equipment.usage.totalHours}h</span>
            </div>
            {equipment.usage.currentUser && (
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-600 text-sm">Current User:</span>
                <span className="text-sm">{equipment.usage.currentUser}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600 text-sm">Last Used:</span>
              <span className="text-sm">{new Date(equipment.usage.lastUsed).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-600 text-sm">Bookings This Month:</span>
              <span className="text-sm font-medium text-blue-600">{equipment.usage.bookingsThisMonth}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Safety Notes and Operating Instructions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Safety Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Safety Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {equipment.safetyNotes.map((note, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Operating Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Operating Instructions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2">
              {equipment.operatingInstructions.map((instruction, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>

      {/* Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Documentation
          </CardTitle>
          <CardDescription>
            Available documents and certificates for this equipment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a 
              href={equipment.documents.manual} 
              className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <BookOpen className="h-8 w-8 text-blue-500" />
              <div>
                <p className="font-medium text-sm">User Manual</p>
                <p className="text-xs text-gray-500">Operating instructions</p>
              </div>
            </a>

            <a 
              href={equipment.documents.warranty} 
              className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FileText className="h-8 w-8 text-green-500" />
              <div>
                <p className="font-medium text-sm">Warranty Document</p>
                <p className="text-xs text-gray-500">Coverage details</p>
              </div>
            </a>

            <a 
              href={equipment.documents.calibrationCert} 
              className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Settings className="h-8 w-8 text-purple-500" />
              <div>
                <p className="font-medium text-sm">Calibration Certificate</p>
                <p className="text-xs text-gray-500">Accuracy verification</p>
              </div>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EquipmentDetails;