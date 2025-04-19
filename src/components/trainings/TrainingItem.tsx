
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { Check, X, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';

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

interface TrainingItemProps {
  training: Training;
  onStatusUpdate: (trainingId: string, newStatus: 'accepted' | 'rejected') => void;
  onSchedule: (training: Training) => void;
}

export const TrainingItem = ({ training, onStatusUpdate, onSchedule }: TrainingItemProps) => {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <div>
          {training.title}
          <p className="text-sm text-muted-foreground truncate max-w-md">
            {training.description}
          </p>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline">
          {training.category}
        </Badge>
      </TableCell>
      <TableCell>{training.duration}</TableCell>
      <TableCell>
        <Badge variant={training.format === 'In-Person' ? 'default' : 'secondary'}>
          {training.format}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge 
          variant={training.status === 'pending' ? 'outline' : 
                  training.status === 'accepted' ? 'default' : 'destructive'}
        >
          {training.status.charAt(0).toUpperCase() + training.status.slice(1)}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          {training.status === 'pending' ? (
            <>
              <Button
                variant="outline"
                size="sm"
                className="text-green-600"
                onClick={() => onStatusUpdate(training.id, 'accepted')}
              >
                <Check className="h-4 w-4 mr-1" />
                Accept
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-red-600"
                onClick={() => onStatusUpdate(training.id, 'rejected')}
              >
                <X className="h-4 w-4 mr-1" />
                Reject
              </Button>
            </>
          ) : training.status === 'accepted' && !training.scheduledDate ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSchedule(training)}
            >
              <CalendarIcon className="h-4 w-4 mr-1" />
              Schedule
            </Button>
          ) : (
            <Badge variant="outline" className="gap-2">
              <Clock className="h-4 w-4" />
              {format(training.scheduledDate!, 'PPP')}
            </Badge>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};
