import { useState, useEffect } from 'react';
import { BoxItem } from '@/types';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ItemModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (item: Omit<BoxItem, 'id'>) => void;
  item?: BoxItem | null;
  title: string;
}

export const ItemModal = ({ open, onClose, onSave, item, title }: ItemModalProps) => {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');

  useEffect(() => {
    if (item) {
      setName(item.name);
      setWeight(item.weight.toString());
    } else {
      setName('');
      setWeight('');
    }
  }, [item, open]);

  const handleSave = () => {
    if (name.trim() && weight.trim() && !isNaN(Number(weight))) {
      onSave({
        name: name.trim(),
        weight: Number(weight)
      });
      onClose();
    }
  };

  const handleClose = () => {
    setName('');
    setWeight('');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="item-name">Item Name</Label>
            <Input
              id="item-name"
              placeholder="Enter item name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="item-weight">Weight (kg)</Label>
            <Input
              id="item-weight"
              type="number"
              step="0.1"
              min="0"
              placeholder="0.0"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!name.trim() || !weight.trim() || isNaN(Number(weight))}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};