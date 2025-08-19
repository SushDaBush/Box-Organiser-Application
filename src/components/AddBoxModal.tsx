
import { useState } from 'react';
import { Box, BoxItem } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';

interface AddBoxModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (box: Omit<Box, 'id'>) => void;
  rooms: string[];
}

const defaultRooms = ['Living Room', 'Kitchen', 'Bedroom', 'Bathroom', 'Office', 'Storage'];

export const AddBoxModal = ({ open, onClose, onAdd, rooms }: AddBoxModalProps) => {
  const [boxName, setBoxName] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [items, setItems] = useState<Omit<BoxItem, 'id'>[]>([{ name: '', weight: 0 }]);

  const allRooms = [...new Set([...defaultRooms, ...rooms])];
  const totalWeight = items.reduce((sum, item) => sum + (item.weight || 0), 0);
  const isOverweight = totalWeight > 30;

  const addItem = () => {
    setItems([...items, { name: '', weight: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: 'name' | 'weight', value: string | number) => {
    setItems(items.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const handleSubmit = () => {
    if (!boxName || !selectedRoom) return;

    const validItems = items
      .filter(item => item.name && item.weight > 0)
      .map(item => ({ ...item, id: Date.now().toString() + Math.random() }));

    onAdd({
      name: boxName,
      room: selectedRoom,
      items: validItems,
      totalWeight
    });

    // Reset form
    setBoxName('');
    setSelectedRoom('');
    setItems([{ name: '', weight: 0 }]);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Box</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="box-name">Box Name</Label>
            <Input
              id="box-name"
              value={boxName}
              onChange={(e) => setBoxName(e.target.value)}
              placeholder="Enter box name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="room">Assigned Room</Label>
            <Select value={selectedRoom} onValueChange={setSelectedRoom}>
              <SelectTrigger>
                <SelectValue placeholder="Select room" />
              </SelectTrigger>
              <SelectContent>
                {allRooms.map((room) => (
                  <SelectItem key={room} value={room}>{room}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Items</Label>
              <div className={`text-sm font-medium px-2 py-1 rounded ${
                isOverweight ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'
              }`}>
                Total: {totalWeight} kg
                {isOverweight && ' (Over limit!)'}
              </div>
            </div>

            {items.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="Item name"
                  value={item.name}
                  onChange={(e) => updateItem(index, 'name', e.target.value)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder="Weight"
                  value={item.weight || ''}
                  onChange={(e) => updateItem(index, 'weight', parseFloat(e.target.value) || 0)}
                  className="w-24"
                  step="0.1"
                  min="0"
                />
                {items.length > 1 && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeItem(index)}
                    className="shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}

            <Button
              variant="outline"
              onClick={addItem}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={!boxName || !selectedRoom}
              className="flex-1"
            >
              Add Box
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
