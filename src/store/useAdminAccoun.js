//useAdminAccount.js

import { create } from 'zustand';

export const useAdminAccount = create((set) => ({
  adminAccount: false,
  setAdminAccount: (adminAccount) => set({ adminAccount }),
}));
