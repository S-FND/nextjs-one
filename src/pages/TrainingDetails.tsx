
import React from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '@/components/dashboards/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  GraduationCap, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  User, 
  Building, 
  FileText, 
  ArrowLeft, 
  Mail, 
  Phone,
  Check,
  X,
  AlertTriangle,
  Edit,
  Trash2,
  Download,
  Upload,
  ClipboardCheck 
} from 'lucide-react';

// Mock training data
const MOCK_TRAINING = {
  id: '1',
  title: 'Workplace Safety Fundamentals',
  clientId: 'client-123',
  clientName: 'Acme Corporation',
  clientContact: {
    name: 'John Williams',
    email: 'john@acmecorp.com',
    phone: '+1 (555) 123-4567'
  },
  startDate: new Date(2025, 4, 5),
  endDate: new Date(2025, 4, 6),
  startTime: '09:00 AM',
  endTime: '05:00 PM',
  location: 'New York Office',
  address: '123 Broadway, New York, NY 10001',
  format: 'In-Person',
  status: 'scheduled',
  attendees: 15,
  trainerName: 'Sarah Johnson',
  trainerId: 'trainer-123',
  description: 'Essential workplace safety practices covering risk assessment, hazard identification, and emergency procedures.',
  employeesList: [
    { id: 'emp-1', name: 'John Doe', email: 'john@acmecorp.com', attendance: 'confirmed' },
    { id: 'emp-2', name: 'Jane Smith', email: 'jane@acmecorp.com', attendance: 'confirmed' },
    { id: 'emp-3', name: 'Robert Brown', email: 'robert@acmecorp.com', attendance: 'pending' },
    { id: 'emp-4', name: 'Emily Davis', email: 'emily@acmecorp.com', attendance: 'confirmed' },
    { id: 'emp-5', name: 'Michael Wilson', email: 'michael@acmecorp.com', attendance: 'confirmed' },
  ],
  materials: [
    { id: 'mat-1', name: 'Safety Handbook.pdf', size: '2.4 MB', uploadedAt: '2025-04-01' },
    { id: 'mat-2', name: 'Risk Assessment Templates.docx', size: '1.1 MB', uploadedAt: '2025-04-01' },
    { id: 'mat-3', name: 'Emergency Procedures.pdf', size: '3.7 MB', uploadedAt: '2025-04-02' },
  ],
  vendorProposals: [
    {
      id: 'prop-1',
      vendorName: 'SafetyFirst Training',
      vendorId: 'vendor-123',
      contentFee: 750,
      trainingFee: 2000,
      travelFee: 500,
      totalFee: 3250,
      trainers: ['Sarah Johnson', 'Mark Thompson'],
      submittedAt: '2025-03-15',
      status: 'accepted'
    },
    {
      id: 'prop-2',
      vendorName: 'EHS Solutions',
      vendorId: 'vendor-456',
      contentFee: 800,
      trainingFee: 2200,
      travelFee: 600,
      totalFee: 3600,
      trainers: ['David Lee', 'Jessica Patel'],
      submittedAt: '2025-03-14',
      status: 'rejected'
    }
  ]
};

