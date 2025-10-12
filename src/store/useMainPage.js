import { create } from 'zustand';

export const useMainPage = create((set) => ({
  pageMode: 'main',
  setPageMode: (value) => set({ pageMode: value }),
}));
