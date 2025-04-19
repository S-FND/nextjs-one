
import React from 'react';
import DashboardLayout from '@/components/dashboards/DashboardLayout';
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
import { Badge } from '@/components/ui/badge';
import { GraduationCap, MapPin, Calendar, Globe } from 'lucide-react';
import { format } from 'date-fns';

// Mock data for demonstration
const MOCK_ASSIGNED_TRAININGS = [
  {
    id: '1',
    title: 'Workplace Safety Fundamentals',
    date: new Date(2025, 4, 20),
    type: 'offline',
    location: 'New York HQ - Training Room 2',
    status: 'scheduled'
  },
  {
    id: '2',
    title: 'Environmental Compliance',
    date: new Date(2025, 4, 25),
    type: 'online',
    location: 'https://lms.fandoro.com/env-compliance',
    status: 'scheduled'
  }
];

const MyTrainings = () => {
  // Mock user data - in a real app, this would come from authentication
  const userData = {
    name: "John Smith",
    userType: "employee",
    avatar: undefined,
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
            My Trainings
          </h2>
          <p className="text-muted-foreground">
            View your assigned EHS training schedule
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Assigned Trainings</CardTitle>
            <CardDescription>
              Your upcoming and completed training sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Training</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_ASSIGNED_TRAININGS.map((training) => (
                  <TableRow key={training.id}>
                    <TableCell className="font-medium">
                      {training.title}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {format(training.date, 'PPP')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={training.type === 'online' ? 'secondary' : 'default'}>
                        {training.type === 'online' ? (
                          <Globe className="h-4 w-4 mr-1" />
                        ) : (
                          <MapPin className="h-4 w-4 mr-1" />
                        )}
                        {training.type.charAt(0).toUpperCase() + training.type.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {training.type === 'online' ? (
                        <a 
                          href={training.location} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          Access Training
                        </a>
                      ) : (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          {training.location}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {training.status.charAt(0).toUpperCase() + training.status.slice(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MyTrainings;
