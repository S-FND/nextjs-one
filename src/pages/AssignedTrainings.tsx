
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/dashboards/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  GraduationCap, 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  CheckCircle, 
  ClipboardCheck,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { format } from 'date-fns';

// Mock assigned trainings data
const MOCK_TRAININGS = [
  {
    id: '1',
    title: 'Workplace Safety Fundamentals',
    startDate: new Date(2025, 4, 15),
    endDate: new Date(2025, 4, 16),
    location: 'New York City',
    format: 'In-Person',
    attendees: 15,
    fee: 3250,
    status: 'upcoming',
    materials: 3
  },
  {
    id: '2',
    title: 'Environmental Compliance',
    startDate: new Date(2025, 4, 22),
    endDate: new Date(2025, 4, 22),
    location: 'Remote',
    format: 'Online',
    attendees: 30,
    fee: 2000,
    status: 'upcoming',
    materials: 2
  },
  {
    id: '3',
    title: 'Fire Safety and Prevention',
    startDate: new Date(2025, 3, 20),
    endDate: new Date(2025, 3, 20),
    location: 'Boston',
    format: 'In-Person',
    attendees: 20,
    fee: 4000,
    status: 'completed',
    materials: 4
  },
];

const AssignedTrainings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterFormat, setFilterFormat] = useState('all');
  
  // Mock user data - in a real app, this would come from authentication
  const userData = {
    name: "John Smith",
    userType: "vendor",
    avatar: undefined,
  };

  const filteredTrainings = MOCK_TRAININGS.filter(training => {
    const matchesSearch = training.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         training.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || training.status === filterStatus;
    const matchesFormat = filterFormat === 'all' || training.format.toLowerCase() === filterFormat.toLowerCase();
    return matchesSearch && matchesStatus && matchesFormat;
  });

  return (
    <DashboardLayout 
      userType={userData.userType as any}
      userName={userData.name}
      userAvatar={userData.avatar}
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <ClipboardCheck className="h-8 w-8" />
            Assigned Trainings
          </h2>
          <p className="text-muted-foreground">
            Manage your assigned EHS training sessions
          </p>
        </div>
        
        <Tabs defaultValue="list" className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start md:items-center gap-4">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search trainings..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[150px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={filterFormat} onValueChange={setFilterFormat}>
                  <SelectTrigger className="w-[150px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Formats</SelectItem>
                    <SelectItem value="In-Person">In-Person</SelectItem>
                    <SelectItem value="Online">Online</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <TabsContent value="list" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Training Assignments</CardTitle>
                <CardDescription>
                  {filteredTrainings.length} trainings assigned to you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Training</TableHead>
                      <TableHead>Dates</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Format</TableHead>
                      <TableHead>Attendees</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTrainings.map((training) => (
                      <TableRow key={training.id}>
                        <TableCell className="font-medium">
                          {training.title}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {format(training.startDate, 'MMM d')}
                              {training.startDate.getTime() !== training.endDate.getTime() && 
                                ` - ${format(training.endDate, 'MMM d')}`}, {format(training.startDate, 'yyyy')}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            {training.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={training.format === 'In-Person' ? 'default' : 
                                   training.format === 'Online' ? 'secondary' : 'outline'}
                          >
                            {training.format}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            {training.attendees}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              training.status === 'upcoming' ? 'outline' :
                              training.status === 'in-progress' ? 'default' :
                              'secondary'
                            }
                          >
                            {training.status === 'upcoming' && (
                              <Clock className="mr-1 h-3 w-3" />
                            )}
                            {training.status === 'in-progress' && (
                              <AlertTriangle className="mr-1 h-3 w-3" />
                            )}
                            {training.status === 'completed' && (
                              <CheckCircle className="mr-1 h-3 w-3" />
                            )}
                            {training.status.charAt(0).toUpperCase() + training.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button asChild variant="outline" size="sm">
                              <Link to={`/dashboard/training-details/${training.id}`}>
                                View Details
                              </Link>
                            </Button>
                            <Button asChild variant="outline" size="sm">
                              <Link to={`/dashboard/training-details/${training.id}#materials`}>
                                <FileText className="h-4 w-4" />
                                <span className="sr-only sm:not-sr-only sm:ml-2">Materials</span>
                              </Link>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredTrainings.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                          No trainings found matching your criteria.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="calendar" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Training Calendar</CardTitle>
                <CardDescription>
                  View your assigned trainings in calendar format
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    Calendar view is under development. Please use List view for now.
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/dashboard/training-calendar">
                      View Training Calendar
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Upcoming Trainings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_TRAININGS.filter(t => t.status === 'upcoming')
                  .slice(0, 3)
                  .map(training => (
                    <div key={training.id} className="flex justify-between items-start border-b pb-4 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">{training.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(training.startDate, 'MMM d, yyyy')}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3" /> {training.location}
                        </div>
                      </div>
                      <Badge 
                        variant={training.format === 'In-Person' ? 'default' : 
                               training.format === 'Online' ? 'secondary' : 'outline'}
                      >
                        {training.format}
                      </Badge>
                    </div>
                  ))}
                {MOCK_TRAININGS.filter(t => t.status === 'upcoming').length === 0 && (
                  <p className="text-center text-muted-foreground py-2">
                    No upcoming trainings
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Completed Trainings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_TRAININGS.filter(t => t.status === 'completed')
                  .slice(0, 3)
                  .map(training => (
                    <div key={training.id} className="flex justify-between items-start border-b pb-4 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">{training.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(training.startDate, 'MMM d, yyyy')}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <Users className="h-3 w-3" /> {training.attendees} attendees
                        </div>
                      </div>
                      <Badge variant="secondary">Completed</Badge>
                    </div>
                  ))}
                {MOCK_TRAININGS.filter(t => t.status === 'completed').length === 0 && (
                  <p className="text-center text-muted-foreground py-2">
                    No completed trainings
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Training Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>Vendor Guidelines</span>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>Training Templates</span>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>Reporting Forms</span>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
                
                <Button variant="outline" className="w-full">
                  Access Resources Library
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AssignedTrainings;
