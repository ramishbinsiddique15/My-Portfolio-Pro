import { create } from 'zustand';

export const useUIStore = create((set) => ({
  isAppLoaded: false,
  setAppLoaded: (status) => set({ isAppLoaded: status }),
}));