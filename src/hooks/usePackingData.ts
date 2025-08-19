
import { useState, useMemo } from 'react';
import { Box, BoxItem, PackingStats } from '@/types';

export const usePackingData = () => {
  const [boxes, setBoxes] = useState<Box[]>([
    {
      id: '1',
      name: 'Living Room Electronics',
      room: 'Living Room',
      items: [
        { id: '1', name: 'TV', weight: 15 },
        { id: '2', name: 'Sound System', weight: 8 }
      ],
      totalWeight: 23
    },
    {
      id: '2',
      name: 'Kitchen Essentials',
      room: 'Kitchen',
      items: [
        { id: '3', name: 'Dishes Set', weight: 12 },
        { id: '4', name: 'Small Appliances', weight: 18 }
      ],
      totalWeight: 30
    }
  ]);

  const stats: PackingStats = useMemo(() => ({
    totalBoxes: boxes.length,
    totalWeight: boxes.reduce((sum, box) => sum + box.totalWeight, 0)
  }), [boxes]);

  const addBox = (box: Omit<Box, 'id'>) => {
    const newBox: Box = {
      ...box,
      id: Date.now().toString()
    };
    setBoxes(prev => [...prev, newBox]);
  };

  const updateBox = (boxId: string, updates: Partial<Box>) => {
    setBoxes(prev => prev.map(box => 
      box.id === boxId ? { ...box, ...updates } : box
    ));
  };

  const deleteBox = (boxId: string) => {
    setBoxes(prev => prev.filter(box => box.id !== boxId));
  };

  const getBoxesByRoom = (room: string) => {
    return boxes.filter(box => box.room === room);
  };

  const getAllRooms = () => {
    const rooms = Array.from(new Set(boxes.map(box => box.room)));
    return rooms.sort();
  };

  const addItem = (boxId: string, item: Omit<BoxItem, 'id'>) => {
    const newItem: BoxItem = {
      ...item,
      id: Date.now().toString()
    };
    
    setBoxes(prev => prev.map(box => {
      if (box.id === boxId) {
        const updatedItems = [...box.items, newItem];
        const totalWeight = updatedItems.reduce((sum, item) => sum + item.weight, 0);
        return { ...box, items: updatedItems, totalWeight };
      }
      return box;
    }));
  };

  const updateItem = (boxId: string, itemId: string, updates: Partial<BoxItem>) => {
    setBoxes(prev => prev.map(box => {
      if (box.id === boxId) {
        const updatedItems = box.items.map(item => 
          item.id === itemId ? { ...item, ...updates } : item
        );
        const totalWeight = updatedItems.reduce((sum, item) => sum + item.weight, 0);
        return { ...box, items: updatedItems, totalWeight };
      }
      return box;
    }));
  };

  const removeItem = (boxId: string, itemId: string) => {
    setBoxes(prev => prev.map(box => {
      if (box.id === boxId) {
        const updatedItems = box.items.filter(item => item.id !== itemId);
        const totalWeight = updatedItems.reduce((sum, item) => sum + item.weight, 0);
        return { ...box, items: updatedItems, totalWeight };
      }
      return box;
    }));
  };

  return {
    boxes,
    stats,
    addBox,
    updateBox,
    deleteBox,
    getBoxesByRoom,
    getAllRooms,
    addItem,
    updateItem,
    removeItem
  };
};
