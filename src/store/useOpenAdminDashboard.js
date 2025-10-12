import { create } from "zustand";

export const useOpenAdminDashboard = create((set) => ({
openAdminDashboard: false,
setOpenAdminDashboard: (openAdminDashboard)=>set({openAdminDashboard}),
}))
