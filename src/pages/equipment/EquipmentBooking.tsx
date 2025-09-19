import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { 
  ArrowLeft, Calendar, Clock, User, AlertTriangle, CheckCircle,
  Plus, Edit, Trash2, MapPin, FileText 
} from 'lucide-react';

interface EquipmentBooking {
  id: string;
  equipmentId: string;
  equipmentName: string;
  userId: string;
  userName: string;
  userEmail: string;
  department: string;
  startTime: string;
  endTime: string;
  duration: number;
  purpose: string;
  status: 'Pending' | 'Approved' | 'Active' | 'Completed' | 'Cancelled';
  notes: string;
  createdAt: string;
  approvedBy?: string;
}

interface BookingFormData {
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
  notes: string;
  recurring: boolean;
  recurringPattern?: 'daily' | 'weekly' | 'monthly';
  recurringEnd?: string;
}

const EquipmentBooking = () => {
  const { id } = useParams();
  const [bookings, setBookings] = useState<EquipmentBooking[]>([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    date: '',
    startTime: '',
    endTime: '',
    purpose: '',
    notes: '',
    recurring: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showBookingForm) {
        setShowBookingForm(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [showBookingForm]);

  // Clear errors when opening modal
  const openBookingForm = () => {
    setErrors({});
    setFormData({
      date: '',
      startTime: '',
      endTime: '',
      purpose: '',
      notes: '',
      recurring: false
    });
    setShowBookingForm(true);
  };

  useEffect(() => {
    // Mock data for equipment bookings
    const mockBookings: EquipmentBooking[] = [
      {
        id: '1',
        equipmentId: id || '1',
        equipmentName: 'Digital Microscope Set A',
        userId: '1',
        userName: 'Dr. Sarah Johnson',
        userEmail: 'sarah.johnson@university.edu',
        department: 'Biology',
        startTime: '2024-09-20T09:00:00',
        endTime: '2024-09-20T11:00:00',
        duration: 2,
        purpose: 'Cell biology research - examining plant cell structures',
        status: 'Approved',
        notes: 'Need to use 40x and 100x objectives',
        createdAt: '2024-09-18T14:30:00',
        approvedBy: 'Dr. Michael Chen'
      },
      {
        id: '2',
        equipmentId: id || '1',
        equipmentName: 'Digital Microscope Set A',
        userId: '2',
        userName: 'Emily Davis',
        userEmail: 'emily.davis@student.university.edu',
        department: 'Chemistry',
        startTime: '2024-09-20T14:00:00',
        endTime: '2024-09-20T16:30:00',
        duration: 2.5,
        purpose: 'Undergraduate lab session - crystal structure analysis',
        status: 'Approved',
        notes: 'Part of CHEM 301 coursework',
        createdAt: '2024-09-17T10:15:00',
        approvedBy: 'Dr. Michael Chen'
      },
      {
        id: '3',
        equipmentId: id || '1',
        equipmentName: 'Digital Microscope Set A',
        userId: '3',
        userName: 'Robert Wilson',
        userEmail: 'robert.wilson@student.university.edu',
        department: 'Physics',
        startTime: '2024-09-21T10:00:00',
        endTime: '2024-09-21T12:00:00',
        duration: 2,
        purpose: 'Material science project - surface analysis',
        status: 'Pending',
        notes: 'Need high magnification for surface defects',
        createdAt: '2024-09-19T16:45:00'
      },
      {
        id: '4',
        equipmentId: id || '1',
        equipmentName: 'Digital Microscope Set A',
        userId: '1',
        userName: 'Dr. Sarah Johnson',
        userEmail: 'sarah.johnson@university.edu',
        department: 'Biology',
        startTime: '2024-09-19T13:00:00',
        endTime: '2024-09-19T15:30:00',
        duration: 2.5,
        purpose: 'Research completed - tissue sample analysis',
        status: 'Completed',
        notes: 'Excellent image quality achieved',
        createdAt: '2024-09-15T09:20:00',
        approvedBy: 'Dr. Michael Chen'
      }
    ];

    setTimeout(() => {
      setBookings(mockBookings);
      setLoading(false);
    }, 500);
  }, [id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Active': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <CheckCircle className="h-4 w-4" />;
      case 'Pending': return <Clock className="h-4 w-4" />;
      case 'Active': return <Clock className="h-4 w-4" />;
      case 'Completed': return <CheckCircle className="h-4 w-4" />;
      case 'Cancelled': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.startTime) newErrors.startTime = 'Start time is required';
    if (!formData.endTime) newErrors.endTime = 'End time is required';
    if (!formData.purpose.trim()) newErrors.purpose = 'Purpose is required';

    if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
      newErrors.endTime = 'End time must be after start time';
    }

    if (formData.recurring && !formData.recurringEnd) {
      newErrors.recurringEnd = 'End date is required for recurring bookings';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Here you would typically send the booking request to your API
    console.log('Booking request:', formData);
    setShowBookingForm(false);
    // Reset form
    setFormData({
      date: '',
      startTime: '',
      endTime: '',
      purpose: '',
      notes: '',
      recurring: false
    });
  };

  const upcomingBookings = bookings.filter(booking => {
    const startTime = new Date(booking.startTime);
    const now = new Date();
    return startTime > now && (booking.status === 'Approved' || booking.status === 'Pending');
  });

  const pastBookings = bookings.filter(booking => {
    const endTime = new Date(booking.endTime);
    const now = new Date();
    return endTime <= now || booking.status === 'Completed';
  });

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Loading bookings...</div>
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
            <h1 className="text-3xl font-bold">Equipment Booking</h1>
            <p className="text-gray-600">Digital Microscope Set A - Reservation Management</p>
          </div>
        </div>
        <Button onClick={openBookingForm}>
          <Plus className="h-4 w-4 mr-2" />
          New Booking
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-600">{upcomingBookings.length}</p>
                <p className="text-sm text-gray-600">Upcoming</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-yellow-600">
                  {bookings.filter(b => b.status === 'Pending').length}
                </p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {bookings.filter(b => b.status === 'Completed').length}
                </p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-purple-600">
                  {bookings.reduce((sum, booking) => sum + booking.duration, 0)}h
                </p>
                <p className="text-sm text-gray-600">Total Hours</p>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            // Close modal when clicking on backdrop
            if (e.target === e.currentTarget) {
              setShowBookingForm(false);
            }
          }}
        >
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            {/* Close button */}
            <button
              onClick={() => setShowBookingForm(false)}
              className="absolute right-4 top-4 z-10 text-gray-500 hover:text-gray-700 transition-colors"
              type="button"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <CardHeader>
              <CardTitle>New Equipment Booking</CardTitle>
              <CardDescription>Reserve the Digital Microscope Set A</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Date *</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.date}
                      onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                      min={new Date().toISOString().split('T')[0]}
                    />
                    {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Purpose *</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.purpose}
                      onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
                      placeholder="Research, coursework, etc."
                    />
                    {errors.purpose && <p className="text-red-500 text-xs mt-1">{errors.purpose}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Start Time *</label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.startTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                    />
                    {errors.startTime && <p className="text-red-500 text-xs mt-1">{errors.startTime}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">End Time *</label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.endTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                    />
                    {errors.endTime && <p className="text-red-500 text-xs mt-1">{errors.endTime}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Additional Notes</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Any special requirements or notes..."
                  />
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.recurring}
                      onChange={(e) => setFormData(prev => ({ ...prev, recurring: e.target.checked }))}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm">Recurring booking</span>
                  </label>

                  {formData.recurring && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Pattern</label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={formData.recurringPattern}
                          onChange={(e) => setFormData(prev => ({ ...prev, recurringPattern: e.target.value as any }))}
                        >
                          <option value="">Select pattern</option>
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">End Date</label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={formData.recurringEnd}
                          onChange={(e) => setFormData(prev => ({ ...prev, recurringEnd: e.target.value }))}
                          min={formData.date}
                        />
                        {errors.recurringEnd && <p className="text-red-500 text-xs mt-1">{errors.recurringEnd}</p>}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowBookingForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    Submit Booking Request
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Upcoming Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Bookings</CardTitle>
          <CardDescription>Scheduled equipment reservations</CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingBookings.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>No upcoming bookings</p>
              <Button className="mt-4" onClick={openBookingForm}>
                <Plus className="h-4 w-4 mr-2" />
                Create First Booking
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div key={booking.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{booking.purpose}</h3>
                        <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          {booking.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(booking.startTime).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>
                            {new Date(booking.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - 
                            {new Date(booking.endTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{booking.userName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{booking.department}</span>
                        </div>
                      </div>
                      
                      {booking.notes && (
                        <p className="text-sm text-gray-700 mt-2">
                          <FileText className="h-4 w-4 inline mr-1" />
                          {booking.notes}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      {booking.status === 'Pending' && (
                        <>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      {booking.status === 'Approved' && (
                        <Button size="sm">
                          Start Session
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Booking History */}
      <Card>
        <CardHeader>
          <CardTitle>Booking History</CardTitle>
          <CardDescription>Past equipment reservations</CardDescription>
        </CardHeader>
        <CardContent>
          {pastBookings.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>No booking history</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pastBookings.map((booking) => (
                <div key={booking.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{booking.purpose}</h3>
                        <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          {booking.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(booking.startTime).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{booking.duration}h duration</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{booking.userName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{booking.department}</span>
                        </div>
                      </div>
                      
                      {booking.notes && (
                        <p className="text-sm text-gray-700 mt-2">
                          <FileText className="h-4 w-4 inline mr-1" />
                          {booking.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EquipmentBooking;