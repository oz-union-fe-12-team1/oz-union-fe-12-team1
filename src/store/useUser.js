import { create } from 'zustand';
import { getMyProfile } from '../api/users';
import { queryClient } from '../queryClient';

const myProfile = 'myProfile';

export const useUser = create((set) => ({
  user: null,
  isLoading: false,

  setUser: (user) => set({ user }),

  getUser: async () => {
    set({ isLoading: true });
    try {
      const userProfile = await queryClient.fetchQuery({
        queryKey: [myProfile],
        queryFn: getMyProfile,
      });
      set({ user: userProfile, isLoading: false });
    } catch (error) {
      console.error(error);
      set({ user: null, isLoading: true });
    }
  },

  clearUser: () => set({ user: null }),
}));
