import { create } from "zustand";

export const useTodo = create((set) => ({
  list: [],
  form: { title: "", memo: "" },
  isEditing: false,
  editingId: null,

  setForm: (form) => set({ form }),

  addTodo: () =>
    set((state) => {
      if (!state.form.title.trim()) return state;

      if (state.isEditing && state.editingId !== null) {
        return {
          list: state.list.map((item) =>
            item.id === state.editingId ? { ...item, ...state.form } : item
          ),
          form: { title: "", memo: "" },
          isEditing: false,
          editingId: null,
        };
      }

      const newTodo = { id: Date.now(), ...state.form, completed: false };
      return {
        list: [...state.list, newTodo],
        form: { title: "", memo: "" },
      };
    }),

  deleteTodo: (id) =>
    set((state) => ({
      list: state.list.filter((item) => item.id !== id),
      ...(state.editingId === id
        ? { isEditing: false, editingId: null, form: { title: "", memo: "" } }
        : {}),
    })),

  toggleTodo: (id) =>
    set((state) => ({
      list: state.list.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      ),
    })),

  startEdit: (item) =>
    set({
      form: { title: item.title, memo: item.memo || "" },
      isEditing: true,
      editingId: item.id,
    }),

  cancelEdit: () =>
    set({ isEditing: false, editingId: null, form: { title: "", memo: "" } }),
}));
