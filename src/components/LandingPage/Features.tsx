
import React from 'react';
import { 
  BarChart2, 
  FileText, 
  Users, 
  Zap, 
  ShieldCheck, 
  TrendingUp,
  Activity,
  Building,
  Briefcase,
  Award,
  Target,
  Clock
} from 'lucide-react';

const features = [
  {
    icon: <FileText className="h-10 w-10 text-forest-500" />,
    title: "ESG Reporting",
    description: "Streamline your environmental, social, and governance reporting with automated data collection and customizable templates."
  },
  {
    icon: <BarChart2 className="h-10 w-10 text-forest-500" />,
    title: "Net Zero Tracking",
    description: "Monitor your carbon footprint and track progress toward net zero goals with detailed analytics and actionable insights."
  },
  {
    icon: <Target className="h-10 w-10 text-forest-500" />,
    title: "SDG Alignment",
    description: "Map your business activities to the UN Sustainable Development Goals and measure your contribution to global priorities."
  },
  {
    icon: <Award className="h-10 w-10 text-forest-500" />,
    title: "CSR Impact Assessment",
    description: "Measure and communicate the social impact of your corporate social responsibility initiatives with quantifiable metrics."
  },
  {
    icon: <Users className="h-10 w-10 text-forest-500" />,
    title: "Stakeholder Engagement",
    description: "Collaborate with employees, partners, suppliers, and investors through dedicated portals with role-based access."
  },
  {
    icon: <Zap className="h-10 w-10 text-forest-500" />,
    title: "Workflow Automation",
    description: "Automate sustainability processes with customizable workflows that reduce manual effort and ensure consistency."
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-forest-500" />,
    title: "Compliance Management",
    description: "Stay ahead of regulatory requirements with built-in compliance tools and automatic updates for changing regulations."
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-forest-500" />,
    title: "Performance Benchmarking",
    description: "Compare your sustainability performance against industry peers and identify opportunities for improvement."
  }
];

const userRoles = [
  {
    icon: <Building className="h-6 w-6" />,
    title: "Enterprise Users",
    description: "Comprehensive dashboard for corporate sustainability management and reporting."
  },
  {
    icon: <Briefcase className="h-6 w-6" />,
    title: "Investors",
    description: "Detailed ESG performance metrics and sustainability investment analytics."
  },
  {
    icon: <Activity className="h-6 w-6" />,
    title: "Suppliers",
    description: "Tools to track and report sustainability metrics in the supply chain."
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Partners",
    description: "Collaborative features for joint sustainability initiatives and shared goals."
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Employees",
    description: "Engagement tools for participation in corporate sustainability programs."
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-20 bg-muted/50" id="features">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Comprehensive Sustainability Management
          </h2>
          <p className="text-lg text-muted-foreground">
            Our platform offers all the tools you need to manage, measure, and report on your organization's sustainability performance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-background rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Tailored for Every Stakeholder
            </h2>
            <p className="text-lg text-muted-foreground">
              EcoFlow Compass provides specialized interfaces and tools for each user type in your sustainability ecosystem.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {userRoles.map((role, index) => (
              <div 
                key={index}
                className="bg-background rounded-xl p-6 shadow-sm border text-center hover:border-forest-500 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-forest-500/10 text-forest-500 mb-4">
                  {role.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{role.title}</h3>
                <p className="text-sm text-muted-foreground">{role.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
