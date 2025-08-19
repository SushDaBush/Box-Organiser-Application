
import { Box } from '@/types';
import { Card } from '@/components/ui/card';
import { MapPin, Package } from 'lucide-react';

interface BoxCardProps {
  box: Box;
  onClick?: () => void;
}

export const BoxCard = ({ box, onClick }: BoxCardProps) => {
  const weightPercentage = (box.totalWeight / 30) * 100;
  const isOverweight = box.totalWeight > 30;

  return (
    <Card 
      className="p-4 shadow-soft hover:shadow-soft-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-medium">{box.name}</h3>
          </div>
          <span className={`text-sm font-medium ${isOverweight ? 'text-destructive' : 'text-foreground'}`}>
            {box.totalWeight} / 30 kg
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span>{box.room}</span>
        </div>

        <div className="progress-bar">
          <div 
            className={`progress-fill ${isOverweight ? 'bg-destructive' : 'bg-primary'}`}
            style={{ width: `${Math.min(weightPercentage, 100)}%` }}
          />
        </div>

        {isOverweight && (
          <p className="text-xs text-destructive font-medium">
            Exceeds 30kg limit by {box.totalWeight - 30}kg
          </p>
        )}
      </div>
    </Card>
  );
};
