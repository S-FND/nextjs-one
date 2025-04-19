import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import LoginForm from "./components/auth/LoginForm";
import EHSTrainings from "./pages/EHSTrainings";
import TrainingCalendar from "./pages/TrainingCalendar";
import TrainingDetails from "./pages/TrainingDetails";
import TrainingVendors from "./pages/TrainingVendors";
import EHSTrainingBids from "./pages/EHSTrainingBids";
import AssignedTrainings from "./pages/AssignedTrainings";
import TrainingProposals from "./pages/TrainingProposals";
import VendorRegistration from "./pages/VendorRegistration";
import MyTrainings from "./pages/MyTrainings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/vendor-register" element={<VendorRegistration />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/ehs-trainings" element={<EHSTrainings />} />
          <Route path="/dashboard/training-calendar" element={<TrainingCalendar />} />
          <Route path="/dashboard/training-details/:id" element={<TrainingDetails />} />
          <Route path="/dashboard/training-vendors" element={<TrainingVendors />} />
          <Route path="/dashboard/ehs-training-bids" element={<EHSTrainingBids />} />
          <Route path="/dashboard/assigned-trainings" element={<AssignedTrainings />} />
          <Route path="/dashboard/training-proposals" element={<TrainingProposals />} />
          <Route path="/dashboard/my-trainings" element={<MyTrainings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
