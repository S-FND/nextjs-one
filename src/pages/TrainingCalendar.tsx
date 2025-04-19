
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/dashboards/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { GraduationCap, Calendar as CalendarIcon, Users, MapPin, Clock, Filter, ChevronLeft, ChevronRight, Plus, Building, User } from 'lucide-react';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

// Mock training events data
const MOCK_TRAINING_EVENTS = [
  {
    id: '1',
    title: 'Workplace Safety Fundamentals',
    clientId: 'client-123',
    clientName: 'Acme Corporation',
    startDate: new Date(2025, 4, 5),
    endDate: new Date(2025, 4, 6),
    location: 'New York Office',
    format: 'In-Person',
    status: 'scheduled',
    attendees: 15,
    trainerName: 'Sarah Johnson',
    employeesList: ['John Doe', 'Jane Smith', 'Robert Brown']
  },
  {
    id: '2',
    title: 'Environmental Compliance',
    clientId: 'client-456',
    clientName: 'Tech Solutions Inc.',
    startDate: new Date(2025, 4, 12),
    endDate: new Date(2025, 4, 12),
    location: 'Online',
    format: 'Online',
    status: 'scheduled',
    attendees: 30,
    trainerName: 'Michael Wong',
    employeesList: ['Alice Cooper', 'Bob Dylan', 'Charlie Parker']
  },
  {
    id: '3',
    title: 'Health Risk Management',
    clientId: 'client-789',
    clientName: 'Global Industries',
    startDate: new Date(2025, 4, 18),
    endDate: new Date(2025, 4, 20),
    location: 'Chicago Conference Center',
    format: 'In-Person',
    status: 'scheduled',
    attendees: 25,
    trainerName: 'Jennifer Lee',
    employeesList: ['David Miller', 'Emily Watson', 'Frank Sinatra']
  },
  {
    id: '4',
    title: 'ISO 14001 Implementation',
    clientId: 'client-101',
    clientName: 'Green Solutions',
    startDate: new Date(2025, 4, 25),
    endDate: new Date(2025, 4, 28),
    location: 'Miami Office',
    format: 'Hybrid',
    status: 'pending-vendor',
    attendees: 10,
    trainerName: 'Unassigned',
    employeesList: ['George Washington', 'Hillary Clinton', 'Ivanka Trump']
  },
];

const TrainingCalendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<'month' | 'week' | 'list'>('month');
  const [filter, setFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  
  // Mock user data - in a real app, this would come from authentication
  const userData = {
    name: "John Smith",
    userType: "admin", // or "enterprise"
    avatar: undefined,
  };

  const isVendor = userData.userType === 'vendor';

  // Filter events based on the user type and selected filter
  const filteredEvents = MOCK_TRAINING_EVENTS.filter(event => {
    if (isVendor) {
      // Vendors should only see unassigned trainings or ones assigned to them
      if (filter === 'assigned') {
        return event.trainerName === userData.name;
      }
      if (filter === 'unassigned') {
        return event.status === 'pending-vendor';
      }
      // For 'all', vendors see both assigned and unassigned
      return event.status === 'pending-vendor' || event.trainerName === userData.name;
    }
    
    // Admin or Enterprise users see all events, with potential filtering
    if (filter !== 'all') {
      return event.status === filter;
    }
    return true;
  });

  const getMonthEvents = () => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    const days = eachDayOfInterval({ start, end });
    
    return days.map(day => {
      const dayEvents = filteredEvents.filter(event => {
        const eventStart = new Date(event.startDate);
        const eventEnd = new Date(event.endDate);
        return day >= eventStart && day <= eventEnd;
      });
      
      return {
        date: day,
        events: dayEvents,
      };
    });
  };
  
  const monthData = getMonthEvents();

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
  };

  const closeEventDetails = () => {
    setSelectedEvent(null);
  };

  return (
    <DashboardLayout 
      userType={userData.userType as any}
      userName={userData.name}
      userAvatar={userData.avatar}
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <CalendarIcon className="h-8 w-8" />
            Training Calendar
          </h2>
          <p className="text-muted-foreground">
            {isVendor 
              ? "View and manage your training schedule and opportunities"
              : "Schedule and track all EHS training sessions"
            }
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setDate(new Date())}>
              Today
            </Button>
            <Button variant="outline" size="icon" onClick={() => setDate(prev => new Date(prev.setMonth(prev.getMonth() - 1)))}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setDate(prev => new Date(prev.setMonth(prev.getMonth() + 1)))}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <h3 className="text-xl font-semibold">
              {format(date, 'MMMM yyyy')}
            </h3>
          </div>

          <div className="flex items-center gap-4">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter trainings" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Trainings</SelectItem>
                {isVendor ? (
                  <>
                    <SelectItem value="assigned">Assigned to Me</SelectItem>
                    <SelectItem value="unassigned">Available Opportunities</SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending-vendor">Pending Vendor</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>

            <Tabs value={view} onValueChange={(v) => setView(v as any)} className="w-[400px]">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
            </Tabs>

            {!isVendor && (
              <Dialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Schedule Training
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>Schedule New Training</DialogTitle>
                    <DialogDescription>
                      Choose a training course and set up the schedule.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="training" className="text-right">
                        Training
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select a training course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ws-safety">Workplace Safety Fundamentals</SelectItem>
                          <SelectItem value="env-compliance">Environmental Compliance</SelectItem>
                          <SelectItem value="health-risk">Health Risk Management</SelectItem>
                          <SelectItem value="iso-14001">ISO 14001 Implementation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="client" className="text-right">
                        Client
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select a client" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="acme">Acme Corporation</SelectItem>
                          <SelectItem value="tech-solutions">Tech Solutions Inc.</SelectItem>
                          <SelectItem value="global">Global Industries</SelectItem>
                          <SelectItem value="green">Green Solutions</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="start-date" className="text-right">
                        Start Date
                      </Label>
                      <Input
                        id="start-date"
                        type="date"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="end-date" className="text-right">
                        End Date
                      </Label>
                      <Input
                        id="end-date"
                        type="date"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="format" className="text-right">
                        Format
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select a format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in-person">In-Person</SelectItem>
                          <SelectItem value="online">Online</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="location" className="text-right">
                        Location
                      </Label>
                      <Input
                        id="location"
                        placeholder="Location (if applicable)"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="attendees" className="text-right">
                        Attendees
                      </Label>
                      <Input
                        id="attendees"
                        type="number"
                        placeholder="Number of attendees"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setScheduleDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Schedule</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        <TabsContent value="month" className="mt-0">
          <Card>
            <CardContent className="p-1 sm:p-6">
              <div className="grid grid-cols-7 gap-px bg-muted text-center text-sm font-medium">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="py-3">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-px bg-muted">
                {monthData.map(({ date: day, events }) => (
                  <div
                    key={day.toString()}
                    className={`min-h-[100px] bg-background p-2 ${
                      day.getMonth() !== date.getMonth() ? 'text-muted-foreground' : ''
                    }`}
                  >
                    <div className="flex justify-between">
                      <span className={`text-sm ${
                        format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                          ? 'bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center'
                          : ''
                      }`}>
                        {format(day, 'd')}
                      </span>
                    </div>
                    <div className="mt-1 space-y-1 overflow-y-auto max-h-[80px]">
                      {events.map((event) => (
                        <div
                          key={event.id}
                          onClick={() => handleEventClick(event)}
                          className={`
                            text-xs truncate p-1 rounded-md cursor-pointer
                            ${event.format === 'In-Person' 
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' 
                                : event.format === 'Online'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                  : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                            }
                          `}
                        >
                          {!isVendor ? event.clientName : ''} - {event.title}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="week" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-4">
                Week view is under development. Please use Month or List view for now.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Training Schedule</CardTitle>
              <CardDescription>
                {filteredEvents.length} trainings scheduled for {format(date, 'MMMM yyyy')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Training</TableHead>
                    {!isVendor && <TableHead>Client</TableHead>}
                    <TableHead>Dates</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Attendees</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents.map((event) => (
                    <TableRow key={event.id} onClick={() => handleEventClick(event)} className="cursor-pointer">
                      <TableCell className="font-medium">{event.title}</TableCell>
                      {!isVendor && (
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-muted-foreground" />
                            {event.clientName}
                          </div>
                        </TableCell>
                      )}
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {format(new Date(event.startDate), 'MMM d')} - {format(new Date(event.endDate), 'MMM d, yyyy')}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={event.format === 'In-Person' ? 'default' : 
                                event.format === 'Online' ? 'secondary' : 'outline'}
                        >
                          {event.format}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          {event.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          {event.attendees}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            event.status === 'scheduled' ? 'outline' :
                            event.status === 'in-progress' ? 'default' :
                            event.status === 'completed' ? 'secondary' :
                            'destructive'
                          }
                        >
                          {event.status === 'pending-vendor' ? 'Needs Vendor' : event.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredEvents.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={isVendor ? 7 : 8} className="text-center py-6 text-muted-foreground">
                        No trainings found for the selected period and filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {selectedEvent && (
          <Dialog open={!!selectedEvent} onOpenChange={closeEventDetails}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{selectedEvent.title}</DialogTitle>
                <DialogDescription>
                  Training details and information
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {!isVendor && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right font-medium">Client</Label>
                    <div className="col-span-3 flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      {selectedEvent.clientName}
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right font-medium">Dates</Label>
                  <div className="col-span-3 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {format(new Date(selectedEvent.startDate), 'MMMM d')} - {format(new Date(selectedEvent.endDate), 'MMMM d, yyyy')}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right font-medium">Format</Label>
                  <div className="col-span-3">
                    <Badge 
                      variant={selectedEvent.format === 'In-Person' ? 'default' : 
                             selectedEvent.format === 'Online' ? 'secondary' : 'outline'}
                    >
                      {selectedEvent.format}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right font-medium">Location</Label>
                  <div className="col-span-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {selectedEvent.location}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right font-medium">Attendees</Label>
                  <div className="col-span-3 flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    {selectedEvent.attendees} participants
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right font-medium">Trainer</Label>
                  <div className="col-span-3 flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    {selectedEvent.trainerName || 'Unassigned'}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right font-medium">Status</Label>
                  <div className="col-span-3">
                    <Badge 
                      variant={
                        selectedEvent.status === 'scheduled' ? 'outline' :
                        selectedEvent.status === 'in-progress' ? 'default' :
                        selectedEvent.status === 'completed' ? 'secondary' :
                        'destructive'
                      }
                    >
                      {selectedEvent.status === 'pending-vendor' ? 'Needs Vendor' : selectedEvent.status}
                    </Badge>
                  </div>
                </div>
                
                {!isVendor && selectedEvent.employeesList && (
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label className="text-right font-medium">Employees</Label>
                    <div className="col-span-3">
                      <ul className="list-disc ml-5 space-y-1">
                        {selectedEvent.employeesList.map((employee: string, index: number) => (
                          <li key={index}>{employee}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter>
                {isVendor && selectedEvent.status === 'pending-vendor' ? (
                  <Button asChild>
                    <Link to="/dashboard/training-proposals">Submit Proposal</Link>
                  </Button>
                ) : (
                  <Button asChild>
                    <Link to={`/dashboard/training-details/${selectedEvent.id}`}>View Full Details</Link>
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TrainingCalendar;
