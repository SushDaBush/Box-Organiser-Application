import { Box } from '@/types';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetDescription 
} from '@/components/ui/sheet';
import { MapPin, Package, Scale } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface BoxDetailsSheetProps {
  box: Box | null;
  open: boolean;
  onClose: () => void;
}

export const BoxDetailsSheet = ({ box, open, onClose }: BoxDetailsSheetProps) => {
  if (!box) return null;

  const isOverweight = box.totalWeight > 30;

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
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-muted-foreground">{item.weight} kg</span>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};