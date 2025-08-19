
import { Box } from '@/types';
import { BoxCard } from './BoxCard';

interface BoxesViewProps {
  boxes: Box[];
  onBoxClick: (box: Box) => void;
}

export const BoxesView = ({ boxes, onBoxClick }: BoxesViewProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">All Boxes ({boxes.length})</h2>
      <div className="space-y-3">
        {boxes.map((box) => (
          <BoxCard key={box.id} box={box} onClick={() => onBoxClick(box)} />
        ))}
      </div>
    </div>
  );
};
