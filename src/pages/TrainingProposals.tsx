
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboards/DashboardLayout';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Users, 
  ArrowLeft, 
  DollarSign, 
  Upload,
  FileText,
  Trash2,
  Plus
} from 'lucide-react';
import { format } from 'date-fns';

// Mock training opportunity data (simulating fetched data based on ID)
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
  }
];

// Mock bid history data
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
      totalFee: 4000,
      notes: 'We will provide comprehensive training materials and hands-on demonstrations.',
      trainers: [
        { name: 'Sarah Johnson', resume: 'sarah_johnson_resume.pdf' },
        { name: 'Michael Chen', resume: 'michael_chen_resume.pdf' }
      ]
    },
    status: 'accepted',
    trainingDate: new Date(2025, 3, 20)
  }
];

// Form schema
const proposalFormSchema = z.object({
  contentFee: z.coerce.number().min(0, "Content fee must be a positive number"),
  trainingFee: z.coerce.number().min(0, "Training fee must be a positive number"),
  travelFee: z.coerce.number().min(0, "Travel fee must be a positive number"),
  notes: z.string().optional(),
  trainers: z.array(
    z.object({
      name: z.string().min(1, "Trainer name is required"),
      resume: z.string().optional()
    })
  ).min(1, "At least one trainer is required")
});

type ProposalFormValues = z.infer<typeof proposalFormSchema>;

