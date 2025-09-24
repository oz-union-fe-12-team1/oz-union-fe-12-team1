import { create } from 'zustand';
import { getMyProfile } from '../api/users';
import { queryClient } from '@tanstack/react-query';

export const useUser = create((set) => ({
  user: null,
  isLoding: false,

  setUser: (user) => set({ user }),

  getUser: async () => {
    try {
      const userProfile = await queryClient.fetchQuery({
        queryKey: ['myProfile'],
        queryFn: getMyProfile,
      });
      set({ user: userProfile, isLoding: true });
    } catch (error) {
      set({ user: null, isLoding: false });
    }
  },

  clearUser: () => set({ user: null }),
}));
