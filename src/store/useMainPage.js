import { create } from 'zustand';

export const useMainPage = create((set) => ({
  mainPage: 'main',
  setPages: (value) => set({ mainPage: value }),
}));