const TrainingProposals = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const opportunityId = queryParams.get('id');
  const bidId = queryParams.get('bid');
  
  // In a real app, you would fetch the data based on the ID
  const opportunity = opportunityId 
    ? MOCK_OPPORTUNITIES.find(opp => opp.id === opportunityId) 
    : null;
  
  const existingBid = bidId
    ? MOCK_HISTORY.find(bid => bid.id === bidId)
    : null;
  
  const isViewMode = !!existingBid;
  
  // Mock user data - in a real app, this would come from authentication
  const userData = {
    name: "John Smith",
    userType: "vendor",
    avatar: undefined,
  };

  const form = useForm<ProposalFormValues>({
    resolver: zodResolver(proposalFormSchema),
    defaultValues: existingBid 
      ? {
          contentFee: existingBid.proposal.contentFee,
          trainingFee: existingBid.proposal.trainingFee,
          travelFee: existingBid.proposal.travelFee,
          notes: existingBid.proposal.notes,
          trainers: existingBid.proposal.trainers.map(t => ({ 
            name: t.name, 
            resume: t.resume 
          }))
        }
      : {
          contentFee: 0,
          trainingFee: 0,
          travelFee: 0,
          notes: '',
          trainers: [{ name: '', resume: '' }]
        }
  });

  const totalFee = form.watch('contentFee') + form.watch('trainingFee') + form.watch('travelFee');

  const onSubmit = (data: ProposalFormValues) => {
    console.log('Submitting proposal:', data);
    toast({
      title: "Proposal submitted",
      description: "Your proposal has been submitted successfully.",
    });
    navigate('/dashboard/ehs-training-bids');
  };

  const addTrainer = () => {
    const currentTrainers = form.getValues('trainers');
    form.setValue('trainers', [...currentTrainers, { name: '', resume: '' }]);
  };

  const removeTrainer = (index: number) => {
    const currentTrainers = form.getValues('trainers');
    if (currentTrainers.length > 1) {
      form.setValue(
        'trainers', 
        currentTrainers.filter((_, i) => i !== index)
      );
    }
  };

  if (!opportunity && !existingBid) {
    return (
      <DashboardLayout 
        userType={userData.userType as any}
        userName={userData.name}
        userAvatar={userData.avatar}
      >
        <div className="space-y-6">
          <Button variant="ghost" className="pl-0" onClick={() => navigate('/dashboard/ehs-training-bids')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Opportunities
          </Button>
          
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">No training opportunity found. Please select a valid training.</p>
              <Button className="mt-4" onClick={() => navigate('/dashboard/ehs-training-bids')}>
                Browse Opportunities
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  const displayOpportunity = opportunity || { 
    title: existingBid?.trainingTitle || '',
    startDate: existingBid?.trainingDate || new Date(),
    endDate: existingBid?.trainingDate || new Date(),
    location: 'Not available',
    format: 'Not available',
    attendees: 0,
    budget: 'Not available',
    category: 'Not available',
    description: 'Not available'
  };

  return (
    <DashboardLayout 
      userType={userData.userType as any}
      userName={userData.name}
      userAvatar={userData.avatar}
    >
      <div className="space-y-6">
        <div>
          <Button variant="ghost" className="pl-0" onClick={() => navigate('/dashboard/ehs-training-bids')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Opportunities
          </Button>
          
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2 mt-2">
            <GraduationCap className="h-8 w-8" />
            {isViewMode ? 'Proposal Details' : 'Submit Training Proposal'}
          </h2>
          
          <p className="text-muted-foreground">
            {isViewMode 
              ? `Review your proposal for ${displayOpportunity.title}`
              : `Create a proposal for ${displayOpportunity.title}`
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{displayOpportunity.title}</CardTitle>
                <CardDescription>
                  {displayOpportunity.category} training opportunity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Date</p>
                        <p className="text-muted-foreground">
                          {format(displayOpportunity.startDate, 'MMMM d, yyyy')}
                          {displayOpportunity.startDate.getTime() !== displayOpportunity.endDate.getTime() && 
                            ` - ${format(displayOpportunity.endDate, 'MMMM d, yyyy')}`}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-muted-foreground">
                          {displayOpportunity.location}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Attendees</p>
                        <p className="text-muted-foreground">
                          {displayOpportunity.attendees} participants
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Budget Range</p>
                        <p className="text-muted-foreground">
                          ${displayOpportunity.budget}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-muted-foreground">
                    {displayOpportunity.description}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium">Format</h3>
                  <Badge 
                    className="mt-1"
                    variant={
                      displayOpportunity.format === 'In-Person' ? 'default' : 
                      displayOpportunity.format === 'Online' ? 'secondary' : 'outline'
                    }
                  >
                    {displayOpportunity.format}
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Financial Proposal</CardTitle>
                    <CardDescription>
                      Provide the cost breakdown for this training
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="contentFee"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Content Fee ($)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="0.00" 
                                {...field} 
                                disabled={isViewMode} 
                              />
                            </FormControl>
                            <FormDescription>
                              Cost for training materials
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="trainingFee"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Training Fee ($)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="0.00" 
                                {...field} 
                                disabled={isViewMode}
                              />
                            </FormControl>
                            <FormDescription>
                              Cost for trainer time
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="travelFee"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Travel & Stay ($)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="0.00" 
                                {...field} 
                                disabled={isViewMode}
                              />
                            </FormControl>
                            <FormDescription>
                              Travel expenses if applicable
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="bg-muted p-4 rounded-md">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Total Proposal Value</span>
                        <span className="text-xl font-bold">${totalFee.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Notes</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Provide any additional information about your proposal..." 
                              className="min-h-[100px]" 
                              {...field} 
                              disabled={isViewMode}
                            />
                          </FormControl>
                          <FormDescription>
                            Include any specifics about your approach or methodology
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Trainer Information</CardTitle>
                        <CardDescription>
                          Provide details about the trainers who will conduct this training
                        </CardDescription>
                      </div>
                      {!isViewMode && (
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm" 
                          onClick={addTrainer}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Trainer
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {form.getValues('trainers')?.map((_, index) => (
                      <div key={index} className="p-4 border rounded-md relative">
                        {!isViewMode && form.getValues('trainers').length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => removeTrainer(index)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        )}
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`trainers.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Trainer Name</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Full name" 
                                    {...field} 
                                    disabled={isViewMode}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name={`trainers.${index}.resume`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Resume</FormLabel>
                                <div className="flex items-center gap-2">
                                  {isViewMode && field.value ? (
                                    <>
                                      <FileText className="h-4 w-4 text-muted-foreground" />
                                      <span>{field.value}</span>
                                      <Button variant="ghost" size="sm" className="ml-auto">
                                        <Download className="h-4 w-4" />
                                      </Button>
                                    </>
                                  ) : (
                                    <div className="flex w-full items-center gap-2">
                                      <Input
                                        type="file"
                                        disabled={isViewMode}
                                        className="w-full"
                                        onChange={(e) => {
                                          // In a real app, you would handle file upload
                                          const fileName = e.target.files?.[0]?.name || '';
                                          field.onChange(fileName);
                                        }}
                                      />
                                    </div>
                                  )}
                                </div>
                                <FormDescription>
                                  Upload trainer's resume (PDF format preferred)
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  
                  {!isViewMode && (
                    <CardFooter className="flex justify-end space-x-2 pt-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => navigate('/dashboard/ehs-training-bids')}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Submit Proposal</Button>
                    </CardFooter>
                  )}
                </Card>
              </form>
            </Form>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Proposal Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isViewMode ? (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Status</span>
                      <Badge 
                        variant={
                          existingBid?.status === 'accepted' ? 'default' :
                          existingBid?.status === 'rejected' ? 'destructive' :
                          'outline'
                        }
                      >
                        {existingBid?.status?.charAt(0).toUpperCase()}{existingBid?.status?.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Submitted</span>
                      <span>{format(existingBid?.submittedDate || new Date(), 'MMM d, yyyy')}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <p className="font-medium">Proposal Value</p>
                      <div className="bg-muted p-4 rounded-md">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Total</span>
                          <span className="text-xl font-bold">${existingBid?.proposal.totalFee}</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-muted-foreground text-sm">
                      <p className="mb-2">Before submitting your proposal:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Ensure all costs are accurate and competitive</li>
                        <li>Provide details about your trainers' expertise</li>
                        <li>Include any relevant certifications</li>
                        <li>Be specific about what's included in your fees</li>
                      </ul>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <p className="font-medium">Proposal Value</p>
                      <div className="bg-muted p-4 rounded-md">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Total</span>
                          <span className="text-xl font-bold">${totalFee.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Help & Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-muted-foreground text-sm">
                  <p className="mb-2">Resources for training vendors:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>View our <a href="#" className="text-primary hover:underline">vendor guidelines</a></li>
                    <li>Download our <a href="#" className="text-primary hover:underline">pricing template</a></li>
                    <li>Read <a href="#" className="text-primary hover:underline">FAQ for EHS trainers</a></li>
                    <li>Contact <a href="#" className="text-primary hover:underline">vendor support</a></li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TrainingProposals;
