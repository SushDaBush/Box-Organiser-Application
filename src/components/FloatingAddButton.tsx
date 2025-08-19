
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FloatingAddButtonProps {
  onClick: () => void;
}

export const FloatingAddButton = ({ onClick }: FloatingAddButtonProps) => {
  return (
    <Button
      onClick={onClick}
      size="lg"
      className="fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-soft-lg hover:shadow-soft-md transition-all duration-200 hover:scale-105"
    >
      <Plus className="h-6 w-6" />
    </Button>
  );
};
