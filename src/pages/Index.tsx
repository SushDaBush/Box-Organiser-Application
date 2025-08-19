
import { useState } from 'react';
import { NavigationTab, Box } from '@/types';
import { usePackingData } from '@/hooks/usePackingData';
import { BottomNavigation } from '@/components/BottomNavigation';
import { FloatingAddButton } from '@/components/FloatingAddButton';
import { AddBoxModal } from '@/components/AddBoxModal';
import { BoxDetailsSheet } from '@/components/BoxDetailsSheet';
import { HomeView } from '@/components/HomeView';
import { BoxesView } from '@/components/BoxesView';
import { RoomsView } from '@/components/RoomsView';
import { ThemeToggle } from '@/components/ThemeToggle';

const Index = () => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBox, setSelectedBox] = useState<Box | null>(null);
  const { boxes, stats, addBox, getAllRooms } = usePackingData();

  const handleBoxClick = (box: Box) => {
    setSelectedBox(box);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView stats={stats} boxes={boxes} onBoxClick={handleBoxClick} />;
      case 'boxes':
        return <BoxesView boxes={boxes} onBoxClick={handleBoxClick} />;
      case 'rooms':
        return <RoomsView boxes={boxes} rooms={getAllRooms()} onBoxClick={handleBoxClick} />;
      default:
        return <HomeView stats={stats} boxes={boxes} onBoxClick={handleBoxClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto relative">
        {/* Header */}
        <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border z-10">
          <div className="p-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Packing Organizer</h1>
            <ThemeToggle />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 pb-24 animate-fade-in">
          {renderContent()}
        </div>

        {/* Floating Add Button */}
        <FloatingAddButton onClick={() => setShowAddModal(true)} />

        {/* Bottom Navigation */}
        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Add Box Modal */}
        <AddBoxModal
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdd={addBox}
          rooms={getAllRooms()}
        />

        {/* Box Details Sheet */}
        <BoxDetailsSheet
          box={selectedBox}
          open={selectedBox !== null}
          onClose={() => setSelectedBox(null)}
        />
      </div>
    </div>
  );
};

export default Index;
