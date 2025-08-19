
import { Box } from '@/types';
import { BoxCard } from './BoxCard';

interface BoxesViewProps {
  boxes: Box[];
}

export const BoxesView = ({ boxes }: BoxesViewProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">All Boxes ({boxes.length})</h2>
      <div className="space-y-3">
        {boxes.map((box) => (
          <BoxCard key={box.id} box={box} />
        ))}
      </div>
    </div>
  );
};
