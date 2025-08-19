
import { useState } from 'react';
import { NavigationTab } from '@/types';
import { usePackingData } from '@/hooks/usePackingData';
import { BottomNavigation } from '@/components/BottomNavigation';
import { FloatingAddButton } from '@/components/FloatingAddButton';
import { AddBoxModal } from '@/components/AddBoxModal';
import { HomeView } from '@/components/HomeView';
import { BoxesView } from '@/components/BoxesView';
import { RoomsView } from '@/components/RoomsView';
import { ThemeToggle } from '@/components/ThemeToggle';

const Index = () => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [showAddModal, setShowAddModal] = useState(false);
  const { boxes, stats, addBox, getAllRooms } = usePackingData();

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView stats={stats} boxes={boxes} />;
      case 'boxes':
        return <BoxesView boxes={boxes} />;
      case 'rooms':
        return <RoomsView boxes={boxes} rooms={getAllRooms()} />;
      default:
        return <HomeView stats={stats} boxes={boxes} />;
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
      </div>
    </div>
  );
};

export default Index;
