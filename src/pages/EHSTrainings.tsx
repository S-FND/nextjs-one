
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboards/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Search, GraduationCap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrainingList } from '@/components/trainings/TrainingList';
import { ScheduleDialog } from '@/components/trainings/ScheduleDialog';

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

  const handleStatusUpdate = (trainingId: string, newStatus: 'accepted' | 'rejected') => {
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
            <TrainingList
              trainings={MOCK_TRAININGS}
              searchQuery={searchQuery}
              onStatusUpdate={handleStatusUpdate}
              onSchedule={(training) => {
                setSelectedTraining(training);
                setScheduleDialogOpen(true);
              }}
            />
          </CardContent>
        </Card>

        <ScheduleDialog
          open={scheduleDialogOpen}
          onOpenChange={setScheduleDialogOpen}
          selectedTraining={selectedTraining}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedFormat={selectedFormat}
          setSelectedFormat={setSelectedFormat}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedEmployees={selectedEmployees}
          setSelectedEmployees={setSelectedEmployees}
          employees={MOCK_EMPLOYEES}
          onSchedule={handleScheduleTraining}
        />
      </div>
    </DashboardLayout>
  );
};

export default EHSTrainings;
