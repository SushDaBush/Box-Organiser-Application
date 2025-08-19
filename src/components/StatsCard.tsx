
import { PackingStats } from '@/types';
import { Card } from '@/components/ui/card';
import { Package, Scale } from 'lucide-react';

interface StatsCardProps {
  stats: PackingStats;
}

export const StatsCard = ({ stats }: StatsCardProps) => {
  return (
    <Card className="p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Boxes</p>
              <p className="text-2xl font-semibold">{stats.totalBoxes}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="p-2 bg-secondary rounded-lg">
            <Scale className="h-5 w-5 text-secondary-foreground" />
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Weight</p>
            <p className="text-2xl font-semibold">{stats.totalWeight} kg</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
