import { create } from "zustand";

const initialForm = {
  date: "",        // YYYY-MM-DD
  timeStart: "",   // HH:mm
  timeEnd: "",     // HH:mm
  all_day: false,  // 종일 여부
  title: "",
  memo: "",
};

const toISO = (d, t) => {
  const [Y, M, D] = (d || "").split("-").map(Number);
  const [h = 0, m = 0] = (t || "00:00").split(":").map(Number);
  const dt = new Date(Y, M - 1, D, h, m, 0);
  return dt.toISOString();
};

export const useSchedule = create((set, get) => ({
  list: [],
  form: { ...initialForm },
  isEditing: false,
  editingId: null,

  setForm: (patch) => set({ form: { ...get().form, ...patch } }),
  resetForm: () => set({ form: { ...initialForm } }),

  addSchedule: (payload) =>
    set((state) => {
      const src = payload || state.form;

      // 필수값
      if (!src.title?.trim() || !src.date) return state;

      // 시간 조합
      let start_time, end_time;
      if (src.all_day) {
        start_time = toISO(src.date, "00:00");
        end_time   = toISO(src.date, "23:59");
      } else {
        if (!src.timeStart || !src.timeEnd) return state;
        start_time = toISO(src.date, src.timeStart);
        end_time   = toISO(src.date, src.timeEnd);
        if (new Date(start_time) >= new Date(end_time)) return state;
      }

      const base = {
        title: src.title.trim(),
        memo: src.memo || "",
        all_day: !!src.all_day,
        start_time,
        end_time,
        date : src.date,
        timeStart: src.timeStart || "",
        timeEnd: src.timeEnd || "",
      };

      if (state.isEditing && state.editingId !== null) {
        return {
          list: state.list.map((it) =>
            it.id === state.editingId ? { ...it, ...base } : it
          ),
          form: { ...initialForm },
          isEditing: false,
          editingId: null,
        };
      }

      const newItem = { id: Date.now(), ...base };
      return {
        list: [...state.list, newItem],
        form: { ...initialForm },
      };
    }),

  deleteSchedule: (id) =>
    set((state) => ({
      list: state.list.filter((item) => item.id !== id),
    })),

  startEdit: (item) =>
    set(() => {
      const st = new Date(item.start_time);
      const et = new Date(item.end_time);
      const pad = (n) => String(n).padStart(2, "0");

      const date = `${st.getFullYear()}-${pad(st.getMonth() + 1)}-${pad(st.getDate())}`;
      const timeStart = `${pad(st.getHours())}:${pad(st.getMinutes())}`;
      const timeEnd   = `${pad(et.getHours())}:${pad(et.getMinutes())}`;

      return {
        form: {
          date,
          timeStart,	// 추가
          timeEnd,	// 추가
          all_day: !!item.all_day,	// 추가
          title: item.title,
          memo: item.memo ?? "",
        },
        isEditing: true,
        editingId: item.id,
      };
    }),

  cancelEdit: () =>
    set({
      isEditing: false,
      editingId: null,
      form: { ...initialForm },
    }),
}));