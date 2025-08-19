import { Box, BoxItem } from '@/types';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetDescription 
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { MapPin, Package, Scale, Plus, Edit2, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ItemModal } from './ItemModal';
import { useState } from 'react';

interface BoxDetailsSheetProps {
  box: Box | null;
  open: boolean;
  onClose: () => void;
  onAddItem: (boxId: string, item: Omit<BoxItem, 'id'>) => void;
  onUpdateItem: (boxId: string, itemId: string, updates: Partial<BoxItem>) => void;
  onRemoveItem: (boxId: string, itemId: string) => void;
}

export const BoxDetailsSheet = ({ 
  box, 
  open, 
  onClose, 
  onAddItem, 
  onUpdateItem, 
  onRemoveItem 
}: BoxDetailsSheetProps) => {
  const [showItemModal, setShowItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState<BoxItem | null>(null);

  if (!box) return null;

  const isOverweight = box.totalWeight > 30;

  const handleAddItem = () => {
    setEditingItem(null);
    setShowItemModal(true);
  };

  const handleEditItem = (item: BoxItem) => {
    setEditingItem(item);
    setShowItemModal(true);
  };

  const handleSaveItem = (itemData: Omit<BoxItem, 'id'>) => {
    if (editingItem) {
      onUpdateItem(box.id, editingItem.id, itemData);
    } else {
      onAddItem(box.id, itemData);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    onRemoveItem(box.id, itemId);
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="pb-6">
          <SheetTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            {box.name}
          </SheetTitle>
          <SheetDescription className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {box.room}
            </div>
            <div className={`flex items-center gap-1 font-medium ${isOverweight ? 'text-destructive' : 'text-foreground'}`}>
              <Scale className="h-3 w-3" />
              {box.totalWeight} / 30 kg
            </div>
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4">
          {/* Weight Progress */}
          <Card className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Weight Progress</span>
                <span className={isOverweight ? 'text-destructive font-medium' : 'text-foreground'}>
                  {Math.round((box.totalWeight / 30) * 100)}%
                </span>
              </div>
              <div className="progress-bar">
                <div 
                  className={`progress-fill ${isOverweight ? 'bg-destructive' : 'bg-primary'}`}
                  style={{ width: `${Math.min((box.totalWeight / 30) * 100, 100)}%` }}
                />
              </div>
              {isOverweight && (
                <p className="text-xs text-destructive font-medium">
                  Exceeds 30kg limit by {box.totalWeight - 30}kg
                </p>
              )}
            </div>
          </Card>

          {/* Items List */}
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Items ({box.items.length})</h3>
            {box.items.length === 0 ? (
              <Card className="p-4 text-center">
                <p className="text-muted-foreground text-sm">No items added yet</p>
              </Card>
            ) : (
              <div className="space-y-2">
                {box.items.map((item) => (
                  <Card key={item.id} className="p-3">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-sm text-muted-foreground ml-2">{item.weight} kg</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleEditItem(item)}
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
          {/* Add Item Button */}
          <Button 
            onClick={handleAddItem}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>

        {/* Item Modal */}
        <ItemModal
          open={showItemModal}
          onClose={() => setShowItemModal(false)}
          onSave={handleSaveItem}
          item={editingItem}
          title={editingItem ? 'Edit Item' : 'Add Item'}
        />
      </SheetContent>
    </Sheet>
  );
};