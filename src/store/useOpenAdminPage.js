import { create } from "zustand";

export const useOpenAdminPage = create((set) => ({
openAdminPage: false,
setOpenAdminPage: (openAdminPage)=>set({openAdminPage}),
}))
