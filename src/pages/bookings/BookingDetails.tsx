import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Users, 
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
  Trash2,
  MessageSquare,
  Phone,
  Mail,
  Building,
  Activity,
  Settings,
  History,
  Download
} from 'lucide-react';

interface BookingDetails {
  id: number;
  labName: string;
  labLocation: string;
  labCapacity: number;
  bookedBy: {
    name: string;
    email: string;
    phone: string;
    department: string;
    role: string;
  };
  bookingDate: string;
  startTime: string;
  endTime: string;
  duration: string;
  purpose: string;
  description: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed' | 'In Progress';
  participants: number;
  equipmentRequested: string[];
  specialRequirements: string;
  createdAt: string;
  approvedBy?: string;
  approvedAt?: string;
  rejectedReason?: string;
  notes: string;
  attachments: string[];
  checkInTime?: string;
  checkOutTime?: string;
  actualParticipants?: number;
  equipmentUsed: string[];
  labConditionBefore: 'Excellent' | 'Good' | 'Fair' | 'Needs Cleaning';
  labConditionAfter?: 'Excellent' | 'Good' | 'Fair' | 'Needs Cleaning' | 'Damaged';
  additionalCharges?: number;
  recurringPattern?: string;
}

interface ActivityLog {
  id: number;
  action: string;
  performedBy: string;
  timestamp: string;
  details: string;
}

