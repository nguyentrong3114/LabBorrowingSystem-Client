import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { ArrowLeft, Save, X, Upload, Calendar } from 'lucide-react';

interface EquipmentFormData {
  name: string;
  category: string;
  serialNumber: string;
  model: string;
  manufacturer: string;
  purchaseDate: string;
  warrantyExpiration: string;
  cost: number;
  location: string;
  assignedLab: string;
  status: 'Available' | 'In Use' | 'Maintenance' | 'Broken' | 'Retired';
  condition: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  description: string;
  specifications: string;
  maintenanceSchedule: string;
  lastMaintenance: string;
  nextMaintenance: string;
  operatingInstructions: string;
  safetyRequirements: string;
  supplier: string;
  supplierContact: string;
  image?: File;
}

const EquipmentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  
  const [formData, setFormData] = useState<EquipmentFormData>({
    name: '',
    category: '',
    serialNumber: '',
    model: '',
    manufacturer: '',
    purchaseDate: '',
    warrantyExpiration: '',
    cost: 0,
    location: '',
    assignedLab: '',
    status: 'Available',
    condition: 'Excellent',
    description: '',
    specifications: '',
    maintenanceSchedule: '',
    lastMaintenance: '',
    nextMaintenance: '',
    operatingInstructions: '',
    safetyRequirements: '',
    supplier: '',
    supplierContact: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    'Laboratory Equipment',
    'Computer',
    'Measuring Equipment',
    'Safety Equipment',
    'Furniture',
    'Electronics',
    'Glassware',
    'Chemicals',
    'Tools',
    'Other'
  ];

  const labs = ['Lab A', 'Lab B', 'Lab C', 'Lab D', 'Lab E'];

  // Simulate loading existing equipment data for edit
  useEffect(() => {
    if (isEdit && id) {
      const mockData: EquipmentFormData = {
        name: 'Microscope - Olympus BX53',
        category: 'Laboratory Equipment',
        serialNumber: 'OLY-BX53-001',
        model: 'BX53',
        manufacturer: 'Olympus',
        purchaseDate: '2023-03-15',
        warrantyExpiration: '2026-03-15',
        cost: 15000,
        location: 'Lab A, Station 3',
        assignedLab: 'Lab A',
        status: 'Available',
        condition: 'Excellent',
        description: 'High-quality research microscope with advanced optics',
        specifications: 'Magnification: 40x-1000x, LED illumination, Digital camera compatible',
        maintenanceSchedule: 'Quarterly cleaning and calibration',
        lastMaintenance: '2024-08-15',
        nextMaintenance: '2024-11-15',
        operatingInstructions: 'Handle with care, use proper lens cleaning techniques',
        safetyRequirements: 'Proper training required, handle glass components carefully',
        supplier: 'Scientific Equipment Inc.',
        supplierContact: 'support@scientificequipment.com'
      };
      setFormData(mockData);
    }
  }, [isEdit, id]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
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

    if (!formData.name.trim()) newErrors.name = 'Equipment name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.serialNumber.trim()) newErrors.serialNumber = 'Serial number is required';
    if (!formData.manufacturer.trim()) newErrors.manufacturer = 'Manufacturer is required';
    if (!formData.purchaseDate) newErrors.purchaseDate = 'Purchase date is required';
    if (formData.cost < 0) newErrors.cost = 'Cost cannot be negative';
    if (!formData.assignedLab) newErrors.assignedLab = 'Assigned lab is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Submitting equipment data:', formData);
      alert(isEdit ? 'Equipment updated successfully!' : 'Equipment created successfully!');
      navigate('/equipment');
    } catch (error) {
      alert('Error saving equipment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/equipment')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Equipment
        </Button>
        <div>
          <h1 className="text-3xl font-bold">
            {isEdit ? 'Edit Equipment' : 'Add New Equipment'}
          </h1>
          <p className="text-gray-600">
            {isEdit ? 'Update equipment information and specifications' : 'Register new equipment in the system'}
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
                  Equipment Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., Microscope - Olympus BX53"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Serial Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.serialNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.serialNumber}
                  onChange={(e) => handleInputChange('serialNumber', e.target.value)}
                  placeholder="e.g., OLY-BX53-001"
                />
                {errors.serialNumber && <p className="text-red-500 text-sm mt-1">{errors.serialNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Model</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.model}
                  onChange={(e) => handleInputChange('model', e.target.value)}
                  placeholder="e.g., BX53"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Manufacturer <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.manufacturer ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.manufacturer}
                  onChange={(e) => handleInputChange('manufacturer', e.target.value)}
                  placeholder="e.g., Olympus"
                />
                {errors.manufacturer && <p className="text-red-500 text-sm mt-1">{errors.manufacturer}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Cost ($)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.cost ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.cost || ''}
                  onChange={(e) => handleInputChange('cost', parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                />
                {errors.cost && <p className="text-red-500 text-sm mt-1">{errors.cost}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Brief description of the equipment..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Location & Status */}
        <Card>
          <CardHeader>
            <CardTitle>Location & Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Assigned Lab <span className="text-red-500">*</span>
                </label>
                <select
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.assignedLab ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.assignedLab}
                  onChange={(e) => handleInputChange('assignedLab', e.target.value)}
                >
                  <option value="">Select lab</option>
                  {labs.map((lab) => (
                    <option key={lab} value={lab}>
                      {lab}
                    </option>
                  ))}
                </select>
                {errors.assignedLab && <p className="text-red-500 text-sm mt-1">{errors.assignedLab}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Specific Location</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="e.g., Station 3, Shelf B"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                >
                  <option value="Available">Available</option>
                  <option value="In Use">In Use</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Broken">Broken</option>
                  <option value="Retired">Retired</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Condition</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.condition}
                  onChange={(e) => handleInputChange('condition', e.target.value)}
                >
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Purchase & Warranty */}
        <Card>
          <CardHeader>
            <CardTitle>Purchase & Warranty Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Purchase Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="date"
                    className={`w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.purchaseDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={formData.purchaseDate}
                    onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
                  />
                </div>
                {errors.purchaseDate && <p className="text-red-500 text-sm mt-1">{errors.purchaseDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Warranty Expiration</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="date"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.warrantyExpiration}
                    onChange={(e) => handleInputChange('warrantyExpiration', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Supplier</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.supplier}
                  onChange={(e) => handleInputChange('supplier', e.target.value)}
                  placeholder="e.g., Scientific Equipment Inc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Supplier Contact</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.supplierContact}
                  onChange={(e) => handleInputChange('supplierContact', e.target.value)}
                  placeholder="Email or phone number"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Specifications */}
        <Card>
          <CardHeader>
            <CardTitle>Technical Specifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Specifications</label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.specifications}
                onChange={(e) => handleInputChange('specifications', e.target.value)}
                placeholder="Technical specifications and features..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Operating Instructions</label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.operatingInstructions}
                onChange={(e) => handleInputChange('operatingInstructions', e.target.value)}
                placeholder="How to operate this equipment..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Safety Requirements</label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.safetyRequirements}
                onChange={(e) => handleInputChange('safetyRequirements', e.target.value)}
                placeholder="Safety precautions and requirements..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Maintenance */}
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Maintenance Schedule</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.maintenanceSchedule}
                onChange={(e) => handleInputChange('maintenanceSchedule', e.target.value)}
                placeholder="e.g., Monthly calibration, Annual service"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Last Maintenance</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.lastMaintenance}
                  onChange={(e) => handleInputChange('lastMaintenance', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Next Maintenance</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.nextMaintenance}
                  onChange={(e) => handleInputChange('nextMaintenance', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Image Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Equipment Image</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-gray-900">
                      Upload equipment image
                    </span>
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                <p className="mt-2 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                {formData.image && (
                  <p className="mt-2 text-sm text-green-600">
                    Selected: {formData.image.name}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/equipment')}
            disabled={isLoading}
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="min-w-[140px]"
          >
            {isLoading ? (
              'Saving...'
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {isEdit ? 'Update Equipment' : 'Create Equipment'}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EquipmentForm;