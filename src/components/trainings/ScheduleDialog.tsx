
import React from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface Training {
  id: string;
  title: string;
  category: string;
  duration: string;
  format: string;
  status: string;
  description: string;
  locations: string[];
  scheduledDate?: Date;
}

interface Employee {
  id: string;
  name: string;
  department: string;
}

interface ScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTraining: Training | null;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  selectedFormat: string | undefined;
  setSelectedFormat: (format: string) => void;
  selectedLocation: string | undefined;
  setSelectedLocation: (location: string) => void;
  selectedEmployees: string[];
  setSelectedEmployees: (employees: string[]) => void;
  employees: Employee[];
  onSchedule: () => void;
}

export const ScheduleDialog = ({
  open,
  onOpenChange,
  selectedTraining,
  selectedDate,
  setSelectedDate,
  selectedFormat,
  setSelectedFormat,
  selectedLocation,
  setSelectedLocation,
  selectedEmployees,
  setSelectedEmployees,
  employees,
  onSchedule,
}: ScheduleDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule Training</DialogTitle>
          <DialogDescription>
            Set up the training schedule and assign employees
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${
                    !selectedDate && "text-muted-foreground"
                  }`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    format(selectedDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="grid gap-2">
            <Label>Format</Label>
            <Select onValueChange={setSelectedFormat}>
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Location</Label>
            <Select onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {selectedTraining?.locations.map((loc: string) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Assign Employees</Label>
            <Select 
              onValueChange={(value) => 
                setSelectedEmployees(prev => 
                  prev.includes(value) 
                    ? prev.filter(v => v !== value)
                    : [...prev, value]
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select employees" />
              </SelectTrigger>
              <SelectContent>
                {employees.map(employee => (
                  <SelectItem key={employee.id} value={employee.id}>
                    {employee.name} - {employee.department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedEmployees.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedEmployees.map(empId => {
                  const emp = employees.find(e => e.id === empId);
                  return (
                    <Badge key={empId} variant="secondary">
                      {emp?.name}
                      <button
                        className="ml-1 hover:text-destructive"
                        onClick={() => setSelectedEmployees(prev => 
                          prev.filter(id => id !== empId)
                        )}
                      >
                        ×
                      </button>
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSchedule}>
            Schedule Training
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
