
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
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Plus, Search, Filter, Calendar, Copy } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for demonstration
const MOCK_TRAININGS = [
  {
    id: '1',
    title: 'Workplace Safety Fundamentals',
    category: 'Safety',
    duration: '2 days',
    format: 'In-Person',
    description: 'Essential workplace safety practices covering risk assessment, hazard identification, and emergency procedures.'
  },
  {
    id: '2',
    title: 'Environmental Compliance',
    category: 'Environment',
    duration: '1 day',
    format: 'Online',
    description: 'Overview of environmental regulations, waste management, and sustainable practices.'
  },
  {
    id: '3',
    title: 'Health Risk Management',
    category: 'Health',
    duration: '3 days',
    format: 'In-Person',
    description: 'Comprehensive health risk management training including occupational health hazards and preventive measures.'
  },
  {
    id: '4',
    title: 'ISO 14001 Implementation',
    category: 'Environment',
    duration: '4 days',
    format: 'Hybrid',
    description: 'Detailed implementation guide for ISO 14001 environmental management systems.'
  },
  {
    id: '5',
    title: 'Emergency Response Planning',
    category: 'Safety',
    duration: '1 day',
    format: 'Online',
    description: 'Preparation and implementation of emergency response procedures for various scenarios.'
  },
];

const EHSTrainings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  
  // Mock user data - in a real app, this would come from authentication
  const userData = {
    name: "John Smith",
    userType: "admin", // or "enterprise"
    avatar: undefined,
  };

  const filteredTrainings = MOCK_TRAININGS.filter(training => {
    const matchesSearch = training.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         training.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || training.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const onSubmit = (data: any) => {
    // In a real app, this would send data to an API
    console.log('New training data:', data);
    toast({
      title: "Training created",
      description: `${data.title} has been added to the catalog.`,
    });
    setDialogOpen(false);
    reset();
  };

  const duplicateTraining = (trainingId: string) => {
    // In a real app, this would duplicate the training in the database
    const training = MOCK_TRAININGS.find(t => t.id === trainingId);
    if (training) {
      toast({
        title: "Training duplicated",
        description: `${training.title} has been duplicated.`,
      });
    }
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
            Manage your environment, health, and safety training catalog.
          </p>
        </div>

        <Tabs defaultValue="catalog" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <TabsList>
              <TabsTrigger value="catalog">Training Catalog</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled Trainings</TabsTrigger>
            </TabsList>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="ml-auto">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Training
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <DialogHeader>
                    <DialogTitle>Add New EHS Training</DialogTitle>
                    <DialogDescription>
                      Create a new training to add to your catalog.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Title
                      </Label>
                      <Input
                        id="title"
                        className="col-span-3"
                        {...register('title', { required: true })}
                      />
                      {errors.title && <p className="text-destructive text-sm col-span-4 text-right">Title is required</p>}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="category" className="text-right">
                        Category
                      </Label>
                      <Select onValueChange={(value) => register('category').onChange({ target: { value } })}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Safety">Safety</SelectItem>
                          <SelectItem value="Health">Health</SelectItem>
                          <SelectItem value="Environment">Environment</SelectItem>
                          <SelectItem value="Compliance">Compliance</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="duration" className="text-right">
                        Duration
                      </Label>
                      <Input
                        id="duration"
                        className="col-span-3"
                        placeholder="e.g., 2 days, 4 hours"
                        {...register('duration', { required: true })}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="format" className="text-right">
                        Format
                      </Label>
                      <Select onValueChange={(value) => register('format').onChange({ target: { value } })}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select a format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="In-Person">In-Person</SelectItem>
                          <SelectItem value="Online">Online</SelectItem>
                          <SelectItem value="Hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        className="col-span-3"
                        {...register('description', { required: true })}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Create Training</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search trainings..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Safety">Safety</SelectItem>
                <SelectItem value="Health">Health</SelectItem>
                <SelectItem value="Environment">Environment</SelectItem>
                <SelectItem value="Compliance">Compliance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="catalog" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Training Catalog</CardTitle>
                <CardDescription>
                  {filteredTrainings.length} trainings available in your catalog
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
                          <Badge variant="outline" className="bg-muted">
                            {training.category}
                          </Badge>
                        </TableCell>
                        <TableCell>{training.duration}</TableCell>
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
                            <Button variant="outline" size="sm">
                              <Calendar className="mr-2 h-4 w-4" />
                              Schedule
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => duplicateTraining(training.id)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredTrainings.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                          No trainings found. Try adjusting your search or filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheduled" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Trainings</CardTitle>
                <CardDescription>
                  View all upcoming and past scheduled trainings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center py-8">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    View Training Calendar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default EHSTrainings;
