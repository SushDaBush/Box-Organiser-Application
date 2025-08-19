
import { Box } from '@/types';
import { BoxCard } from './BoxCard';

interface RoomsViewProps {
  boxes: Box[];
  rooms: string[];
}

export const RoomsView = ({ boxes, rooms }: RoomsViewProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Boxes by Room</h2>
      {rooms.map((room) => {
        const roomBoxes = boxes.filter(box => box.room === room);
        if (roomBoxes.length === 0) return null;

        return (
          <div key={room} className="space-y-3">
            <h3 className="font-medium text-muted-foreground">
              {room} ({roomBoxes.length} boxes)
            </h3>
            <div className="space-y-3 pl-4">
              {roomBoxes.map((box) => (
                <BoxCard key={box.id} box={box} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
