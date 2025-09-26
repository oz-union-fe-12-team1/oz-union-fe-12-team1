import { create } from "zustand";

export const useSchedule = create((set) => ({
  list: [],
  form: { date: "", time: "", title: "", memo: "" },
  isEditing: false,
  editingId: null,

  setForm: (form) => set({ form }),

  addSchedule: () =>
    set((state) => {
      if (!state.form.title.trim()) return state;

      if (state.isEditing && state.editingId !== null) {
        return {
          list: state.list.map((item) =>
            item.id === state.editingId ? { ...item, ...state.form } : item
          ),
          form: { date: "", time: "", title: "", memo: "" },
          isEditing: false,
          editingId: null,
        };
      }

      const newSchedule = { id: Date.now(), ...state.form };
      return {
        list: [...state.list, newSchedule],
        form: { date: "", time: "", title: "", memo: "" },
      };
    }),

  deleteSchedule: (id) =>
    set((state) => ({
      list: state.list.filter((item) => item.id !== id),
    })),

  startEdit: (item) =>
    set({
      form: {
        date: item.date,
        time: item.time,
        title: item.title,
        memo: item.memo || "",
      },
      isEditing: true,
      editingId: item.id,
    }),

  cancelEdit: () =>
    set({
      isEditing: false,
      editingId: null,
      form: { date: "", time: "", title: "", memo: "" },
    }),
}));
