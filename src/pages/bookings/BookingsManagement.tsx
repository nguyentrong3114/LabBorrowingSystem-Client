import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Plus, Calendar, Clock, User, MapPin, Filter, Search } from 'lucide-react';

interface Booking {
  id: number;
  labName: string;
  bookedBy: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
  purpose: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed';
  participants: number;
}

const BookingsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterDate, setFilterDate] = useState('All');

  // Sample booking data
  const [bookings] = useState<Booking[]>([
    {
      id: 1,
      labName: 'Lab A',
      bookedBy: 'Dr. Sarah Johnson',
      date: '2024-09-20',
      startTime: '09:00',
      endTime: '11:00',
      duration: '2 hours',
      purpose: 'Biology Research - Cell Culture',
      status: 'Confirmed',
      participants: 5
    },
    {
      id: 2,
      labName: 'Lab B',
      bookedBy: 'Prof. Michael Chen',
      date: '2024-09-20',
      startTime: '14:00',
      endTime: '16:30',
      duration: '2.5 hours',
      purpose: 'Chemistry Experiment - Synthesis',
      status: 'Confirmed',
      participants: 8
    },
    {
      id: 3,
      labName: 'Lab C',
      bookedBy: 'Dr. Emily Davis',
      date: '2024-09-21',
      startTime: '10:00',
      endTime: '12:00',
      duration: '2 hours',
      purpose: 'Physics Lab - Optics Experiment',
      status: 'Pending',
      participants: 12
    },
    {
      id: 4,
      labName: 'Lab A',
      bookedBy: 'Dr. Robert Wilson',
      date: '2024-09-22',
      startTime: '13:00',
      endTime: '17:00',
      duration: '4 hours',
      purpose: 'Advanced Research - Microscopy',
      status: 'Confirmed',
      participants: 3
    },
    {
      id: 5,
      labName: 'Lab D',
      bookedBy: 'Prof. Lisa Anderson',
      date: '2024-09-18',
      startTime: '09:00',
      endTime: '11:00',
      duration: '2 hours',
      purpose: 'Student Training Session',
      status: 'Completed',
      participants: 15
    },
    {
      id: 6,
      labName: 'Lab B',
      bookedBy: 'Dr. James Martinez',
      date: '2024-09-19',
      startTime: '15:00',
      endTime: '16:00',
      duration: '1 hour',
      purpose: 'Equipment Testing',
      status: 'Cancelled',
      participants: 2
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.labName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.bookedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || booking.status === filterStatus;
    const today = new Date().toISOString().split('T')[0];
    const matchesDate = filterDate === 'All' || 
                       (filterDate === 'Today' && booking.date === today) ||
                       (filterDate === 'Upcoming' && booking.date > today) ||
                       (filterDate === 'Past' && booking.date < today);
    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Bookings Management</h1>
          <p className="text-gray-600">Manage laboratory reservations and scheduling</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Booking
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-green-600">12</CardTitle>
            <CardDescription>Active Bookings</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-yellow-600">3</CardTitle>
            <CardDescription>Pending Approval</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-blue-600">28</CardTitle>
            <CardDescription>Completed This Month</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-purple-600">85%</CardTitle>
            <CardDescription>Utilization Rate</CardDescription>
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
                placeholder="Search bookings..."
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
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              >
                <option value="All">All Dates</option>
                <option value="Today">Today</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Past">Past</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings List */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Schedule</CardTitle>
          <CardDescription>
            Showing {filteredBookings.length} booking(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="font-semibold text-blue-600">{booking.labName}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{booking.bookedBy}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(booking.date).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{booking.startTime} - {booking.endTime} ({booking.duration})</span>
                        </div>
                        <div>
                          <span className="font-medium">Participants:</span> {booking.participants}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <span className="font-medium text-sm">Purpose:</span>
                      <p className="text-sm text-gray-600 mt-1">{booking.purpose}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Link to={`/bookings/${booking.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                    {booking.status === 'Pending' && (
                      <>
                        <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50">
                          Approve
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                          Decline
                        </Button>
                      </>
                    )}
                    {booking.status === 'Confirmed' && (
                      <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {filteredBookings.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No bookings found matching your criteria.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingsManagement;