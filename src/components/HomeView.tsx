
import { PackingStats, Box } from '@/types';
import { StatsCard } from './StatsCard';
import { BoxCard } from './BoxCard';

interface HomeViewProps {
  stats: PackingStats;
  boxes: Box[];
}

export const HomeView = ({ stats, boxes }: HomeViewProps) => {
  return (
    <div className="space-y-6">
      <StatsCard stats={stats} />
      
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Recent Boxes</h2>
        <div className="space-y-3">
          {boxes.slice(0, 5).map((box) => (
            <BoxCard key={box.id} box={box} />
          ))}
        </div>
      </div>
    </div>
  );
};
