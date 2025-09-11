import { create } from "zustand";

export const useStore = create((set) => ({
mode: '',
setMode: (mode)=>set({mode}),
}))