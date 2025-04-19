
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/dashboards/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  GraduationCap, 
  Search, 
  Filter, 
  Clock, 
  MapPin, 
  Users, 
  Calendar, 
  ExternalLink,
  DollarSign 
} from 'lucide-react';
import { format, addDays } from 'date-fns';

// Mock training opportunities data
const MOCK_OPPORTUNITIES = [
  {
    id: '1',
    title: 'Workplace Safety Fundamentals',
    startDate: new Date(2025, 4, 15),
    endDate: new Date(2025, 4, 16),
    location: 'New York City',
    format: 'In-Person',
    attendees: 15,
    budget: '2000-3000',
    status: 'open',
    category: 'Safety',
    description: 'Essential workplace safety practices covering risk assessment, hazard identification, and emergency procedures.'
  },
  {
    id: '2',
    title: 'Environmental Compliance',
    startDate: new Date(2025, 4, 22),
    endDate: new Date(2025, 4, 22),
    location: 'Remote',
    format: 'Online',
    attendees: 30,
    budget: '1500-2000',
    status: 'open',
    category: 'Environment',
    description: 'Overview of environmental regulations, waste management, and sustainable practices.'
  },
  {
    id: '3',
    title: 'Health Risk Management',
    startDate: new Date(2025, 5, 5),
    endDate: new Date(2025, 5, 7),
    location: 'Chicago',
    format: 'In-Person',
    attendees: 25,
    budget: '3500-4500',
    status: 'open',
    category: 'Health',
    description: 'Comprehensive health risk management training including occupational health hazards and preventive measures.'
  },
  {
    id: '4',
    title: 'ISO 14001 Implementation',
    startDate: new Date(2025, 5, 15),
    endDate: new Date(2025, 5, 18),
    location: 'Miami',
    format: 'Hybrid',
    attendees: 10,
    budget: '4000-5000',
    status: 'open',
    category: 'Environment',
    description: 'Detailed implementation guide for ISO 14001 environmental management systems.'
  },
];

// Mock vendor bid history
const MOCK_HISTORY = [
  {
    id: 'bid-1',
    trainingId: '5',
    trainingTitle: 'Fire Safety and Prevention',
    submittedDate: new Date(2025, 3, 10),
    proposal: {
      contentFee: 800,
      trainingFee: 2500,
      travelFee: 700,
      totalFee: 4000
    },
    status: 'accepted',
    trainingDate: new Date(2025, 3, 20)
  },
  {
    id: 'bid-2',
    trainingId: '6',
    trainingTitle: 'Chemical Handling Safety',
    submittedDate: new Date(2025, 3, 5),
    proposal: {
      contentFee: 600,
      trainingFee: 1800,
      travelFee: 500,
      totalFee: 2900
    },
    status: 'rejected',
    trainingDate: new Date(2025, 3, 15)
  },
  {
    id: 'bid-3',
    trainingId: '7',
    trainingTitle: 'Ergonomics in the Workplace',
    submittedDate: new Date(2025, 2, 25),
    proposal: {
      contentFee: 500,
      trainingFee: 1500,
      travelFee: 0,
      totalFee: 2000
    },
    status: 'pending',
    trainingDate: new Date(2025, 4, 10)
  },
];

const EHSTrainingBids = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterFormat, setFilterFormat] = useState('all');
  
  // Mock user data - in a real app, this would come from authentication
  const userData = {
    name: "John Smith",
    userType: "vendor",
    avatar: undefined,
  };

  const filteredOpportunities = MOCK_OPPORTUNITIES.filter(opportunity => {
    const matchesSearch = opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         opportunity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opportunity.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || opportunity.category.toLowerCase() === filterCategory.toLowerCase();
    const matchesFormat = filterFormat === 'all' || opportunity.format.toLowerCase() === filterFormat.toLowerCase();
    return matchesSearch && matchesCategory && matchesFormat;
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
            <GraduationCap className="h-8 w-8" />
            EHS Training Opportunities
          </h2>
          <p className="text-muted-foreground">
            Browse and bid on available EHS training opportunities
          </p>
        </div>
        
        <Tabs defaultValue="opportunities" className="space-y-4">
          <TabsList>
            <TabsTrigger value="opportunities">Available Opportunities</TabsTrigger>
            <TabsTrigger value="history">Bid History</TabsTrigger>
          </TabsList>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search trainings by title, description, or location..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Safety">Safety</SelectItem>
                  <SelectItem value="Health">Health</SelectItem>
                  <SelectItem value="Environment">Environment</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterFormat} onValueChange={setFilterFormat}>
                <SelectTrigger className="w-[180px]">
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
          
          <TabsContent value="opportunities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Available Training Opportunities</CardTitle>
                <CardDescription>
                  {filteredOpportunities.length} EHS training opportunities open for proposals
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
                      <TableHead>Budget Range</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOpportunities.map((opportunity) => (
                      <TableRow key={opportunity.id}>
                        <TableCell className="font-medium">
                          <div>
                            {opportunity.title}
                            <p className="text-sm text-muted-foreground">
                              {opportunity.category}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {format(opportunity.startDate, 'MMM d')}
                              {opportunity.startDate.getTime() !== opportunity.endDate.getTime() && 
                                ` - ${format(opportunity.endDate, 'MMM d')}`}, {format(opportunity.startDate, 'yyyy')}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            {opportunity.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={opportunity.format === 'In-Person' ? 'default' : 
                                  opportunity.format === 'Online' ? 'secondary' : 'outline'}
                          >
                            {opportunity.format}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            {opportunity.attendees}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            ${opportunity.budget}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button asChild>
                            <Link to={`/dashboard/training-proposals?id=${opportunity.id}`}>
                              Submit Proposal
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredOpportunities.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                          No training opportunities matching your criteria found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Bid History</CardTitle>
                <CardDescription>
                  Past proposals you've submitted for training opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Training</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Training Date</TableHead>
                      <TableHead>Proposal Value</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {MOCK_HISTORY.map((bid) => (
                      <TableRow key={bid.id}>
                        <TableCell className="font-medium">
                          {bid.trainingTitle}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            {format(bid.submittedDate, 'MMM d, yyyy')}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {format(bid.trainingDate, 'MMM d, yyyy')}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            ${bid.proposal.totalFee}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              bid.status === 'accepted' ? 'default' :
                              bid.status === 'rejected' ? 'destructive' :
                              'outline'
                            }
                          >
                            {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/dashboard/training-proposals?bid=${bid.id}`}>
                              <ExternalLink className="mr-2 h-4 w-4" />
                              View Details
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {MOCK_HISTORY.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                          You haven't submitted any proposals yet.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default EHSTrainingBids;