const TrainingDetails = () => {
  const { id } = useParams();
  // In a real app, you would fetch the training details based on the ID
  const training = MOCK_TRAINING;
  
  // Mock user data - in a real app, this would come from authentication
  const userData = {
    name: "John Smith",
    userType: "admin", // or "enterprise"
    avatar: undefined,
  };

  const isVendor = userData.userType === 'vendor';
  
  // For vendors, hide client information
  const displayTraining = isVendor ? {
    ...training,
    clientName: 'Client information hidden',
    clientContact: null,
    employeesList: training.employeesList.map(emp => ({
      ...emp,
      name: `Employee ${emp.id}`,
      email: 'email hidden'
    }))
  } : training;

  return (
    <DashboardLayout 
      userType={userData.userType as any}
      userName={userData.name}
      userAvatar={userData.avatar}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div>
            <Button variant="ghost" className="pl-0 mb-2" asChild>
              <a href="/dashboard/training-calendar">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Calendar
              </a>
            </Button>
            <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <GraduationCap className="h-8 w-8" />
              {displayTraining.title}
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <Badge 
                variant={
                  displayTraining.status === 'scheduled' ? 'outline' :
                  displayTraining.status === 'in-progress' ? 'default' :
                  displayTraining.status === 'completed' ? 'secondary' :
                  'destructive'
                }
              >
                {displayTraining.status === 'pending-vendor' ? 'Needs Vendor' : displayTraining.status}
              </Badge>
              <Badge 
                variant={displayTraining.format === 'In-Person' ? 'default' : 
                      displayTraining.format === 'Online' ? 'secondary' : 'outline'}
              >
                {displayTraining.format}
              </Badge>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {!isVendor && (
              <>
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Training
                </Button>
                <Button variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Cancel Training
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Training Information</CardTitle>
                <CardDescription>
                  Complete details about this training session
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Date</p>
                        <p className="text-muted-foreground">
                          {displayTraining.startDate.toLocaleDateString()} - {displayTraining.endDate.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Time</p>
                        <p className="text-muted-foreground">
                          {displayTraining.startTime} - {displayTraining.endTime}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-muted-foreground">
                          {displayTraining.location}
                          {displayTraining.address && (
                            <span className="block text-sm">{displayTraining.address}</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Attendees</p>
                        <p className="text-muted-foreground">
                          {displayTraining.attendees} participants
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Trainer</p>
                        <p className="text-muted-foreground">
                          {displayTraining.trainerName || 'Unassigned'}
                        </p>
                      </div>
                    </div>
                    
                    {!isVendor && (
                      <div className="flex items-start gap-2">
                        <Building className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Client</p>
                          <p className="text-muted-foreground">
                            {displayTraining.clientName}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-muted-foreground">
                    {displayTraining.description}
                  </p>
                </div>
                
                {!isVendor && displayTraining.clientContact && (
                  <>
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-2">Client Contact</h3>
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>{displayTraining.clientContact.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{displayTraining.clientContact.name}</p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Mail className="mr-1 h-3 w-3" />
                              {displayTraining.clientContact.email}
                            </div>
                            <div className="flex items-center">
                              <Phone className="mr-1 h-3 w-3" />
                              {displayTraining.clientContact.phone}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
            
            <Tabs defaultValue="attendees" className="space-y-4">
              <TabsList>
                <TabsTrigger value="attendees">Attendees</TabsTrigger>
                <TabsTrigger value="materials">Training Materials</TabsTrigger>
                {!isVendor && <TabsTrigger value="proposals">Vendor Proposals</TabsTrigger>}
              </TabsList>
              
              <TabsContent value="attendees" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Attendees List</CardTitle>
                    <CardDescription>
                      {displayTraining.employeesList.length} employees registered for this training
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {displayTraining.employeesList.map((employee) => (
                          <TableRow key={employee.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                {employee.name}
                              </div>
                            </TableCell>
                            <TableCell>{employee.email}</TableCell>
                            <TableCell>
                              {employee.attendance === 'confirmed' ? (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  <Check className="mr-1 h-3 w-3" /> Confirmed
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                  <AlertTriangle className="mr-1 h-3 w-3" /> Pending
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="materials" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Training Materials</CardTitle>
                    <CardDescription>
                      Documents and resources for this training
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Size</TableHead>
                          <TableHead>Uploaded</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {displayTraining.materials.map((material) => (
                          <TableRow key={material.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                {material.name}
                              </div>
                            </TableCell>
                            <TableCell>{material.size}</TableCell>
                            <TableCell>{material.uploadedAt}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    
                    <div className="mt-4">
                      <Button variant="outline">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload New Material
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {!isVendor && (
                <TabsContent value="proposals" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Vendor Proposals</CardTitle>
                      <CardDescription>
                        {displayTraining.vendorProposals.length} proposals received for this training
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Vendor</TableHead>
                            <TableHead>Content Fee</TableHead>
                            <TableHead>Training Fee</TableHead>
                            <TableHead>Travel Fee</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {displayTraining.vendorProposals.map((proposal) => (
                            <TableRow key={proposal.id}>
                              <TableCell className="font-medium">
                                <div>
                                  {proposal.vendorName}
                                  <div className="text-xs text-muted-foreground">
                                    Submitted: {proposal.submittedAt}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>${proposal.contentFee}</TableCell>
                              <TableCell>${proposal.trainingFee}</TableCell>
                              <TableCell>${proposal.travelFee}</TableCell>
                              <TableCell className="font-medium">${proposal.totalFee}</TableCell>
                              <TableCell>
                                {proposal.status === 'accepted' ? (
                                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    <Check className="mr-1 h-3 w-3" /> Accepted
                                  </Badge>
                                ) : proposal.status === 'rejected' ? (
                                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                    <X className="mr-1 h-3 w-3" /> Rejected
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                    <AlertTriangle className="mr-1 h-3 w-3" /> Pending
                                  </Badge>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Training Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Status</span>
                  <Badge 
                    variant={
                      displayTraining.status === 'scheduled' ? 'outline' :
                      displayTraining.status === 'in-progress' ? 'default' :
                      displayTraining.status === 'completed' ? 'secondary' :
                      'destructive'
                    }
                  >
                    {displayTraining.status === 'pending-vendor' ? 'Needs Vendor' : displayTraining.status}
                  </Badge>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <p className="font-medium">Quick Actions</p>
                  <div className="grid gap-2">
                    {isVendor ? (
                      <>
                        <Button className="w-full justify-start">
                          <ClipboardCheck className="mr-2 h-4 w-4" />
                          Mark Training Complete
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Completion Report
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button className="w-full justify-start">
                          <Mail className="mr-2 h-4 w-4" />
                          Email Attendees
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Download className="mr-2 h-4 w-4" />
                          Export Attendee List
                        </Button>
                        {displayTraining.status === 'pending-vendor' && (
                          <Button variant="outline" className="w-full justify-start">
                            <Users className="mr-2 h-4 w-4" />
                            Assign Vendor
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {!isVendor && (
              <Card>
                <CardHeader>
                  <CardTitle>Budget</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {displayTraining.vendorProposals.find(p => p.status === 'accepted') ? (
                    <>
                      <div className="grid grid-cols-2 gap-2">
                        <span className="text-muted-foreground">Content Fee</span>
                        <span className="text-right font-medium">
                          ${displayTraining.vendorProposals.find(p => p.status === 'accepted')?.contentFee}
                        </span>
                        
                        <span className="text-muted-foreground">Training Fee</span>
                        <span className="text-right font-medium">
                          ${displayTraining.vendorProposals.find(p => p.status === 'accepted')?.trainingFee}
                        </span>
                        
                        <span className="text-muted-foreground">Travel & Stay</span>
                        <span className="text-right font-medium">
                          ${displayTraining.vendorProposals.find(p => p.status === 'accepted')?.travelFee}
                        </span>
                        
                        <Separator className="col-span-2 my-1" />
                        
                        <span className="font-medium">Total</span>
                        <span className="text-right font-bold">
                          ${displayTraining.vendorProposals.find(p => p.status === 'accepted')?.totalFee}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      No vendor has been assigned yet.
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TrainingDetails;
