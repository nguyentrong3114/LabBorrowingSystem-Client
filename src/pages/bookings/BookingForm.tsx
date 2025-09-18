import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { ArrowLeft, Save, X, Calendar, Clock, Users, MapPin } from 'lucide-react';

interface BookingFormData {
  labId: string;
  labName: string;
  bookedBy: string;
  contactEmail: string;
  contactPhone: string;
  department: string;
  date: string;
  startTime: string;
  endTime: string;
  participants: number;
  purpose: string;
  activities: string;
  equipmentNeeded: string[];
  specialRequirements: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High';
  recurring: boolean;
  recurringPattern: string;
  recurringEndDate: string;
  notes: string;
}

const BookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  
  const [formData, setFormData] = useState<BookingFormData>({
    labId: '',
    labName: '',
    bookedBy: '',
    contactEmail: '',
    contactPhone: '',
    department: '',
    date: '',
    startTime: '',
    endTime: '',
    participants: 1,
    purpose: '',
    activities: '',
    equipmentNeeded: [],
    specialRequirements: '',
    status: 'Pending',
    priority: 'Medium',
    recurring: false,
    recurringPattern: '',
    recurringEndDate: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const labs = [
    { id: '1', name: 'Lab A - Biology', capacity: 30 },
    { id: '2', name: 'Lab B - Chemistry', capacity: 25 },
    { id: '3', name: 'Lab C - Physics', capacity: 40 },
    { id: '4', name: 'Lab D - Computer Science', capacity: 20 },
    { id: '5', name: 'Lab E - Engineering', capacity: 35 }
  ];

  const availableEquipment = [
    'Microscopes', 'Computers', 'Projector', 'Whiteboard', 'Lab Benches',
    'Chemical Fume Hood', 'Centrifuge', 'Incubator', 'pH Meter', 'Balance Scale',
    'Safety Equipment', 'Glassware Set', 'Bunsen Burners', 'Measuring Tools'
  ];

  const departments = [
    'Biology', 'Chemistry', 'Physics', 'Computer Science', 'Engineering',
    'Mathematics', 'Environmental Science', 'Medical Technology', 'Research'
  ];

  // Simulate loading existing booking data for edit
  useEffect(() => {
    if (isEdit && id) {
      const mockData: BookingFormData = {
        labId: '1',
        labName: 'Lab A - Biology',
        bookedBy: 'Dr. Sarah Johnson',
        contactEmail: 'sarah.johnson@university.edu',
        contactPhone: '+1 (555) 123-4567',
        department: 'Biology',
        date: '2024-09-25',
        startTime: '09:00',
        endTime: '11:00',
        participants: 15,
        purpose: 'Undergraduate Biology Lab Session',
        activities: 'Cell culture experiments, microscopy observation, data collection',
        equipmentNeeded: ['Microscopes', 'Incubator', 'Lab Benches'],
        specialRequirements: 'Need access to sterile environment for cell culture work',
        status: 'Confirmed',
        priority: 'Medium',
        recurring: true,
        recurringPattern: 'weekly',
        recurringEndDate: '2024-12-20',
        notes: 'This is a regular weekly lab session for Bio 101 course'
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

    // Update lab name when lab ID changes
    if (field === 'labId') {
      const selectedLab = labs.find(lab => lab.id === value);
      if (selectedLab) {
        setFormData(prev => ({ ...prev, labName: selectedLab.name }));
      }
    }
  };

  const handleEquipmentChange = (equipment: string) => {
    setFormData(prev => ({
      ...prev,
      equipmentNeeded: prev.equipmentNeeded.includes(equipment)
        ? prev.equipmentNeeded.filter(e => e !== equipment)
        : [...prev.equipmentNeeded, equipment]
    }));
  };

  const calculateDuration = () => {
    if (formData.startTime && formData.endTime) {
      const start = new Date(`2000-01-01T${formData.startTime}:00`);
      const end = new Date(`2000-01-01T${formData.endTime}:00`);
      const diff = end.getTime() - start.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return hours > 0 ? `${hours}h ${minutes > 0 ? minutes + 'm' : ''}`.trim() : `${minutes}m`;
    }
    return '';
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.labId) newErrors.labId = 'Lab selection is required';
    if (!formData.bookedBy.trim()) newErrors.bookedBy = 'Booking person name is required';
    if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Contact email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Invalid email format';
    }
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.startTime) newErrors.startTime = 'Start time is required';
    if (!formData.endTime) newErrors.endTime = 'End time is required';
    if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
      newErrors.endTime = 'End time must be after start time';
    }
    if (formData.participants < 1) newErrors.participants = 'At least 1 participant is required';
    
    // Check capacity
    const selectedLab = labs.find(lab => lab.id === formData.labId);
    if (selectedLab && formData.participants > selectedLab.capacity) {
      newErrors.participants = `Exceeds lab capacity of ${selectedLab.capacity}`;
    }
    
    if (!formData.purpose.trim()) newErrors.purpose = 'Purpose is required';

    // Recurring validation
    if (formData.recurring) {
      if (!formData.recurringPattern) newErrors.recurringPattern = 'Recurring pattern is required';
      if (!formData.recurringEndDate) newErrors.recurringEndDate = 'End date for recurring booking is required';
      if (formData.date && formData.recurringEndDate && formData.recurringEndDate <= formData.date) {
        newErrors.recurringEndDate = 'End date must be after start date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Submitting booking data:', formData);
      alert(isEdit ? 'Booking updated successfully!' : 'Booking created successfully!');
      navigate('/bookings');
    } catch (error) {
      alert('Error saving booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/bookings')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Bookings
        </Button>
        <div>
          <h1 className="text-3xl font-bold">
            {isEdit ? 'Edit Booking' : 'New Lab Booking'}
          </h1>
          <p className="text-gray-600">
            {isEdit ? 'Update booking details and schedule' : 'Reserve a laboratory for your activities'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Lab Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Lab Selection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Select Lab <span className="text-red-500">*</span>
              </label>
              <select
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.labId ? 'border-red-500' : 'border-gray-300'
                }`}
                value={formData.labId}
                onChange={(e) => handleInputChange('labId', e.target.value)}
              >
                <option value="">Choose a laboratory</option>
                {labs.map((lab) => (
                  <option key={lab.id} value={lab.id}>
                    {lab.name} (Capacity: {lab.capacity})
                  </option>
                ))}
              </select>
              {errors.labId && <p className="text-red-500 text-sm mt-1">{errors.labId}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Booked By <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.bookedBy ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.bookedBy}
                  onChange={(e) => handleInputChange('bookedBy', e.target.value)}
                  placeholder="e.g., Dr. John Smith"
                />
                {errors.bookedBy && <p className="text-red-500 text-sm mt-1">{errors.bookedBy}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Department <span className="text-red-500">*</span>
                </label>
                <select
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.department ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                >
                  <option value="">Select department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
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
                  placeholder="email@university.edu"
                />
                {errors.contactEmail && <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Contact Phone</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Booking Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.date ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Start Time <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="time"
                    className={`w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.startTime ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={formData.startTime}
                    onChange={(e) => handleInputChange('startTime', e.target.value)}
                  />
                </div>
                {errors.startTime && <p className="text-red-500 text-sm mt-1">{errors.startTime}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  End Time <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="time"
                    className={`w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.endTime ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={formData.endTime}
                    onChange={(e) => handleInputChange('endTime', e.target.value)}
                  />
                </div>
                {errors.endTime && <p className="text-red-500 text-sm mt-1">{errors.endTime}</p>}
                {calculateDuration() && (
                  <p className="text-sm text-gray-600 mt-1">Duration: {calculateDuration()}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Number of Participants <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.participants ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.participants || ''}
                  onChange={(e) => handleInputChange('participants', parseInt(e.target.value) || 1)}
                />
                {errors.participants && <p className="text-red-500 text-sm mt-1">{errors.participants}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Priority</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Purpose & Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Purpose & Activities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Purpose of Booking <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.purpose ? 'border-red-500' : 'border-gray-300'
                }`}
                value={formData.purpose}
                onChange={(e) => handleInputChange('purpose', e.target.value)}
                placeholder="e.g., Biology Research Lab Session"
              />
              {errors.purpose && <p className="text-red-500 text-sm mt-1">{errors.purpose}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Activities Description</label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.activities}
                onChange={(e) => handleInputChange('activities', e.target.value)}
                placeholder="Describe what activities will take place during this booking..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Equipment Needed</label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {availableEquipment.map((equipment) => (
                  <label key={equipment} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.equipmentNeeded.includes(equipment)}
                      onChange={() => handleEquipmentChange(equipment)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">{equipment}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Special Requirements</label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.specialRequirements}
                onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                placeholder="Any special setup, equipment, or access requirements..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Recurring Booking */}
        <Card>
          <CardHeader>
            <CardTitle>Recurring Booking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="recurring"
                checked={formData.recurring}
                onChange={(e) => handleInputChange('recurring', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="recurring" className="text-sm font-medium">
                This is a recurring booking
              </label>
            </div>

            {formData.recurring && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Recurring Pattern <span className="text-red-500">*</span>
                  </label>
                  <select
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.recurringPattern ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={formData.recurringPattern}
                    onChange={(e) => handleInputChange('recurringPattern', e.target.value)}
                  >
                    <option value="">Select pattern</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                  {errors.recurringPattern && <p className="text-red-500 text-sm mt-1">{errors.recurringPattern}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    min={formData.date || new Date().toISOString().split('T')[0]}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.recurringEndDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={formData.recurringEndDate}
                    onChange={(e) => handleInputChange('recurringEndDate', e.target.value)}
                  />
                  {errors.recurringEndDate && <p className="text-red-500 text-sm mt-1">{errors.recurringEndDate}</p>}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Any additional notes or information for this booking..."
            />
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/bookings')}
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
                {isEdit ? 'Update Booking' : 'Create Booking'}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;