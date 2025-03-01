import { create } from 'zustand';
import { TMatch } from '../types/matches';

interface MatchStore {
  matches: TMatch[];
  setMatches: (matches: TMatch[]) => void;
}

export const useMatchStore = create<MatchStore>((set) => ({
  matches: [],
  setMatches: (matches) => set({ matches }),
}));
