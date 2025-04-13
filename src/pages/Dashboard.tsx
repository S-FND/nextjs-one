
import React from 'react';
import DashboardLayout from "@/components/dashboards/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart2,
  LineChart,
  PieChart,
  Globe,
  Activity,
  Users,
  Calendar,
  ArrowUp,
  ArrowDown,
  Target,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Dashboard: React.FC = () => {
  // This is just a mockup dashboard with placeholder data
  // In a real application, this would fetch data from an API
  
  // Mock user data - in a real app, this would come from authentication
  const userData = {
    name: "John Smith",
    userType: "enterprise",
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
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back, {userData.name}! Here's an overview of your sustainability metrics.
          </p>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="esg">ESG Metrics</TabsTrigger>
            <TabsTrigger value="sdg">SDG Progress</TabsTrigger>
            <TabsTrigger value="emissions">Emissions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    ESG Score
                  </CardTitle>
                  <BarChart2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78/100</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-forest-500 inline-flex items-center">
                      <ArrowUp className="mr-1 h-3 w-3" /> +5%
                    </span>{" "}
                    from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Carbon Emissions
                  </CardTitle>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">85.4 tons</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-forest-500 inline-flex items-center">
                      <ArrowDown className="mr-1 h-3 w-3" /> -12%
                    </span>{" "}
                    from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Water Usage
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">342m³</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-forest-500 inline-flex items-center">
                      <ArrowDown className="mr-1 h-3 w-3" /> -8%
                    </span>{" "}
                    from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Waste Reduction
                  </CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">58%</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-forest-500 inline-flex items-center">
                      <ArrowUp className="mr-1 h-3 w-3" /> +3%
                    </span>{" "}
                    from last quarter
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Sustainability Performance</CardTitle>
                  <CardDescription>
                    Monthly metrics across key sustainability indicators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-muted/50 rounded-md">
                    <LineChart className="h-16 w-16 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Chart visualization will appear here</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>SDG Alignment</CardTitle>
                  <CardDescription>
                    Your contribution to the UN Sustainable Development Goals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">SDG 7: Affordable and Clean Energy</span>
                        <span className="text-sm text-muted-foreground">72%</span>
                      </div>
                      <Progress value={72} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">SDG 12: Responsible Consumption</span>
                        <span className="text-sm text-muted-foreground">64%</span>
                      </div>
                      <Progress value={64} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">SDG 13: Climate Action</span>
                        <span className="text-sm text-muted-foreground">81%</span>
                      </div>
                      <Progress value={81} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">SDG 6: Clean Water and Sanitation</span>
                        <span className="text-sm text-muted-foreground">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Tasks</CardTitle>
                  <CardDescription>
                    Tasks requiring your attention
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">ESG Report Submission</p>
                        <p className="text-sm text-muted-foreground">Due in 7 days</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Quarterly Sustainability Review</p>
                        <p className="text-sm text-muted-foreground">Due in 14 days</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Carbon Offset Purchase Approval</p>
                        <p className="text-sm text-muted-foreground">Due in 3 days</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Team Activity</CardTitle>
                  <CardDescription>
                    Recent sustainability activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Water Conservation Team</p>
                        <p className="text-sm text-muted-foreground">Completed facility audit</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Energy Efficiency Group</p>
                        <p className="text-sm text-muted-foreground">Updated reduction targets</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Supply Chain Team</p>
                        <p className="text-sm text-muted-foreground">Added 3 new sustainable suppliers</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Alerts</CardTitle>
                  <CardDescription>
                    Important regulatory updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <p className="font-medium">EU CSRD Requirements</p>
                        <p className="text-sm text-muted-foreground">New disclosure standards published</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Carbon Pricing Update</p>
                        <p className="text-sm text-muted-foreground">Regional carbon tax changes announced</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-forest-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Emissions Report Approved</p>
                        <p className="text-sm text-muted-foreground">Annual submission validated</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="esg">
            <Card>
              <CardHeader>
                <CardTitle>ESG Metrics</CardTitle>
                <CardDescription>Detailed view of your ESG performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center bg-muted/50 rounded-md">
                  <PieChart className="h-16 w-16 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">ESG metrics will appear here</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sdg">
            <Card>
              <CardHeader>
                <CardTitle>SDG Progress</CardTitle>
                <CardDescription>Your contribution to the UN Sustainable Development Goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center bg-muted/50 rounded-md">
                  <Target className="h-16 w-16 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">SDG progress data will appear here</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="emissions">
            <Card>
              <CardHeader>
                <CardTitle>Emissions Analytics</CardTitle>
                <CardDescription>Detailed breakdown of your carbon emissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center bg-muted/50 rounded-md">
                  <Globe className="h-16 w-16 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Emissions data will appear here</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
