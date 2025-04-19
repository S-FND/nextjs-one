
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { TrainingItem } from './TrainingItem';

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

interface TrainingListProps {
  trainings: Training[];
  searchQuery: string;
  onStatusUpdate: (trainingId: string, newStatus: 'accepted' | 'rejected') => void;
  onSchedule: (training: Training) => void;
}

export const TrainingList = ({ 
  trainings, 
  searchQuery, 
  onStatusUpdate,
  onSchedule 
}: TrainingListProps) => {
  const filteredTrainings = trainings.filter(training => {
    return training.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           training.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Training</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Format</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredTrainings.map((training) => (
          <TrainingItem
            key={training.id}
            training={training}
            onStatusUpdate={onStatusUpdate}
            onSchedule={onSchedule}
          />
        ))}
        {filteredTrainings.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
              No trainings found. Try adjusting your search.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
