import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { ArrowLeft, Save, X } from 'lucide-react';

interface LabFormData {
  name: string;
  location: string;
  building: string;
  floor: string;
  room: string;
  capacity: number;
  status: 'Available' | 'In Use' | 'Under Maintenance';
  description: string;
  equipment: string[];
  supervisor: string;
  contactEmail: string;
  operatingHours: {
    start: string;
    end: string;
  };
  specialInstructions: string;
}

const LabForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  
  const [formData, setFormData] = useState<LabFormData>({
    name: '',
    location: '',
    building: '',
    floor: '',
    room: '',
    capacity: 0,
    status: 'Available',
    description: '',
    equipment: [],
    supervisor: '',
    contactEmail: '',
    operatingHours: {
      start: '08:00',
      end: '18:00'
    },
    specialInstructions: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading existing lab data for edit
  useEffect(() => {
    if (isEdit && id) {
      // In a real app, this would fetch data from API
      const mockData: LabFormData = {
        name: 'Lab A',
        location: 'Building 1, Floor 2',
        building: 'Science Building',
        floor: '2',
        room: '201',
        capacity: 30,
        status: 'Available',
        description: 'Advanced biology laboratory with modern equipment for research and teaching.',
        equipment: ['Microscopes', 'Centrifuge', 'Incubator', 'pH Meter'],
        supervisor: 'Dr. Sarah Johnson',
        contactEmail: 'sarah.johnson@university.edu',
        operatingHours: {
          start: '08:00',
          end: '18:00'
        },
        specialInstructions: 'Proper safety equipment required at all times. No food or drinks allowed.'
      };
      setFormData(mockData);
    }
  }, [isEdit, id]);

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof LabFormData] as any,
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Lab name is required';
    if (!formData.building.trim()) newErrors.building = 'Building is required';
    if (!formData.floor.trim()) newErrors.floor = 'Floor is required';
    if (!formData.room.trim()) newErrors.room = 'Room number is required';
    if (formData.capacity <= 0) newErrors.capacity = 'Capacity must be greater than 0';
    if (!formData.supervisor.trim()) newErrors.supervisor = 'Supervisor is required';
    if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Contact email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // In a real app, this would make API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Submitting lab data:', formData);
      alert(isEdit ? 'Lab updated successfully!' : 'Lab created successfully!');
      navigate('/labs');
    } catch (error) {
      alert('Error saving lab. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEquipmentChange = (equipment: string) => {
    setFormData(prev => ({
      ...prev,
      equipment: prev.equipment.includes(equipment)
        ? prev.equipment.filter(e => e !== equipment)
        : [...prev.equipment, equipment]
    }));
  };

  const availableEquipment = [
    'Microscopes', 'Centrifuge', 'Incubator', 'pH Meter', 'Autoclave', 
    'Spectrophotometer', 'PCR Machine', 'Electrophoresis Equipment',
    'Chemical Fume Hood', 'Safety Shower', 'Eye Wash Station'
  ];

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/labs')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Labs
        </Button>
        <div>
          <h1 className="text-3xl font-bold">
            {isEdit ? 'Edit Lab' : 'Add New Lab'}
          </h1>
          <p className="text-gray-600">
            {isEdit ? 'Update lab information and settings' : 'Create a new laboratory facility'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Lab Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., Biology Lab A"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                >
                  <option value="Available">Available</option>
                  <option value="In Use">In Use</option>
                  <option value="Under Maintenance">Under Maintenance</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Brief description of the laboratory..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Location Details */}
        <Card>
          <CardHeader>
            <CardTitle>Location Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Building <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.building ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.building}
                  onChange={(e) => handleInputChange('building', e.target.value)}
                  placeholder="e.g., Science Building"
                />
                {errors.building && <p className="text-red-500 text-sm mt-1">{errors.building}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Floor <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.floor ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.floor}
                  onChange={(e) => handleInputChange('floor', e.target.value)}
                  placeholder="e.g., 2"
                />
                {errors.floor && <p className="text-red-500 text-sm mt-1">{errors.floor}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Room Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.room ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.room}
                  onChange={(e) => handleInputChange('room', e.target.value)}
                  placeholder="e.g., 201"
                />
                {errors.room && <p className="text-red-500 text-sm mt-1">{errors.room}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Capacity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.capacity ? 'border-red-500' : 'border-gray-300'
                }`}
                value={formData.capacity || ''}
                onChange={(e) => handleInputChange('capacity', parseInt(e.target.value) || 0)}
                placeholder="Maximum number of people"
              />
              {errors.capacity && <p className="text-red-500 text-sm mt-1">{errors.capacity}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Supervisor <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.supervisor ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.supervisor}
                  onChange={(e) => handleInputChange('supervisor', e.target.value)}
                  placeholder="e.g., Dr. John Smith"
                />
                {errors.supervisor && <p className="text-red-500 text-sm mt-1">{errors.supervisor}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Contact Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.contactEmail ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  placeholder="supervisor@university.edu"
                />
                {errors.contactEmail && <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Opening Time</label>
                <input
                  type="time"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.operatingHours.start}
                  onChange={(e) => handleInputChange('operatingHours.start', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Closing Time</label>
                <input
                  type="time"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.operatingHours.end}
                  onChange={(e) => handleInputChange('operatingHours.end', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Equipment */}
        <Card>
          <CardHeader>
            <CardTitle>Available Equipment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {availableEquipment.map((equipment) => (
                <label key={equipment} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.equipment.includes(equipment)}
                    onChange={() => handleEquipmentChange(equipment)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">{equipment}</span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Special Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Special Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.specialInstructions}
              onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
              placeholder="Any special instructions or requirements for using this lab..."
            />
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/labs')}
            disabled={isLoading}
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="min-w-[120px]"
          >
            {isLoading ? (
              'Saving...'
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {isEdit ? 'Update Lab' : 'Create Lab'}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LabForm;