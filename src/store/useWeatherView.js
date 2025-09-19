import { create } from 'zustand';

export const useWeatherView = create((set) => ({
  view: 'today', // 기본값: 메인에는 아무것도 안 뜸
  setView: (view) => set({ view }),
}));
