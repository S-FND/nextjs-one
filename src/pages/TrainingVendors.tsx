
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboards/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';
import { 
  Handshake,
  Search, 
  Filter, 
  BarChart2, 
  CheckCircle, 
  X, 
  AlertTriangle, 
  Mail, 
  Phone, 
  GraduationCap,
  Star,
  ChevronRight,
  Building,
  MapPin,
  Calendar
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { format } from 'date-fns';

// Mock vendors data
const MOCK_VENDORS = [
  {
    id: '1',
    name: 'SafetyFirst Training',
    status: 'approved',
    email: 'contact@safetyfirst.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    specializations: ['Safety', 'Health'],
    rating: 4.8,
    completedTrainings: 12,
    upcomingTrainings: 2,
    registrationDate: new Date(2024, 2, 15),
  },
  {
    id: '2',
    name: 'EHS Solutions',
    status: 'approved',
    email: 'info@ehssolutions.com',
    phone: '+1 (555) 987-6543',
    location: 'Chicago, IL',
    specializations: ['Environment', 'Safety'],
    rating: 4.5,
    completedTrainings: 8,
    upcomingTrainings: 1,
    registrationDate: new Date(2024, 3, 5),
  },
  {
    id: '3',
    name: 'GreenSafe Environmental',
    status: 'pending',
    email: 'contact@greensafe.com',
    phone: '+1 (555) 456-7890',
    location: 'Seattle, WA',
    specializations: ['Environment'],
    rating: 0,
    completedTrainings: 0,
    upcomingTrainings: 0,
    registrationDate: new Date(2024, 4, 10),
  },
  {
    id: '4',
    name: 'WorkSafe Consultants',
    status: 'rejected',
    email: 'info@worksafe.com',
    phone: '+1 (555) 234-5678',
    location: 'Austin, TX',
    specializations: ['Safety', 'Health', 'Environment'],
    rating: 0,
    completedTrainings: 0,
    upcomingTrainings: 0,
    registrationDate: new Date(2024, 4, 8),
  },
];

// Mock performance data for vendor details
const MOCK_PERFORMANCE = [
  { category: 'Content Quality', score: 92 },
  { category: 'Delivery', score: 88 },
  { category: 'Material Quality', score: 95 },
  { category: 'Responsiveness', score: 85 },
  { category: 'Value for Money', score: 90 },
];

// Mock recent trainings for vendor details
const MOCK_RECENT_TRAININGS = [
  {
    id: 't1',
    title: 'Workplace Safety Fundamentals',
    clientName: 'Acme Corporation',
    date: new Date(2025, 3, 15),
    status: 'completed',
    rating: 4.9,
  },
  {
    id: 't2',
    title: 'Environmental Compliance',
    clientName: 'Tech Solutions Inc.',
    date: new Date(2025, 3, 5),
    status: 'completed',
    rating: 4.7,
  },
  {
    id: 't3',
    title: 'Health Risk Management',
    clientName: 'Global Industries',
    date: new Date(2025, 4, 25),
    status: 'upcoming',
    rating: null,
  },
];

const TrainingVendors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSpecialization, setFilterSpecialization] = useState('all');
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  
  // Mock user data - in a real app, this would come from authentication
  const userData = {
    name: "John Smith",
    userType: "admin",
    avatar: undefined,
  };

  const filteredVendors = MOCK_VENDORS.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          vendor.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || vendor.status === filterStatus;
    const matchesSpecialization = filterSpecialization === 'all' || 
                                 vendor.specializations.includes(filterSpecialization);
    return matchesSearch && matchesStatus && matchesSpecialization;
  });

  const handleVendorClick = (vendor: any) => {
    setSelectedVendor(vendor);
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
            <Handshake className="h-8 w-8" />
            Training Vendors
          </h2>
          <p className="text-muted-foreground">
            Manage EHS training vendors and partners
          </p>
        </div>
        
        <Tabs defaultValue="vendors" className="space-y-4">
          <TabsList>
            <TabsTrigger value="vendors">All Vendors</TabsTrigger>
            <TabsTrigger value="pending">Pending Approval</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
          </TabsList>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search vendors by name or location..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterSpecialization} onValueChange={setFilterSpecialization}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Specialization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specializations</SelectItem>
                  <SelectItem value="Safety">Safety</SelectItem>
                  <SelectItem value="Health">Health</SelectItem>
                  <SelectItem value="Environment">Environment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <TabsContent value="vendors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>EHS Training Vendors</CardTitle>
                <CardDescription>
                  {filteredVendors.length} vendors registered on the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Specializations</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Completed</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVendors.map((vendor) => (
                      <TableRow key={vendor.id} className="cursor-pointer" onClick={() => handleVendorClick(vendor)}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{vendor.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              {vendor.name}
                              <p className="text-sm text-muted-foreground">
                                Joined {format(vendor.registrationDate, 'MMM yyyy')}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {vendor.specializations.map((spec, index) => (
                              <Badge key={index} variant="outline">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            {vendor.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              vendor.status === 'approved' ? 'default' :
                              vendor.status === 'rejected' ? 'destructive' :
                              'outline'
                            }
                          >
                            {vendor.status === 'approved' && <CheckCircle className="mr-1 h-3 w-3" />}
                            {vendor.status === 'rejected' && <X className="mr-1 h-3 w-3" />}
                            {vendor.status === 'pending' && <AlertTriangle className="mr-1 h-3 w-3" />}
                            {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {vendor.rating > 0 ? (
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{vendor.rating.toFixed(1)}</span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">N/A</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {vendor.completedTrainings} trainings
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredVendors.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                          No vendors found matching your criteria.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pending" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Approval Requests</CardTitle>
                <CardDescription>
                  Vendors waiting for account approval
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Specializations</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Registration Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {MOCK_VENDORS.filter(v => v.status === 'pending').map((vendor) => (
                      <TableRow key={vendor.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{vendor.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              {vendor.name}
                              <p className="text-sm text-muted-foreground">
                                {vendor.location}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {vendor.specializations.map((spec, index) => (
                              <Badge key={index} variant="outline">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="h-3 w-3 text-muted-foreground" />
                              {vendor.email}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="h-3 w-3 text-muted-foreground" />
                              {vendor.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {format(vendor.registrationDate, 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => {
                              // In a real app, this would call an API
                              toast({
                                title: "Vendor approved",
                                description: `${vendor.name} has been approved as a training vendor.`,
                              });
                            }}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => {
                              // In a real app, this would call an API
                              toast({
                                title: "Vendor rejected",
                                description: `${vendor.name} has been rejected.`,
                                variant: "destructive"
                              });
                            }}>
                              <X className="mr-2 h-4 w-4" />
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {MOCK_VENDORS.filter(v => v.status === 'pending').length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                          No pending approval requests.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="statistics" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Vendors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{MOCK_VENDORS.length}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-forest-500 inline-flex items-center">
                      +2
                    </span>{" "}
                    from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Vendors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {MOCK_VENDORS.filter(v => v.status === 'approved').length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {((MOCK_VENDORS.filter(v => v.status === 'approved').length / MOCK_VENDORS.length) * 100).toFixed(0)}% of total vendors
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average Rating
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold flex items-center">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                    {(MOCK_VENDORS.reduce((acc, v) => acc + v.rating, 0) / 
                      MOCK_VENDORS.filter(v => v.rating > 0).length).toFixed(1)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Based on {MOCK_VENDORS.reduce((acc, v) => acc + v.completedTrainings, 0)} trainings
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Vendor Specializations</CardTitle>
                <CardDescription>
                  Distribution of vendor expertise areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Safety</span>
                      <span className="text-sm text-muted-foreground">
                        {MOCK_VENDORS.filter(v => v.specializations.includes('Safety')).length} vendors
                      </span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Health</span>
                      <span className="text-sm text-muted-foreground">
                        {MOCK_VENDORS.filter(v => v.specializations.includes('Health')).length} vendors
                      </span>
                    </div>
                    <Progress value={50} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Environment</span>
                      <span className="text-sm text-muted-foreground">
                        {MOCK_VENDORS.filter(v => v.specializations.includes('Environment')).length} vendors
                      </span>
                    </div>
                    <Progress value={62} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Vendor Details Dialog */}
      <Dialog open={!!selectedVendor} onOpenChange={(open) => !open && setSelectedVendor(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              {selectedVendor?.name}
            </DialogTitle>
            <DialogDescription>
              EHS Training Vendor Details
            </DialogDescription>
          </DialogHeader>
          
          {selectedVendor && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarFallback className="text-2xl">{selectedVendor.name[0]}</AvatarFallback>
                  </Avatar>
                  
                  <h3 className="text-xl font-semibold">{selectedVendor.name}</h3>
                  <Badge 
                    variant={
                      selectedVendor.status === 'approved' ? 'default' :
                      selectedVendor.status === 'rejected' ? 'destructive' :
                      'outline'
                    }
                    className="mt-1"
                  >
                    {selectedVendor.status === 'approved' && <CheckCircle className="mr-1 h-3 w-3" />}
                    {selectedVendor.status === 'rejected' && <X className="mr-1 h-3 w-3" />}
                    {selectedVendor.status === 'pending' && <AlertTriangle className="mr-1 h-3 w-3" />}
                    {selectedVendor.status.charAt(0).toUpperCase() + selectedVendor.status.slice(1)}
                  </Badge>
                  
                  {selectedVendor.rating > 0 && (
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{selectedVendor.rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedVendor.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedVendor.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedVendor.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Specializations</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedVendor.specializations.map((spec: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Account Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Registration Date</span>
                      <span>{format(selectedVendor.registrationDate, 'MMM d, yyyy')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Completed Trainings</span>
                      <span>{selectedVendor.completedTrainings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Upcoming Trainings</span>
                      <span>{selectedVendor.upcomingTrainings}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2 space-y-6">
                <Tabs defaultValue="performance">
                  <TabsList className="w-full">
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="trainings">Recent Trainings</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="performance" className="mt-4 space-y-4">
                    <div className="space-y-4">
                      <h4 className="font-medium">Performance Metrics</h4>
                      
                      {selectedVendor.completedTrainings > 0 ? (
                        <div className="space-y-4">
                          {MOCK_PERFORMANCE.map((item, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">{item.category}</span>
                                <span className="text-sm text-muted-foreground">
                                  {item.score}/100
                                </span>
                              </div>
                              <Progress value={item.score} className="h-2" />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-muted p-6 rounded-md text-center text-muted-foreground">
                          No performance data available yet. This vendor hasn't completed any trainings.
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="trainings" className="mt-4 space-y-4">
                    <div className="space-y-4">
                      <h4 className="font-medium">Recent Trainings</h4>
                      
                      {selectedVendor.completedTrainings > 0 ? (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Training</TableHead>
                              <TableHead>Client</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Rating</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {MOCK_RECENT_TRAININGS.map((training) => (
                              <TableRow key={training.id}>
                                <TableCell className="font-medium">
                                  <div className="flex items-center gap-2">
                                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                    {training.title}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Building className="h-4 w-4 text-muted-foreground" />
                                    {training.clientName}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    {format(training.date, 'MMM d, yyyy')}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge 
                                    variant={training.status === 'completed' ? 'secondary' : 'outline'}
                                  >
                                    {training.status.charAt(0).toUpperCase() + training.status.slice(1)}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  {training.rating ? (
                                    <div className="flex items-center gap-1">
                                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                      <span>{training.rating.toFixed(1)}</span>
                                    </div>
                                  ) : (
                                    <span className="text-muted-foreground">N/A</span>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <div className="bg-muted p-6 rounded-md text-center text-muted-foreground">
                          No training history available. This vendor hasn't conducted any trainings yet.
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="documents" className="mt-4 space-y-4">
                    <div className="space-y-4">
                      <h4 className="font-medium">Vendor Documents</h4>
                      
                      <div className="bg-muted p-6 rounded-md text-center text-muted-foreground">
                        This section would contain vendor certifications, licenses, and other documents.
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="flex justify-end gap-2 pt-4">
                  {selectedVendor.status === 'pending' && (
                    <>
                      <Button variant="destructive">
                        <X className="mr-2 h-4 w-4" />
                        Reject Vendor
                      </Button>
                      <Button>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Approve Vendor
                      </Button>
                    </>
                  )}
                  
                  {selectedVendor.status === 'approved' && (
                    <>
                      <Button variant="outline">
                        Send Message
                      </Button>
                      <Button>
                        Assign Training
                      </Button>
                    </>
                  )}
                  
                  {selectedVendor.status === 'rejected' && (
                    <Button>
                      Reconsider Application
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default TrainingVendors;
