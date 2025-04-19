
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboards/DashboardLayout';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Check,
  Calendar as CalendarIcon,
  GraduationCap, 
  Search, 
  Users,
  MapPin,
  Plus,
  Clock,
  X
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from 'date-fns';

// Mock data for demonstration
const MOCK_TRAININGS = [
  {
    id: '1',
    title: 'Workplace Safety Fundamentals',
    category: 'Safety',
    duration: '2 days',
    format: 'In-Person',
    status: 'pending',
    description: 'Essential workplace safety practices covering risk assessment.',
    locations: ['New York HQ', 'Boston Office', 'Remote']
  },
  {
    id: '2',
    title: 'Environmental Compliance',
    category: 'Environment',
    duration: '1 day',
    format: 'Online',
    status: 'accepted',
    scheduledDate: new Date(2025, 4, 20),
    description: 'Overview of environmental regulations and compliance.',
    locations: ['Remote']
  }
];

// Mock employees data
const MOCK_EMPLOYEES = [
  { id: '1', name: 'John Smith', department: 'Operations' },
  { id: '2', name: 'Sarah Johnson', department: 'Safety' },
  { id: '3', name: 'Mike Brown', department: 'Engineering' },
];

const EHSTrainings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTraining, setSelectedTraining] = useState<any>(null);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedFormat, setSelectedFormat] = useState<string>();
  const [selectedLocation, setSelectedLocation] = useState<string>();
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const { toast } = useToast();
  
  // Mock user data - in a real app, this would come from authentication
  const userData = {
    name: "John Smith",
    userType: "enterprise",
    avatar: undefined,
  };

  const filteredTrainings = MOCK_TRAININGS.filter(training => {
    return training.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           training.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleStatusUpdate = (trainingId: string, newStatus: 'accepted' | 'rejected') => {
    // In a real app, this would update the database
    toast({
      title: `Training ${newStatus}`,
      description: `The training has been ${newStatus}.`,
    });
  };

  const handleScheduleTraining = () => {
    if (!selectedDate || !selectedFormat || !selectedLocation || selectedEmployees.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would update the database
    toast({
      title: "Training Scheduled",
      description: `Training has been scheduled for ${format(selectedDate, 'PPP')}.`,
    });
    setScheduleDialogOpen(false);
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
            <GraduationCap className="h-8 w-8" />
            EHS Trainings
          </h2>
          <p className="text-muted-foreground">
            Manage and schedule your EHS training programs
          </p>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search trainings..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Available Trainings</CardTitle>
            <CardDescription>
              Review and schedule trainings for your organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Training</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Format</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTrainings.map((training) => (
                  <TableRow key={training.id}>
                    <TableCell className="font-medium">
                      <div>
                        {training.title}
                        <p className="text-sm text-muted-foreground truncate max-w-md">
                          {training.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {training.category}
                      </Badge>
                    </TableCell>
                    <TableCell>{training.duration}</TableCell>
                    <TableCell>
                      <Badge variant={training.format === 'In-Person' ? 'default' : 'secondary'}>
                        {training.format}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={training.status === 'pending' ? 'outline' : 
                               training.status === 'accepted' ? 'default' : 'destructive'}
                      >
                        {training.status.charAt(0).toUpperCase() + training.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {training.status === 'pending' ? (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-600"
                              onClick={() => handleStatusUpdate(training.id, 'accepted')}
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Accept
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600"
                              onClick={() => handleStatusUpdate(training.id, 'rejected')}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        ) : training.status === 'accepted' && !training.scheduledDate ? (
                          <Dialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedTraining(training)}
                              >
                                <CalendarIcon className="h-4 w-4 mr-1" />
                                Schedule
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Schedule Training</DialogTitle>
                                <DialogDescription>
                                  Set up the training schedule and assign employees
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                  <Label>Date</Label>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        variant="outline"
                                        className={`w-full justify-start text-left font-normal ${
                                          !selectedDate && "text-muted-foreground"
                                        }`}
                                      >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {selectedDate ? (
                                          format(selectedDate, "PPP")
                                        ) : (
                                          <span>Pick a date</span>
                                        )}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                      <Calendar
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={setSelectedDate}
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </div>
                                
                                <div className="grid gap-2">
                                  <Label>Format</Label>
                                  <Select onValueChange={setSelectedFormat}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select format" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="online">Online</SelectItem>
                                      <SelectItem value="offline">Offline</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="grid gap-2">
                                  <Label>Location</Label>
                                  <Select onValueChange={setSelectedLocation}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select location" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {selectedTraining?.locations.map((loc: string) => (
                                        <SelectItem key={loc} value={loc}>
                                          {loc}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="grid gap-2">
                                  <Label>Assign Employees</Label>
                                  <Select 
                                    onValueChange={(value) => 
                                      setSelectedEmployees(prev => 
                                        prev.includes(value) 
                                          ? prev.filter(v => v !== value)
                                          : [...prev, value]
                                      )
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select employees" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {MOCK_EMPLOYEES.map(employee => (
                                        <SelectItem key={employee.id} value={employee.id}>
                                          {employee.name} - {employee.department}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  {selectedEmployees.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                      {selectedEmployees.map(empId => {
                                        const emp = MOCK_EMPLOYEES.find(e => e.id === empId);
                                        return (
                                          <Badge key={empId} variant="secondary">
                                            {emp?.name}
                                            <button
                                              className="ml-1 hover:text-destructive"
                                              onClick={() => setSelectedEmployees(prev => 
                                                prev.filter(id => id !== empId)
                                              )}
                                            >
                                              ×
                                            </button>
                                          </Badge>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setScheduleDialogOpen(false)}>
                                  Cancel
                                </Button>
                                <Button onClick={handleScheduleTraining}>
                                  Schedule Training
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        ) : (
                          <Badge variant="outline" className="gap-2">
                            <Clock className="h-4 w-4" />
                            {format(training.scheduledDate, 'PPP')}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredTrainings.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      No trainings found. Try adjusting your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EHSTrainings;