const BookingDetails = () => {
  const [activeTab, setActiveTab] = useState<'details' | 'activity' | 'documents'>('details');
  
  // Sample booking details data
  const [bookingDetails] = useState<BookingDetails>({
    id: 1,
    labName: 'Lab A - Advanced Biology Research',
    labLocation: 'Building C, Floor 2, Room 201',
    labCapacity: 20,
    bookedBy: {
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@university.edu',
      phone: '+1 (555) 123-4567',
      department: 'Biology Department',
      role: 'Faculty'
    },
    bookingDate: '2024-09-20',
    startTime: '09:00',
    endTime: '11:00',
    duration: '2 hours',
    purpose: 'Biology Research - Cell Culture',
    description: 'Advanced cell culture research for cancer treatment study. This session will involve microscopy work, cell preparation, and analysis using specialized equipment.',
    status: 'Confirmed',
    participants: 5,
    equipmentRequested: [
      'Microscope - Olympus CX23',
      'Centrifuge - Eppendorf 5424',
      'Incubator - Thermo Fisher',
      'Digital Scale - Mettler Toledo'
    ],
    specialRequirements: 'Temperature controlled environment (18-22°C), sterile conditions required, biohazard safety protocols must be followed.',
    createdAt: '2024-09-15 14:30',
    approvedBy: 'Dr. Michael Chen',
    approvedAt: '2024-09-16 09:15',
    notes: 'All safety protocols must be strictly followed. Lab assistant will be available for equipment setup.',
    attachments: [
      'Research_Protocol.pdf',
      'Safety_Checklist.pdf',
      'Equipment_Manual.pdf'
    ],
    checkInTime: '2024-09-20 08:55',
    actualParticipants: 4,
    equipmentUsed: [
      'Microscope - Olympus CX23',
      'Centrifuge - Eppendorf 5424',
      'Incubator - Thermo Fisher'
    ],
    labConditionBefore: 'Good',
    labConditionAfter: 'Good',
    additionalCharges: 0,
    recurringPattern: 'Weekly for 8 weeks'
  });

  // Sample activity log
  const [activityLog] = useState<ActivityLog[]>([
    {
      id: 1,
      action: 'Booking Created',
      performedBy: 'Dr. Sarah Johnson',
      timestamp: '2024-09-15 14:30',
      details: 'Initial booking request submitted for Lab A'
    },
    {
      id: 2,
      action: 'Booking Approved',
      performedBy: 'Dr. Michael Chen',
      timestamp: '2024-09-16 09:15',
      details: 'Booking approved by lab manager'
    },
    {
      id: 3,
      action: 'Equipment Reserved',
      performedBy: 'System',
      timestamp: '2024-09-16 09:16',
      details: 'Required equipment automatically reserved'
    },
    {
      id: 4,
      action: 'Reminder Sent',
      performedBy: 'System',
      timestamp: '2024-09-19 16:00',
      details: 'Booking reminder email sent to Dr. Sarah Johnson'
    },
    {
      id: 5,
      action: 'Check-in',
      performedBy: 'Dr. Sarah Johnson',
      timestamp: '2024-09-20 08:55',
      details: 'Checked in 5 minutes early. Lab condition recorded as Good.'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Confirmed': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'Pending': return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'Cancelled': return <XCircle className="h-5 w-5 text-red-600" />;
      case 'Completed': return <CheckCircle className="h-5 w-5 text-blue-600" />;
      case 'In Progress': return <Activity className="h-5 w-5 text-purple-600" />;
      default: return <AlertCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/bookings">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Bookings
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Booking Details</h1>
            <p className="text-gray-600">Booking ID: #{bookingDetails.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit Booking
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Status Card */}
      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getStatusIcon(bookingDetails.status)}
              <div>
                <h2 className="text-xl font-semibold">{bookingDetails.labName}</h2>
                <p className="text-gray-600">{bookingDetails.purpose}</p>
              </div>
            </div>
            <div className="text-right">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(bookingDetails.status)}`}>
                {bookingDetails.status}
              </span>
              <p className="text-sm text-gray-600 mt-1">
                {bookingDetails.bookingDate} • {bookingDetails.startTime} - {bookingDetails.endTime}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-blue-600">{bookingDetails.duration}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Duration
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-green-600">{bookingDetails.actualParticipants || bookingDetails.participants}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              Participants
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-purple-600">{bookingDetails.equipmentUsed.length}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              Equipment Used
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-orange-600">${bookingDetails.additionalCharges || 0}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <Activity className="h-4 w-4" />
              Additional Charges
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b">
        <nav className="flex space-x-8">
          {[
            { key: 'details', label: 'Booking Details', icon: FileText },
            { key: 'activity', label: 'Activity Log', icon: History },
            { key: 'documents', label: 'Documents', icon: Download }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'details' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Booking Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Booking Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Lab Name</label>
                  <p className="font-medium">{bookingDetails.labName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Location</label>
                  <p className="text-gray-900">{bookingDetails.labLocation}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Date</label>
                  <p className="font-medium">{bookingDetails.bookingDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Time Slot</label>
                  <p className="font-medium">{bookingDetails.startTime} - {bookingDetails.endTime}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Purpose</label>
                <p className="font-medium">{bookingDetails.purpose}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Description</label>
                <p className="text-gray-700">{bookingDetails.description}</p>
              </div>

              {bookingDetails.recurringPattern && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Recurring Pattern</label>
                  <p className="text-gray-700">{bookingDetails.recurringPattern}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Booking Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Booked By</label>
                <p className="font-medium text-lg">{bookingDetails.bookedBy.name}</p>
                <p className="text-sm text-gray-600">{bookingDetails.bookedBy.role}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail className="h-4 w-4" />
                  {bookingDetails.bookedBy.email}
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone className="h-4 w-4" />
                  {bookingDetails.bookedBy.phone}
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Building className="h-4 w-4" />
                  {bookingDetails.bookedBy.department}
                </div>
              </div>

              <div className="pt-4">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Equipment & Requirements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Equipment & Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Equipment Requested</label>
                <div className="mt-2 space-y-1">
                  {bookingDetails.equipmentRequested.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Equipment Actually Used</label>
                <div className="mt-2 space-y-1">
                  {bookingDetails.equipmentUsed.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Special Requirements</label>
                <p className="text-gray-700 text-sm">{bookingDetails.specialRequirements}</p>
              </div>
            </CardContent>
          </Card>

          {/* Status & Approval */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Status & Approval
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Current Status</label>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(bookingDetails.status)}`}>
                    {bookingDetails.status}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Participants</label>
                  <p className="font-medium">{bookingDetails.actualParticipants || bookingDetails.participants} / {bookingDetails.labCapacity}</p>
                </div>
              </div>

              {bookingDetails.approvedBy && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Approved By</label>
                  <p className="font-medium">{bookingDetails.approvedBy}</p>
                  <p className="text-sm text-gray-600">on {bookingDetails.approvedAt}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Lab Condition (Before)</label>
                  <p className="font-medium">{bookingDetails.labConditionBefore}</p>
                </div>
                {bookingDetails.labConditionAfter && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Lab Condition (After)</label>
                    <p className="font-medium">{bookingDetails.labConditionAfter}</p>
                  </div>
                )}
              </div>

              {bookingDetails.checkInTime && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Check-in Time</label>
                    <p className="font-medium">{bookingDetails.checkInTime}</p>
                  </div>
                  {bookingDetails.checkOutTime && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Check-out Time</label>
                      <p className="font-medium">{bookingDetails.checkOutTime}</p>
                    </div>
                  )}
                </div>
              )}

              {bookingDetails.notes && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Notes</label>
                  <p className="text-gray-700 text-sm">{bookingDetails.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'activity' && (
        <Card>
          <CardHeader>
            <CardTitle>Activity Log</CardTitle>
            <CardDescription>Complete history of actions performed on this booking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activityLog.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0">
                    <Activity className="h-5 w-5 text-blue-500 mt-0.5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{activity.action}</h4>
                      <span className="text-sm text-gray-500">{activity.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                    <p className="text-xs text-gray-500 mt-1">by {activity.performedBy}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'documents' && (
        <Card>
          <CardHeader>
            <CardTitle>Documents & Attachments</CardTitle>
            <CardDescription>Files associated with this booking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {bookingDetails.attachments.map((filename, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Download className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">{filename}</p>
                      <p className="text-sm text-gray-500">Uploaded on {bookingDetails.createdAt}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {bookingDetails.attachments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Download className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No documents attached to this booking</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookingDetails;