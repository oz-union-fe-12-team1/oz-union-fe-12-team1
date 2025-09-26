import ScheduleList from "./ScheduleList";
import { useSchedule } from "../../store/useSchedule";

export default function ScheduleForm({
  setOpenSchedule,
  openAdminDashboard,
  openAdminPage,
  openSchedule,
}) {
  const {
    form,
    list,
    isEditing,
    setForm,
    addSchedule,
    deleteSchedule,
    startEdit,
    cancelEdit,
  } = useSchedule();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    addSchedule();
  };

  const onBack = () => setOpenSchedule(false);

  return (
    <div className="rounded-2xl bg-gray-200 p-4 space-y-3 text-black h-full flex flex-col relative">
      {/* 닫기 버튼 */}
      <button
        type="button"
        onClick={onBack}
        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center font-bold text-gray-800 text-lg z-10 shadow-sm border border-gray-300"
      >
        X
      </button>

      {/* 일정 리스트 */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="text-center py-2 font-semibold mb-2">
          {isEditing ? "일정 수정" : "일정 리스트"}
        </div>
        <div className="flex-1 overflow-y-auto">
          <ScheduleList
            openAdminDashboard={openAdminDashboard}
            openAdminPage={openAdminPage}
            openSchedule={openSchedule}
            list={list}
            handleDelete={deleteSchedule}
          />
        </div>
      </div>

      {/* 일정 추가/수정 폼 */}
      <form onSubmit={handleAdd} className="space-y-3">
        <div className="text-center py-2 font-semibold text-gray-800">
          일정추가
        </div>

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full rounded-xl px-3 py-2 bg-white border border-gray-400"
          required
        />
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          className="w-full rounded-xl px-3 py-2 bg-white border border-gray-400"
        />
        <input
          type="text"
          name="title"
          placeholder="제목"
          value={form.title}
          onChange={handleChange}
          className="w-full rounded-xl px-3 py-2 bg-white border border-gray-400"
          required
        />
        <textarea
          name="memo"
          placeholder="메모"
          value={form.memo}
          onChange={handleChange}
          className="w-full rounded-xl px-3 py-2 bg-white border border-gray-400"
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 rounded-xl bg-gray-800 hover:bg-black py-2 font-semibold text-white"
          >
            {isEditing ? "수정완료" : "등록"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={cancelEdit}
              className="px-4 rounded-xl bg-gray-500 hover:bg-gray-600 py-2 font-semibold text-white"
            >
              취소
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
