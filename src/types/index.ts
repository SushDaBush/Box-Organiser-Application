
export interface BoxItem {
  id: string;
  name: string;
  weight: number;
}

export interface Box {
  id: string;
  name: string;
  room: string;
  items: BoxItem[];
  totalWeight: number;
}

export interface PackingStats {
  totalBoxes: number;
  totalWeight: number;
}

export type NavigationTab = 'home' | 'boxes' | 'rooms';
